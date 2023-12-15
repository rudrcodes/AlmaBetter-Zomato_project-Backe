import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
//axios.defaults.baseURL = "http://localhost:8080/"
//console.log("ENV HOST LINK : ", axios.defaults.baseURL)
// eslint-disable-next-line no-unused-vars
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
