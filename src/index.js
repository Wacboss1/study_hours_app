import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

// import FileUploadPage from "./Pages/FileUploadPage";
import App from "./Components/ExcelViewer";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<FileUploadPage/>*/}
      <App/>
  </React.StrictMode>
);

