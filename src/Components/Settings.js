import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {TimePicker} from "@mui/x-date-pickers";
import {DayPicker} from "react-day-picker";
import 'react-day-picker/dist/style.css';
export default function Settings(){
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
                        <TimePicker></TimePicker>
                    </LocalizationProvider>
                </div>
            </Row>
            <Row>
                <div>
                    <Button variant={"primary"}>Save Settings</Button>
                </div>
            </Row>
            <Row >
                <div>
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