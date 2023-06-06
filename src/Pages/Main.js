import React, { useState } from 'react';
import StudentList from "../Components/StudentList";
import {Tab, Tabs} from "react-bootstrap";
import BonusHours from "../Components/BonusHours";
import RunHours from "../Components/RunHours";


function Main() {
    const [key, setKey] = useState("students");

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
                    <BonusHours/>
                </Tab>
                <Tab eventKey={"run"} title={"Run Study Hours"}>
                    <RunHours/>
                </Tab>
                <Tabs eventKey={"Settings"} title={"Settings"}>

                </Tabs>
            </Tabs>
        </div>
    );
}

export default Main;
