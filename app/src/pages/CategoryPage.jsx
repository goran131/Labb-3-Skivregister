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

   const deleteCategory = () => {
      let confirmText = 'Vill du verkligen ta bort ' + category.name + '. Detta går inte att ångra.'

      if (confirm(confirmText) == true) {
         deleteCategoryFromJSON()
      }
   }

   const deleteCategoryFromJSON = () => {

      categories.splice(category.id, 1) // tar bort category.id
      let oldIDs = [];
      resetCategoryIDs(categories, oldIDs);


      const deleteOptions = {method: 'DELETE'}

      fetch(jsonServerUrl + '/categories/' + category.id, deleteOptions).then((response) => {
         if (response.ok) {
            updateIDsInJSON(categories, oldIDs);

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

   const resetCategoryIDs = (categories, oldIDs) => {
      for (let i = 0; i < categories.length; i++) {
         oldIDs[i] = categories[i].id
         categories[i].id = i;
      }
   }

   const updateIDsInJSON = (categories, oldIDs) => {
      for (let i = 0; i < categories.length; i++) {
         const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categories[i])
         }

         fetch(jsonServerUrl + '/categories/' + oldIDs[i], requestOptions).then((response) => {
            if (response.ok == false) {

               console.error('Något gick fel vid borttagning av skiva')
            }
         })
      }
   }


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
            <button ref={deleteCategoryButton} type="button" id="deleteCategoryButton" onClick={deleteCategory}>
               Ta bort kategori
            </button>
         </div>

      </>
   )
}

export default CategoryPage
