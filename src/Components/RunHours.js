import {Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import FileDropZone from "./FileDropZone";
import "../StyleSheets/FileUploadPage.css"
export default function RunHours(){
    const [file, setFile] = useState(null)

    async function GetStudyHours() {
        const formdata = new FormData();
        formdata.append("File", file)

        // TODO turn button into a spinner while waiting to recieve file
        fetch(process.env.REACT_APP_BACKEND_URL + "/RunHours",
            {
                method: "POST",
                body: formdata
            })
            .then(response => response.blob()) // Get the response as a blob
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'study_hours.xlsx'); // Set the desired file name
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
            <FileDropZone className={"text-center"} setSelectedFile={setFile}/>
            {/*TODO when pressed, get updated study hours*/}
            <Button onClick={GetStudyHours}
                className={"justify-content-center"}
            >Run Study Hours</Button>
        </div>
    )
}