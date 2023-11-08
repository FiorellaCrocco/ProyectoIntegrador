//import React from 'react'
import ReactDOM from 'react-dom/client'
// import ReactDOM from 'react-dom';
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { BookProvider } from './Context/globalContext.jsx';
import { AccountProvider } from './Context/accountContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AccountProvider>
      <BookProvider>
        <App />
      </BookProvider>
    </AccountProvider>
  </BrowserRouter>
);
