import React, { useState } from 'react';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

function ExcelViewer() {
    const [excelData, setExcelData] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        ExcelRenderer(file, (err, response) => {
            if (err) {
                console.log(err);
            } else {
                setExcelData(response.rows);
            }
        });
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <OutTable data={excelData} columns={excelData} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
        </div>
    );
}

export default ExcelViewer;
