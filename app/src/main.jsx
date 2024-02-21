import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Link } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <nav>
                <Link className="link" to="./">
                    Start
                </Link>
                <Link className="link" to="/pages/AddArtistPage">
                    Lägg till artister
                </Link>
                <Link className="link" to="/pages/AddCategoriesPage">
                    Skapa nya kategorier
                </Link>
            </nav>
            <h1>Skivregister</h1>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)
