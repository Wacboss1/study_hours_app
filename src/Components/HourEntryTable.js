import React, { useState } from 'react';

function HourEntryTable() {
    const [students, setStudents] = useState([
        { name: 'John', hours: 0 },
        { name: 'Jane', hours: 0 },
        { name: 'Alex', hours: 0 },
        // Add more students as needed
    ]);

    const handleHoursChange = (index, event) => {
        const updatedStudents = [...students];
        updatedStudents[index].hours = Number(event.target.value);
        setStudents(updatedStudents);
    };

    return (
        <table>
            <thead>
            <tr>
                <th className={"text-center"}>Student Name</th>
                <th className={"text-center"}>Hours</th>
            </tr>
            </thead>
            <tbody>
            {students.map((student, index) => (
                <tr key={index}>
                    <td>{student.name}</td>
                    <td>
                        <input
                            type="number"
                            value={student.hours}
                            onChange={(event) => handleHoursChange(index, event)}
                        />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default HourEntryTable;
