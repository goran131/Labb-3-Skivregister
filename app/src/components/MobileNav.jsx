import { React, useRef } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'

function MobileNav() {
   const mobileNavLinks = useRef(null)

   const showMobileNav = () => {
      if (mobileNavLinks.current.style.display != 'block') {
         mobileNavLinks.current.style.display = 'block';
      }
      else {
         mobileNavLinks.current.style.display = 'none';
      }
   }

   const closeMobileNav = () => {
      mobileNavLinks.current.style.display = 'none';
   }

   return (
      <>
         <img src="/mobile-icon.webp" onClick={showMobileNav} />
         <ul ref={ mobileNavLinks } className="mobile-nav-links notVisible">
            <li>
               <Link className="link" to="./" onClick="closeMobileNav">Start</Link>
            </li>
            <li>
               <Link className="link" to="/pages/AddArtistPage" onClick="closeMobileNav">Lägg till artister</Link>
            </li>
            <li>
               <Link className="link" to="/pages/AddCategoriesPage" onClick="closeMobileNav">Skapa kategorier</Link>
            </li>
         </ul>
      </>
   )
}

export default MobileNav
