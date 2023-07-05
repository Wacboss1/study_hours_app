import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from "@mui/x-date-pickers";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import dayjs from "dayjs";

export default function Settings() {
    const [startDate, setStartDate] = useState(null)
    const [closingTime, setClosingTime] = useState(null)
    const [clearModal, setClearModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        GetValuesFromBackend()
    }, [])

    let GetValuesFromBackend = async () => {
        await fetch(process.env.REACT_APP_BACKEND_URL + "/GetSettings",
            {
                method: 'GET'
            })
            .then((response) => response.json())
            .then((bodyJson) => {
                let dateString = bodyJson['start date']
                if (dateString) {
                    let date = new Date(dateString)
                    setStartDate(date)
                }

                let closeTimeString = bodyJson['close time']
                if (closeTimeString) {
                    setClosingTime(dayjs(closeTimeString, "H:mm"))
                }

            }).then(() => {
                setIsLoading(false)
            })
    }

    let SaveSetting = async () => {
        let currentSettings = {
            "startDate": startDate,
            "closingTime": closingTime.$d.toLocaleTimeString('it-IT')
        }
        await fetch(process.env.REACT_APP_BACKEND_URL + "/SaveSettings", {
            method: "POST",
            body: JSON.stringify(currentSettings),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            setSuccessModal(true)
        )
    }

    let ClearData = async () => {
        await fetch(process.env.REACT_APP_BACKEND_URL + "/ClearData", {
            method: "POST"
        }).then(() => {
            setStartDate(null)
            setClosingTime(dayjs("23:59", "H:mm"))
            setClearModal(false)
        })
    }

    // TODO fix default month
    let dayPicker = isLoading ?
        <Spinner></Spinner>
        :
        <DayPicker
            mode="single"
            selected={startDate}
            onSelect={(newVal) => setStartDate(newVal)}
            defaultMonth={startDate}
            className={"display-center justify-content-center align-items-center"} />


    let timePicker = <LocalizationProvider
        dateAdapter={AdapterDayjs}>
        <TimePicker
            views={['hours', 'minutes']}
            value={closingTime}
            onChange={(newVal) => setClosingTime(newVal)}
        />
    </LocalizationProvider>

    let clearDataModal = <Modal
        centered
        show={clearModal}
        onHide={() => { setClearModal(false) }}
        className={"text-center"}>
        <Modal.Header>
            <b>Are you sure you wan to delete all data?</b>
        </Modal.Header>
        <Modal.Body>
            This will remove the following
            <br />
            <br />
            Start date
            <br />
            closing time
            <br />
            All students time tracked
            <br />
            Any bonus hours dates set
            <br />
            <br />
            Would you still like to continue?
        </Modal.Body>
        <Modal.Footer>
            <div>
                <Button
                    variant={"secondary"}
                    onClick={() => setClearModal(false)}>Cancel</Button>
            </div>
            <Button variant={"danger"} onClick={ClearData}>Confirm</Button>
        </Modal.Footer>
    </Modal>

    let confirmSuccessModal = <Modal
        centered
        show={successModal}
        onHide={() => { setSuccessModal(false) }}
        className={"text-center"}>
        <Modal.Header>
            <b>Save Successful</b>
        </Modal.Header>
        <Modal.Body>
            Your settings have been saved
        </Modal.Body>
        <Modal.Footer>
            <div>
                <Button
                    variant={"success"}
                    onClick={() => setSuccessModal(false)}>Ok</Button>
            </div>
        </Modal.Footer>
    </Modal>

    return (
        <div className={"text-center"}>
            <Row>
                <Col className={"d-flex justify-content-center"}>
                    <div>
                        <div className={"justify-content-center"}>
                            <Form.Label>Start Date</Form.Label>
                        </div>
                        {dayPicker}
                    </div>
                </Col>
            </Row>
            <Row>
                <div>
                    <div>
                        <Form.Label>Closing Time</Form.Label>
                    </div>
                    {timePicker}
                </div>
            </Row>
            <Row className={"mt-3"}>
                <div>
                    {/* TODO open modal to let user know  */}
                    <Button variant={"primary"} onClick={SaveSetting}>Save Settings</Button>
                </div>
                <div className={"mt-1"}>
                    <Button variant={"danger"} onClick={() => setClearModal(true)}>Clear Data</Button>
                </div>
            </Row>
            {clearDataModal}
            {confirmSuccessModal}
        </div>
    )
}