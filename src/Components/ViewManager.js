import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "../Pages/Main";
import StudentDetails from "../Pages/StudentDetails";

class ViewManager extends Component {
    static Views() {
        return {
            main: <Main />,
            details: <StudentDetails />
        }
    }

    static View(props) {    
        console.log(props)
        // let name = props.location.search.substr(1)
        // let view = ViewManager.Views()[name];
        // if (view == null) {
        //     throw new Error("View '" + name + "' is undefined");
        // }
        return <p>working</p>;
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route path='/' Component={ViewManager.View} />
                </Routes>
            </Router>
        )
    }
}

export default ViewManager