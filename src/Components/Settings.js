import {Button, Col, Form, Modal, Row, Spinner} from "react-bootstrap";
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

    useEffect(() => {
        startDate ?
            console.log(startDate.getMonth() + " " + defaultMonth):
            console.log("No start date")
    }, [startDate])

    let GetCurrentValues = async () => {
        try{
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/GetSettings",
                {
                    method: 'GET'
                })
                .then((response) => response.json())
                .then((bodyJson) => {
                    let dateString = bodyJson['start date']
                if(dateString){
                    let date = new Date(dateString)
                    setStartDate(date)
                }
                })
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

    let defaultMonth = startDate ?
                            startDate.getMonth() :
                            null

    let dayPicker = startDate ?
                    <DayPicker
                    mode ="single"
                    selected={startDate}
                    onSelect={(newVal) => {
                        setStartDate(newVal)
                        console.log(newVal)
                    }}
                    defaultMonth={startDate}

                    className={"display-center justify-content-center align-items-center"}/>
                    : <Spinner></Spinner>

    return(
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            value={closingTime}
                            views={['hours', 'minutes']}
                            onChange={(newVal) => setClosingTime(newVal)}
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