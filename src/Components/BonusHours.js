import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {DayPicker} from "react-day-picker";
import {format} from "date-fns";
import 'react-day-picker/dist/style.css';
export default function BonusHours(){
    const [range, setRange] = useState(null);
    const [multi, setMulti] = useState(null);

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
            <Button>Add Hours</Button>
        </div>
    )
}
