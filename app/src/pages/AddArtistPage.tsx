import { useContext, useRef, ReactElement } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CategoriesContext, jsonServerUrl, expressServerUrl } from '../App.tsx'


function AddArtistPage():ReactElement {
   const contextValue = useContext(CategoriesContext)
   let categories = contextValue.categories

   let newArtist = null
   let category = null

   const location = useLocation()
   let categoryID = location.state // Om categoryID finns i location.state så ska den kategorin vara förvald

   const categorySelector = useRef<HTMLSelectElement>(null)

   if (categoryID != null) {
      setTimeout(() => {
         categorySelector.current.selectedIndex = categoryID
      }, 50)
   }

   const artistName = useRef<HTMLInputElement>(null)
   const artistDescription = useRef<HTMLInputElement>(null)
   const saveArtistButton = useRef<HTMLButtonElement>(null)
   const messageSavedArtist = useRef<HTMLDivElement>(null)
   const errorArtistName = useRef<HTMLDivElement>(null)
   const addRecordsButton = useRef<HTMLButtonElement>(null)

   const navigate = useNavigate();

   const SaveNewArtist = (event) => {
      event.preventDefault()

      categoryID = event.target.categorySelector.selectedOptions[0].value

      category = categories.slice(categoryID, categoryID + 1)
      category = category[0]

      // validerar bara att artistname är inskrivet
      if (event.target.artistName.value == '') {
         errorArtistName.current.style.display = 'block'
         return
      }

      let artistID = category.artists.length
      let artistName = event.target.artistName.value

      let artistDescription = event.target.artistDescription.value
      newArtist = {
         id: artistID,
         name: artistName,
         description: artistDescription,
         records: []
      }

      category.artists = [...category.artists, newArtist]

      categories.splice(categoryID, 1, category)

      const requestOptions = {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(category)
      }

      fetch(jsonServerUrl + '/categories/' + categoryID, requestOptions).then(
         (response) => {
            if (response.ok) {
               contextValue.setCategories(categories)
               showMessage(messageSavedArtist)
               errorArtistName.current.style.display = 'none'

               disableArtistForm()
               addRecordsButton.current.style.display = 'block'
            } else {
               console.error('Något gick fel vid spara artist')
            }
         }
      )
   }

   const showMessage = (messageBox) => {
      messageBox.current.style.display = 'inline-block'
      setTimeout(() => {
         messageBox.current.style.display = 'none'
      }, 5000)
   }

   const disableArtistForm = () => {
      categorySelector.current.disabled = true
      artistName.current.disabled = true
      artistDescription.current.disabled = true
      saveArtistButton.current.disabled = true
   }

   const gotoAddRecords = () => {
      navigate("/pages/AddRecordsPage", { state: [newArtist, categoryID]});
   }

   return (
      <>
         <h2>Lägg till ny artist</h2>
         <form name="addArtistForm" onSubmit={SaveNewArtist}>
            <div className="selector-div">
               <p>Välj musikkategori</p>
               <select name="categorySelector" ref={categorySelector}>
                  {categories.map((category) => (
                     <option key={category.id} value={category.id}>
                        {category.name}
                     </option>
                  ))}
               </select>
            </div>
            <div>
               <label htmlFor="artistName">Namn</label>
               <input
                  type="text"
                  id="artistName"
                  ref={artistName}
                  name="artistName"
                  className="textInput"
               ></input>
               <div ref={errorArtistName} className="notVisible errorText">
                  Ange artistnamn!
               </div>
            </div>
            <div>
               <label htmlFor="artistDescription">Beskrivning</label>
               <input
                  type="text"
                  id="artistDescription"
                  ref={artistDescription}
                  name="artistDescription"
                  className="textInput"
               ></input>
            </div>
            <br />
            <button type="submit" ref={saveArtistButton}>
               Spara artist
            </button>
            <div className="outer-message-box">
               <div ref={messageSavedArtist} className="notVisible messageBox">
                  Ny artist sparad!
               </div>
            </div>
         </form>
         <br />
         <br />
         <button
            ref={addRecordsButton}
            type="button"
            id="addRecordsButton"
            className="notVisible"
            onClick={gotoAddRecords}
         >
            Lägg till skivor
         </button>
      </>
   )
}

export default AddArtistPage
