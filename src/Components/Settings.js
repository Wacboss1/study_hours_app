import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {TimePicker} from "@mui/x-date-pickers";
import {DayPicker} from "react-day-picker";
import 'react-day-picker/dist/style.css';
import {format} from "date-fns";
import dayjs from "dayjs";

export default function Settings(){
    const [startDate, setStartDate] = useState(null)
    const [closingTime, setClosingTime] = useState(null)
    const [showingModal, setShowModal] = useState(false)
    
    useEffect(() => {
        GetCurrentValues()
    }, [])

    let GetCurrentValues = async () => {
        try{
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/GetSettings",
                {
                    method: 'GET'
                })
                let bodyJson = await response.json()
                setStartDate(new Date(bodyJson['start date']))
                console.log(startDate)
            // setClosingTime(bodyJson['close time'])
        } catch (error){
            console.log(error)
        }
    }

    let SaveSetting = async () => {
        let currentSettings = {
            "startDate": startDate,
            "closingTime": `${closingTime.$H}:${closingTime.$m}`
        }
        await fetch(process.env.REACT_APP_BACKEND_URL + "/SaveSettings", {
            method: "POST",
            body: JSON.stringify(currentSettings),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then()
        console.log("Saving Settings")
    }

    let ClearData = async () => {
        await fetch(process.env.REACT_APP_BACKEND_URL + "/ClearData", {
            method: "POST"
        })
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
                            // TODO set default month to startdate month
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
                            views={['hours', 'minutes']}
                            format={"hh:mm"}
                            onChange={(newVal) =>
                            {
                                setClosingTime(newVal)
                                console.log(newVal)
                            }}
                        />
                        {/* TODO use .$H and .$m to get the time to the database */}
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
            {/*TODO make is so you don't have to reload to leave modal*/}
            <Modal show={showingModal}>
                Testing
                <Button variant={"danger"} onClick={ClearData}>Confirm</Button>
            </Modal>
        </div>
    )
}