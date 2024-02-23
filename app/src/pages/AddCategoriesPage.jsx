import { useContext, useRef } from 'react'
import { CategoriesContext, jsonServerUrl } from '../App.jsx'

function AddCategoriesPage() {
   const contextValue = useContext(CategoriesContext)
   let categories = contextValue.categories

   const categoryNameInput = useRef(null)
   const messageBox = useRef(null)

   const SaveNewCategory = (event) => {
      event.preventDefault()

      let id = categories.length

      let newCategory = {
         id: id.toString(),
         name: event.target.categoryName.value,
         artists: []
      }

      categories = [...categories, newCategory]

      const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(newCategory)
      }

      fetch(jsonServerUrl + '/categories', requestOptions).then(
         (response) => {
            if (response.ok) {
               contextValue.setCategories(categories)
               categoryNameInput.current.value = ''
               showMessage()
            } else {
               console.error('Något gick fel vid spara kategori')
            }
         }
      )
   }

   const showMessage = () => {
      messageBox.current.style.display = 'inline-block'
      setTimeout(() => {
         messageBox.current.style.display = 'none'
      }, 4000)
   }

   return (
      <>
         <form name="addCategoryForm" onSubmit={SaveNewCategory}>
               <h2>Skapa en ny kateori</h2>
               <div>
                  <label htmlFor="categoryName">Namn</label>
                  <input
                     type="text"
                     id="categoryName"
                     ref={categoryNameInput}
                     name="categoryName"
                     className="textInput"
                  ></input>
               </div>
               <br />
               <button type="submit">Spara kategori</button>
               <br />
               <div className="outer-message-box">
                  <div ref={messageBox} className="notVisible messageBox">
                     Kategorin är sparad
                  </div>
               </div>
         </form>
      </>
   )
}

export default AddCategoriesPage
