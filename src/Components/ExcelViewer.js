import React, { Component } from 'react';
import { ExcelRenderer, OutTable } from 'react-excel-renderer';

class App extends Component {
    state = {
        data: null,
    };

    handleChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        this.setState({
            data: null,
        });

        ExcelRenderer(file, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                this.setState({
                    data: resp,
                });
            }
        });
    };

    render() {
        const { data } = this.state;

        if (!data) {
            return (
                <div>
                    <h1>Upload an Excel file</h1>
                    <input type="file" name="excelFile" onChange={this.handleChange} />
                </div>
            );
        }

        return (
            <div>
                <h1>Excel Data</h1>
                <OutTable data={data} />
            </div>
        );
    }
}

export default App;