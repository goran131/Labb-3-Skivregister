import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Link } from 'react-router-dom'
import MobileMenu from './components/MobileMenu.jsx'
import DesktopMenu from './components/DesktopMenu.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <BrowserRouter>
         <div className="header">
            <Link className="logotype-link" to="./">
               <img src="/logotype.webp" className="logotype" />
            </Link>

            <div className="desktop-menu">
               <nav>
                  <DesktopMenu />
               </nav>
            </div>
            <div className="mobile-menu">
               <nav>
                 <MobileMenu />
               </nav>
            </div>
         </div>
         <div className="main-page">
            <App />
         </div>
      </BrowserRouter>
    </React.StrictMode>
)
