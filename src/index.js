import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import Main from "./Pages/Main";
import StudentDetails from "./Pages/StudentDetails";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
            <Routes>
              <Route path='/' Component={Main}/>
              <Route path='/details' Component={StudentDetails}/>
            </Routes>
    </Router>
  </React.StrictMode>
);