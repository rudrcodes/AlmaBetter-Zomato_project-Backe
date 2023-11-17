import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import dotenv from "dotenv"
console.log("ENV HOST LINK : ", import.meta.env.VITE_AXIOS_BASEURL)
axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASEURL

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
