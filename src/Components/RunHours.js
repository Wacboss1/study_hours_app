import {Button} from "react-bootstrap";
import React from "react";
import FileDropZone from "./FileDropZone";

export default function RunHours(){
    return(
        <div className={"text-center"}>
            <FileDropZone className={"text-center"}/>
            <Button
                className={"justify-content-center"}
            >Run Study Hours</Button>
        </div>
    )
}