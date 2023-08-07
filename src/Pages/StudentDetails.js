import React from "react";
import { useParams } from "react-router-dom";

export default function StudentDetails() {
    let studentName = useParams().studentName;
    return (
        <div>
            <p>{studentName}</p>
        </div>
    )
}