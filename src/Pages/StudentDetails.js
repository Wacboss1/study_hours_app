import React, { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Spinner } from "react-bootstrap";

export default function StudentDetails() {
    const [isLoading, setIsLoading] = useState(true);
    const [studentCheckins, setStudentCheckins] = useState([]);
    let studentName = useParams().studentName;

    useEffect(() => {
        GetStudentDetails();
    }, [])

    const GetStudentDetails = async () => {
        try{
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/GetDetails/' + studentName, {
                method: 'GET'
            });
            const jsonData = await response.json();
            setStudentCheckins(jsonData)
            setIsLoading(false)
        } catch (error){
            console.log(error);
        }
    }

    const editDatabase = async (data) => {
        const respones = await fetch(process.env.REACT_APP_BACKEND_URL + '/EditRow', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        const responseJSON = await respones.json();
    }

    if(isLoading){
        return(
            <div>
                <Spinner/>
            </div>
        )
    } else{
        let cols = [
            {field: 'First Name', headerName: 'First'},
            {field: 'Last Name', headerName: 'Last'},
            {field: 'Check In Time', editable: true,  flex: 1},
            {field: 'Check Out Time', editable: true, flex: 1}
        ]
        return (
            <div>
                <DataGrid 
                    rows={studentCheckins} 
                    columns={cols} 
                    getRowId={(row) => row.index + 1}
                    processRowUpdate={(updatedRow, originalRow) => {
                        editDatabase(updatedRow)
                    }}
                    onProcessRowUpdateError={(error) => {
                        //Ignore error
                    }}/>
            </div>
        )
    }
    
}