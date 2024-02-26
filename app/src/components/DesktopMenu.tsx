import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

function DesktopMenu(): ReactElement {
   return (
      <>
         <Link className="link" to="./">
            Start
         </Link>
         <Link className="link" to="/pages/AddArtistPage">
            Lägg till artister
         </Link>
         <Link className="link" to="/pages/AddCategoriesPage">
            Skapa kategorier
         </Link>
      </>
   )
}

export default DesktopMenu
