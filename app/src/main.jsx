import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Link } from 'react-router-dom'
import MobileNav from './components/MobileNav.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <BrowserRouter>
         <div className="header">
            <img src="/logotype.webp" className="logotype" />
            <div className="desktop-nav">
               <nav>
                  <Link className="link" to="./">
                     Start
                  </Link>
                  <Link className="link" to="/pages/AddArtistPage">
                     Lägg till artister
                  </Link>
                  <Link className="link" to="/pages/AddCategoriesPage">
                     Skapa kategorier
                  </Link>
               </nav>
            </div>
            <div className="mobile-nav">
               <nav>
                 <MobileNav />
               </nav>
            </div>
         </div>
         <div className="main-page">
            <App />
         </div>
      </BrowserRouter>
    </React.StrictMode>
)
