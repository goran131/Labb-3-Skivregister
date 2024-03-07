import { useLocation, Link } from 'react-router-dom'
import { CategoriesContext, jsonServerUrl } from '../App.jsx'
import { useContext, useRef, useEffect } from 'react'

function ArtistPage() {
   const location = useLocation()
   const [artistID, categoryID] = location.state

   const contextValue = useContext(CategoriesContext)
   let categories = contextValue.categories

   const localCategories = window.localStorage.getItem('artistCategories');

   if (categories.length == 0 && localCategories !== null ) {
      categories = JSON.parse(localCategories);
   }
   else if (categories.length > 0) {
      window.localStorage.setItem('artistCategories', JSON.stringify(categories));
   }

   let [category] = categories.slice(categoryID, categoryID + 1)

   let [artist] = categories[categoryID].artists.slice(artistID, artistID + 1)

   const artistDiv = useRef(null)
   const recordList = useRef(null)
   const addRecordsButton = useRef(null)
   const deleteArtistButton = useRef(null)

   useEffect (() => {
      if (artist.records.length == 0) {
         addRecordsButton.current.innerText = 'Lägg till skivor'
      }
   }, []);

   const deleteRecord = (record) => {
      let res = confirm(
         'Vill du verkligen ta bort ' + record.title + '. Det går inte att ångra.'
      )

      if (res == true) {
         deleteRecordFromJSON(record)
      }
   }

   const deleteRecordFromJSON = (record) => {
      categories[category.id].artists[artist.id].records.splice(record.id, 1)
      resetIDs(categories[category.id].artists[artist.id].records)

      const requestOptions = {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(categories[category.id])
      }

      fetch(
         jsonServerUrl + '/categories/' + category.id,
         requestOptions
      ).then((response) => {
         if (response.ok) {
            contextValue.setCategories(categories)
            recordList.current.children[record.id].innerHTML = "";
         }
         else {
            console.error('Något gick fel vid borttagning av skiva')
         }
      })
   }

   const resetIDs = (array) => {
      for (let i = 0; i < array.length; i++) {
         array[i].id = i;
      }
   }

   const deleteArtist = () => {
      let res = confirm(
         'Vill du verkligen ta bort ' + artist.name + '. Det går inte att ångra.'
      )

      if (res == true) {
         deleteArtistFromJSON()
      }
   }


   const deleteArtistFromJSON = () => {
      categories[category.id].artists.splice(artist.id, 1)
      resetIDs(categories[category.id].artists)

      const requestOptions = {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(categories[category.id])
      }

      fetch(
         jsonServerUrl + '/categories/' + category.id,
         requestOptions
      ).then((response) => {
         if (response.ok) {
            contextValue.setCategories(categories)
            artistDiv.current.innerHTML = "";
         }
         else {
            console.error('Något gick fel vid borttagning av artist')
         }
      })
   }

   return (
      <>
         <h3>{category.name}</h3>
         <div ref={artistDiv}>
            <h2>{artist.name}</h2>
            <p>{artist.description}</p>
            <div ref={recordList}>
               {artist.records.map((record) => (
                  <div key={record.id} className="records">
                     <Link
                        to="/pages/RecordPage"
                        state={[record, artistID, category.id]}
                     >
                        {record.medium + ': ' + record.title}
                     </Link>
                     <img
                        src="/delete-icon.webp"
                        className="delete-icon"
                        onClick={() => { return deleteRecord(record) }}
                     />
                  </div>
               ))}
            </div>

            <div className="buttons-div">
               <Link to="/pages/AddRecordsPage" state={[artist, category.id]} >
                  <button ref={addRecordsButton} type="button" id="addRecordsButton">
                     Lägg till fler skivor
                  </button>
               </Link>

               <button ref={deleteArtistButton} type="button" id="deleteArtistButton" onClick={ deleteArtist}>
                  Ta bort artist
               </button>
            </div>
         </div>

         <Link to="/pages/CategoryPage/" state={category} className="backlink">
            Tillbaka
         </Link>
      </>
   )
}

export default ArtistPage
