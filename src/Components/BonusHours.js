import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import 'react-day-picker/dist/style.css';
import { useEffect } from "react";
export default function BonusHours() {
    const [range, setRange] = useState(null);
    const [multi, setMulti] = useState(0);
    const [bonusDates, setBonusDates] = useState([]);

    useEffect(() => {
        getBonusDates()
    }, [])

    const getBonusDates = async () => {
        await fetch(process.env.REACT_APP_BACKEND_URL + "/GetBonusDates", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((body) => {
                let dates = []
                body.forEach(dict => {
                    let dateRange = {}
                    if(dict['end_date']){
                        dateRange = {
                            from: new Date(dict['start_date']),
                            to: new Date(dict['end_date'])
                        }
                    } else {
                        dateRange = {
                            from: new Date(dict['start_date']),
                            to: null
                        }
                    }
                    dates.push( 
                        dateRange
                    )
                });
                setBonusDates(dates)
            })

    }

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
        let hoursToAdd = {}
        
        if(range.to != null){
            hoursToAdd = {
                "startDate": format(range.from, 'MM/dd/yyyy'),
                "endDate": format(range.to, 'MM/dd/yyyy'),
                "multi": multi
            }
        } else {
            hoursToAdd = {
                "startDate": format(range.from, 'MM/dd/yyyy'),
                "endDate": null,
                "multi": multi
            }
        }

        fetch(process.env.REACT_APP_BACKEND_URL + "/AddBonusHours",
            {
                method: 'POST',
                body: JSON.stringify(hoursToAdd),
                headers: {
                    'Content-Type': 'application/json' // Set the request header
                }
            })
            .then(() => setBonusDates((prev) => {
                return [...prev, range]
            }))
            .then(() => clearFields())
            
    }

    const clearFields = () => {
        setRange(null)
        setMulti(null)
        const multiForm = document.getElementById("multi")
        multiForm.value = "";
    }

    let bonusDatesStyle = `
        .bonusDate {
            color: red;
        }`
        
    return (
        <div className={"text-center"}>
            <Container className={"centered-container"}>
                <Row>
                    <Col className={"d-flex justify-content-center"}>
                        {/*TODO be able to tell which dates already have bonuses*/}
                        <style>{bonusDatesStyle}</style>
                        <DayPicker
                            mode="range"
                            selected={range}
                            onSelect={setRange}
                            modifiers={{bonusDates: bonusDates}}
                            modifiersClassNames={{bonusDates: 'bonusDate'}}
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
            <p>Selected Dates:<br />{footer}</p>
            <p>Multiplier: {multi}x</p>
            <Button onClick={SendBonusHours}>Add Hours</Button>
        </div>
    )
}
