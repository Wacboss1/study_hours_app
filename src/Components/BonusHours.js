import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {DayPicker} from "react-day-picker";
import {format} from "date-fns";
import 'react-day-picker/dist/style.css';
export default function BonusHours(){
    const [range, setRange] = useState(null);
    const [multi, setMulti] = useState(0);
    const [res, setResponse] = useState(null);
    const handleMultiChange = (event) => {
        setMulti(event.target.value)
    }

    let footer = "Please select a start and end date"
    if (range?.from) {
        if (!range.to) {
            footer = format(range.from, 'PPP');
        } else if (range.to) {
            footer = format(range.from, 'PPP') + " to " + format(range.to, 'PPP');
        }
    }

    const SendBonusHours = () => {
        let hoursToAdd = {
            "startDate": format(range.from, 'MM/dd/yyyy'),
            "endDate": format(range.to, 'MM/dd/yyyy'),
            "multi": multi
        }

        fetch(process.env.REACT_APP_BACKEND_URL + "/AddBonusHours",
            {
                method: 'POST',
                body: JSON.stringify(hoursToAdd),
                headers: {
                    'Content-Type': 'application/json' // Set the request header
                }
            })
            .then(response => setResponse(response.status))
            .then(() => clearFields())
    }

    const clearFields = () => {
        setRange(null)
        setMulti(null)
        const multiForm = document.getElementById("multi")
        multiForm.value = "";
    }

    return(
        <div className={"text-center"}>
            <Container className={"centered-container"}>
                <Row>
                    <Col className={"d-flex justify-content-center"}>
                        {/*TODO be able to tell which dates already have bonuses*/}
                        <DayPicker
                            mode ="range"
                            selected={range}
                            onSelect={setRange}
                            footer={footer}
                            className={"display-center justify-content-center align-items-center"}
                        />
                    </Col>
                </Row>
            </Container>
            <Form.Label>Multiplier</Form.Label>
            <Form.Control
                type="number"
                id="multi"
                onChange={handleMultiChange}
                className={'m-20'}
            />
            <p>Selected Dates:<br/>{footer}</p>
            <p>Multiplier: {multi}x</p>
            <Button onClick={SendBonusHours}>Add Hours</Button>
        </div>
    )
}
