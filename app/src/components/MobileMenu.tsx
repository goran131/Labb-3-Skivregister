import { React, useRef, ReactElement } from 'react'
import { Link } from 'react-router-dom'

function MobileMenu(): ReactElement {
   const mobileMenuLinks = useRef(null)

   const showMobileMenu = () => {
      if (mobileMenuLinks.current.style.display != 'block') {
         mobileMenuLinks.current.style.display = 'block';
      }
      else {
         mobileMenuLinks.current.style.display = 'none';
      }
   }

   const closeMobileMenu = () => {
      mobileMenuLinks.current.style.display = 'none';
   }

   return (
      <>
         <img src="/mobile-icon.webp" onClick={showMobileMenu} />
         <ul ref={ mobileMenuLinks } className="mobile-menu-links notVisible">
            <li>
               <Link className="mobile-link" to="./" onClick={closeMobileMenu}>Start</Link>
            </li>
            <li>
               <Link className="mobile-link" to="/pages/AddArtistPage" onClick={closeMobileMenu}>Lägg till artister</Link>
            </li>
            <li>
               <Link className="mobile-link" to="/pages/AddCategoriesPage" onClick={closeMobileMenu}>Skapa kategorier</Link>
            </li>
         </ul>
      </>
   )
}

export default MobileMenu
