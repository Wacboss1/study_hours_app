import {Button, Spinner} from "react-bootstrap";
import React, {useState} from "react";
import FileDropZone from "./FileDropZone";

export default function RunHours() {
    const [file, setFile] = useState(null)
    const [isLoading, setisLoading] = useState(false)

    async function GetStudyHours() {
        setisLoading(true)
        const formdata = new FormData();
        formdata.append("File", file)

        await fetch(process.env.REACT_APP_BACKEND_URL + "/RunHours",
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
            })
            .then(() => setisLoading(false));

    }

    return (
        <div className={"text-center"}>
            <FileDropZone className={"text-center"} selectedFile={file} setSelectedFile={setFile}/>
            {isLoading ? (
                <Spinner
                    className={"justify-content-center"}
                    variant="primary"/>
            ) : (
                <Button onClick={GetStudyHours}
                        className={"justify-content-center"}>Run Study Hours</Button>
            )}
        </div>
    )
}