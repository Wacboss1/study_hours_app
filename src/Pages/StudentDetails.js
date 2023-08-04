import React from "react";
import { useParams } from "react-router-dom";

export default function StudentDetails() {
    let student = useParams().student;
    return (
        <p>{student}</p>
    )
}