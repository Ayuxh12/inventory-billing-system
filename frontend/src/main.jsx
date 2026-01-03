import React from 'react'
import axios from "axios";
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.baseURL = "https://inventory-billing-system-1.onrender.com";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
