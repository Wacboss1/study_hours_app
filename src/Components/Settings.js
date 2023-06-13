import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {TimePicker} from "@mui/x-date-pickers";
import {DayPicker} from "react-day-picker";
import 'react-day-picker/dist/style.css';
export default function Settings(){
    const [startDate, setStartDate] = useState(null)
    const [closingTime, setClosingTime] = useState(null)
    async function GetStartingValues() {
        console.log("Getting values")
    }

    useEffect(() => {
        GetStartingValues()
    })

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
                            onSelect={setStartDate}
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
                    <Button variant={"primary"}>Save Settings</Button>
                </div>
                <div className={"mt-1"}>
                    <Button variant={"danger"}>Clear Data</Button>
                </div>
            </Row>
            <Modal>
                Testing
                <Button variant={"danger"}>Confirm</Button>
            </Modal>
        </div>
    )
}