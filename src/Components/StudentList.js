import React, { useState } from 'react';
import {Table} from 'react-bootstrap';

function StudentList() {
    const [students, setStudents] = useState([
        { first: 'John', last: "Doe" },
        { first: 'Jane', last: "Doe" },
        { first: 'Alex', last: "Muhammad" },
        // Add more students as needed
    ]);

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
