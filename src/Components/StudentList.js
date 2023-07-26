import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner, Table } from 'react-bootstrap';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  useEffect(() => {
    GetListOfStudents();
  }, []);

  const GetListOfStudents = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/GetStudents', {
        method: 'GET'
      });
      const jsonData = await response.json();
      setStudents(jsonData);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sortTable = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedStudents = [...students].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  if (isLoading) {
    return (
      <Container fluid className="justify-content-center align-items-center d-flex">
        <Row className="h-100">
          <Col>
            <Spinner animation="border" variant="primary" />
          </Col>
        </Row>
      </Container>
    );
  }

  const handleRowClick = (student) => {
    const fullName = `${student['First Name']} ${student['Last Name']}`;
    window.electronAPI.OpenStudentDetails(fullName)
  }

  return (
    <Table>
      <thead>
        <tr>
          <th className="text-center" onClick={() => sortTable('First Name')}>
            First Name {sortConfig.key === 'First Name' && <SortArrow direction={sortConfig.direction} />}
          </th>
          <th className="text-center" onClick={() => sortTable('Last Name')}>
            Last Name {sortConfig.key === 'Last Name' && <SortArrow direction={sortConfig.direction} />}
          </th>
          <th className="text-center" onClick={() => sortTable('Hours')}>
            Hours {sortConfig.key === 'Hours' && <SortArrow direction={sortConfig.direction} />}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedStudents.map((student, index) => (
          <tr className="text-center"
            key={index}
            onClick={() => handleRowClick(student)}>
            <td>{student['First Name']}</td>
            <td>{student['Last Name']}</td>
            <td>{student['Hours']}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

const SortArrow = ({ direction }) => (
  <span className={direction === 'asc' ? 'arrow-up' : 'arrow-down'}></span>
);

export default StudentList;
