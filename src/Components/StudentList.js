import React, {useEffect, useState} from 'react';
import {Col, Container, Row, Spinner, Table} from 'react-bootstrap';

function StudentList() {
    const [students, setStudents] = useState([]);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        GetListOfStudents();
    }, []);

    const GetListOfStudents = async () => {
        try{
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/GetStudents', {
                method: 'GET'
            });
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
                <th className={"text-center"}>Hours</th>
            </tr>
            </thead>
            <tbody>
            {students.map((student, index) => (
                //TODO should be able to click a students name to see all their logged hours
                <tr className={"text-center"} key={index}>
                    <td>{student["First Name"]}</td>
                    <td>{student["Last Name"]}</td>
                    <td>{student["Hours"]}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default StudentList;
