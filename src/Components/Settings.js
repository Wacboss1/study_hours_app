import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {TimePicker} from "@mui/x-date-pickers";
import {DayPicker} from "react-day-picker";
import 'react-day-picker/dist/style.css';
import {format} from "date-fns";
export default function Settings(){
    const [startDate, setStartDate] = useState(null)
    const [closingTime, setClosingTime] = useState(null)
    const [showingModal, setShowModal] = useState(false)

    useEffect(() => {
        GetCurrentValues()
    })

    let GetCurrentValues = async () => {
        try{
            let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/GetSettings",
                {
                    method: 'GET'
                })
            let bodyJson = response.json()
            setStartDate(new Date(bodyJson['startDate']))
            console.log(startDate)
                // setClosingTime(bodyJson['closeTime'])
        } catch (error){
            console.log(error)
        }
    }

    let SaveSetting = async () => {
        console.log("Saving Settings")
    }

    let ClearData = async () => {
        console.log("Clearing Data")
        setShowModal(false)
    }

    return(
        <div className={"text-center"}>
            <Row>
                <Col className={"d-flex justify-content-center"}>
                    <div>
                        <div className={"justify-content-center"}>
                            <Form.Label>Start Date</Form.Label>
                        </div>
                        <DayPicker
                            mode ="single"
                            selected={startDate}
                            onSelect={(newVal) => {
                                setStartDate(newVal)
                                console.log(newVal)
                            }}
                            // modifiers={currentStartDate}
                            // modifiersStyles={{ booked: bookedStyle }}
                            className={"display-center justify-content-center align-items-center"}
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <div>
                    <div>
                        <Form.Label>Closing Time</Form.Label>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            value={closingTime}
                            onChange={(newVal) =>
                            {
                                setClosingTime(newVal)
                                console.log(newVal)
                            }}
                        />
                    </LocalizationProvider>
                </div>
            </Row>
            <Row className={"mt-3"}>
                <div>
                    <Button variant={"primary"} onClick={SaveSetting}>Save Settings</Button>
                </div>
                <div className={"mt-1"}>
                    <Button variant={"danger"} onClick={() => setShowModal(true)}>Clear Data</Button>
                </div>
            </Row>
            <Modal show={showingModal}>
                Testing
                <Button variant={"danger"} onClick={ClearData}>Confirm</Button>
            </Modal>
        </div>
    )
}