import React, { useState } from 'react';
import StudentList from "../Components/StudentList";
import {Accordion, Button, Tab, Tabs} from "react-bootstrap";
import FileDropZone from "../Components/FileDropZone";
import {DateRange, DayPicker} from "react-day-picker";

function FileUploadPage() {

    const [key, setKey] = useState("students");
    const [range, setRange] = useState(0);
    return (
        <div>
            <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
                fill
            >
                <Tab eventKey={"students"} title={"Students"}>
                    <StudentList/>
                </Tab>
                <Tab eventKey={"bonus"} title={"Bonus Hours"}>
                    <DayPicker
                        mode ="range"
                        selected={range}
                        onSelect={setRange}
                        />
                </Tab>
                <Tab eventKey={"run"} title={"Run Study Hours"}>
                    <FileDropZone className={"justify-content-center"}></FileDropZone>
                    <Button
                        className={"justify-content-center"}
                    >Run Study Hours</Button>
                </Tab>
            </Tabs>
            {/*<Accordion>
                <Accordion.Item eventKey={0}>
                <Accordion.Header>Students</Accordion.Header>
                <Accordion.Body>
                    <StudentList/>
                </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey={1}>
                    <Accordion.Header>Bonus Hours</Accordion.Header>
                </Accordion.Item>
                <Accordion.Item eventKey={2}>
                    <Accordion.Header>Calculate Study Hours</Accordion.Header>
                </Accordion.Item>
            </Accordion>*/}

        </div>
    );
}

export default FileUploadPage;
