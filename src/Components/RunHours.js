import {Button} from "react-bootstrap";
import React, {useEffect} from "react";
import FileDropZone from "./FileDropZone";
import "../StyleSheets/FileUploadPage.css"
export default function RunHours(){

    async function GetStudyHours() {
        fetch('https://bcd2ad0b-8c06-4631-bf4c-349265062ded.mock.pstmn.io/RunHours')
            .then(response => response.blob()) // Get the response as a blob
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.xlsx'); // Set the desired file name
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch(error => {
                console.error('Error downloading file:', error);
            }
        );
    }

    return(
        <div className={"text-center"}>
            {/*TODO make this a box*/}
            <FileDropZone className={"text-center"}/>
            {/*TODO when pressed, get updated study hours*/}
            <Button onClick={GetStudyHours}
                className={"justify-content-center"}
            >Run Study Hours</Button>
        </div>
    )
}