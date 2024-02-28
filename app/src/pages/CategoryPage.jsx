import { useRef, useContext, useEffect } from 'react'
import { CategoriesContext, jsonServerUrl } from '../App.jsx'
import { useLocation, Link } from 'react-router-dom'

const CategoryPage = () => {
   const location = useLocation()
   const category = location.state

   const contextValue = useContext(CategoriesContext)
   let categories = contextValue.categories

   const categoryDiv = useRef(null)
   const noArtistsText = useRef(null)
   const addArtistButton = useRef(null)
   const deleteCategoryButton = useRef(null)

   useEffect (() => {
      if (category.artists.length == 0) {
         noArtistsText.current.style.display = 'block'
      }
   }, []);

   /**
   const deleteCategory = () => {
      let confirmText = 'Vill du verkligen ta bort ' + category.name + '. Detta går inte att ångra.'

      if (confirm(confirmText) == true) {
         deleteCategoryFromJSON()
      }
   }

   const deleteCategoryFromJSON = () => {
      for (let i = 0; i < categories.length; i++) {
         if (category.id == categories[i].id) {
            categories.splice(i, 1)
         }
      }

      const deleteOptions = {method: 'DELETE'}

      fetch(jsonServerUrl + '/categories/' + category.id, deleteOptions).then((response) => {
         if (response.ok) {
            contextValue.setCategories(categories)
            categoryDiv.current.innerHTML = "";
            addArtistButton.current.disabled = true;
            deleteCategoryButton.current.disabled = true;
         }
         else {
            console.error('Något gick fel vid borttagning av artist')
         }
      })
   }

   */

   return (
      <>
         <div ref={categoryDiv}>
            <h2>{category.name}</h2>

            <h3>Artister</h3>

            {category.artists.map((artist) => (
               <div key={artist.id} className="artists">
                  <Link
                     to="/pages/ArtistPage/"
                     state={[artist.id, category.id]}
                  >
                     {artist.name}
                  </Link>
               </div>
            ))}

            <div ref={noArtistsText} className="notVisible">
               Det finns inga artister i denna kategorin
            </div>
         </div>

         <div className="buttons-div">
            <Link
               to="/pages/AddArtistPage"
               state={category.id}
            >
               <button ref={addArtistButton} type="button" id="addArtistButton">
                  Lägg till artister
               </button>
            </Link>
         </div>

      </>
   )
}

export default CategoryPage
