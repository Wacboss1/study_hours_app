import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {DayPicker} from "react-day-picker";
import {format} from "date-fns";
import 'react-day-picker/dist/style.css';
export default function BonusHours(){
    const [range, setRange] = useState(null);
    const [multi, setMulti] = useState(null);
    const [res, setResponse] = useState(null);
    const handleMultChange = (event) => {
        setMulti(event.target.value)
    }

    let footer = <p>Please a start and end date</p>
    if (range?.from) {
        if (!range.to) {
            footer = <p>{format(range.from, 'PPP')}</p>;
        } else if (range.to) {
            footer = (
                <p>
                    {format(range.from, 'PPP')} to {format(range.to, 'PPP')}
                </p>
            );
        }
    }

    const SendBonusHours = () => {
        let hoursToAdd = {
            "Start":range.from,
            "End":range.to,
            "Multiplier": multi
        }

        fetch("https://bcd2ad0b-8c06-4631-bf4c-349265062ded.mock.pstmn.io/AddBonusHours",
            {
                method: 'POST',
                body: hoursToAdd
            })
            .then(response => setResponse(response.status))
    }
    return(
        <div className={"text-center"}>
            <Container className={"centered-container"}>
                <Row>
                    <Col className={"d-flex justify-content-center"}>
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
                onChange={handleMultChange}/>
            <p>Selected Dates: {footer}</p>
            <p>Multiplier: {multi}x</p>
            {/*TODO add the bonus hours to the database*/}
            <Button onClick={SendBonusHours}>Add Hours</Button>
            {res}
        </div>
    )
}
