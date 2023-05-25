import React, {useEffect, useState} from 'react';
import {Col, Container, Row, Spinner, Table} from 'react-bootstrap';

function StudentList() {
    const [students, setStudents] = useState([
        // TODO populate list with actual data
        { first: 'John', last: "Doe" },
        { first: 'Jane', last: "Doe" },
        { first: 'Alex', last: "Muhammad" },
        // Add more students as needed
    ]);
    const [isLoading, setLoading] = useState(true)

    useEffect( () => {
        fetchdata();
    }, [])

    const fetchdata = async () => {
        try{
            const response = await fetch('https://bcd2ad0b-8c06-4631-bf4c-349265062ded.mock.pstmn.io/GetStudents');
            const jsonData = await response.json();
            setStudents(jsonData)
            setLoading(false)
        } catch (error){
            console.error('Error:', error)
        }
    }

    if(isLoading){
        return <Container fluid className={"justify-content-center align-items-center d-flex"}>
            <Row className={"h-100"}>
                <Col className={""}>
                    <Spinner
                        animation="border"
                        variant="primary"
                    />
                </Col>
            </Row>
        </Container>
    }

    return (
        <Table>
            <thead>
            <tr>
                <th className={"text-center"}>First Name</th>
                <th className={"text-center"}>Last Name</th>
            </tr>
            </thead>
            <tbody>
            {students.map((student, index) => (
                //TODO should be able to click a students name to see all their logged hours
                <tr className={"text-center"} key={index} onClick={() => {console.log("something")}}>
                    <td>{student.first}</td>
                    <td>{student.last}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default StudentList;
