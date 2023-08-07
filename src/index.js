import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Router, Route} from "electron-router-dom";
import Main from "./Pages/Main";
import StudentDetails from "./Pages/StudentDetails";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router
      main={<Route path='/' Component={Main}/>}
      details={<Route path='/:studentName' Component={StudentDetails}/>}
    />
);