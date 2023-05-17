import React, {useState} from "react";

export default function FileDropZone(props){

    const [dragging, setDragging] = useState(false);

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        props.setSelectedFile(event.dataTransfer.files[0]);
    };

    const handleFileChange = (event) => {
        props.setSelectedFile(event.target.files[0]);
    };

    return(
        <div
            className={`input-dropzone ${dragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {props.selectedFile ? (
                <p>Selected File: {props.selectedFile.name}</p>
            ) : (
                <div>
                    <input
                        type="file"
                        id="fileInput"
                        className="form-control-file"
                        onChange={handleFileChange}
                        hidden={true}
                    />
                    <label htmlFor="fileInput" className="form-label">
                        Drag and drop file here, or click to select
                    </label>
                </div>
            )}
        </div>
    )
}