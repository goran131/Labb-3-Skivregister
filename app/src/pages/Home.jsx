import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { CategoriesContext } from '../App.jsx'

function Home() {
   const value = useContext(CategoriesContext)
   const categories = value.categories

   return (
      <>
         <div>
            <p>
               Här kan du lägga upp hela din skivsamling grupperad efter
               musikkategorier. Du kan även skapa nya kategorier.
            </p>
            <div>
               <h3>Musikkategorier</h3>
               {categories.map((category) => (
                  <div key={category.id} className="categories">
                     <Link to="/pages/CategoryPage" state={category}>
                        {category.name}
                     </Link>
                  </div>
               ))}
            </div>
         </div>
      </>
   )
}

export default Home
