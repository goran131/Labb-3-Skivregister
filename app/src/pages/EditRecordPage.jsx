import { useContext, useRef, useEffect } from 'react'
import { CategoriesContext, jsonServerUrl, expressServerUrl } from '../App.jsx'
import { useLocation, Link } from 'react-router-dom'
import AddTracks from '../components/AddTracks.jsx'

function EditRecordPage() {
   const contextValue = useContext(CategoriesContext)
   let categories = contextValue.categories

   const localCategories = window.localStorage.getItem('recordCategories');

   if (categories.length == 0 && localCategories !== null ) {
      categories = JSON.parse(localCategories);
   }
   else if (categories.length > 0) {
      window.localStorage.setItem('recordCategories', JSON.stringify(categories));
   }

   const location = useLocation()
   const [record, artistID, categoryID] = location.state

   let [category] = categories.slice(categoryID, categoryID + 1)

   const recordTitle = useRef(null)
   const recordDescription = useRef(null)
   const recordYear = useRef(null)
   const mediumSelector = useRef(null)
   const coverImageFile = useRef(null)
   const messageSavedRecord = useRef(null)
   const oldImageFilename = useRef(null);

   const errorCoverImage = useRef(null)
   const errorRecord = useRef(null)
   const errorRecordTitle = useRef(null)

   useEffect  (() => {
      fillRecordForm(record);
      if (record.tracks.length > 10) {
         document.querySelector('#moreTracksDiv').style.display = 'block';
         document.querySelector('#addMoreTracksButton').style.display = 'none';
      }
   }, []);

   const fillRecordForm = (record) => {
      recordTitle.current.value = record.title;
      recordDescription.current.value = record.description;
      recordYear.current.value = record.year;
      mediumSelector.current.value = record.medium;
      oldImageFilename.current.innerHTML = record.coverImage.replace("/images/", "");

      for (let i = 0; i < record.tracks.length; i++) {
         record.tracks[i].id == 0 ? document.querySelector('input[name="track1"]').value = record.tracks[i].name
         : record.tracks[i].id == 1 ? document.querySelector('input[name="track2"]').value = record.tracks[i].name
         : record.tracks[i].id == 2 ? document.querySelector('input[name="track3"]').value = record.tracks[i].name
         : record.tracks[i].id == 3 ? document.querySelector('input[name="track4"]').value = record.tracks[i].name
         : record.tracks[i].id == 4 ? document.querySelector('input[name="track5"]').value = record.tracks[i].name
         : record.tracks[i].id == 5 ? document.querySelector('input[name="track6"]').value = record.tracks[i].name
         : record.tracks[i].id == 6 ? document.querySelector('input[name="track7"]').value = record.tracks[i].name
         : record.tracks[i].id == 7 ? document.querySelector('input[name="track8"]').value = record.tracks[i].name
         : record.tracks[i].id == 8 ? document.querySelector('input[name="track9"]').value = record.tracks[i].name
         : record.tracks[i].id == 9 ? document.querySelector('input[name="track10"]').value = record.tracks[i].name
         : record.tracks[i].id == 10 ? document.querySelector('input[name="track11"]').value = record.tracks[i].name
         : record.tracks[i].id == 11 ? document.querySelector('input[name="track12"]').value = record.tracks[i].name
         : record.tracks[i].id == 12 ? document.querySelector('input[name="track13"]').value = record.tracks[i].name
         : record.tracks[i].id == 13 ? document.querySelector('input[name="track14"]').value = record.tracks[i].name
         : record.tracks[i].id == 14 ? document.querySelector('input[name="track15"]').value = record.tracks[i].name
         : record.tracks[i].id == 15 ? document.querySelector('input[name="track16"]').value = record.tracks[i].name
         : record.tracks[i].id == 16 ? document.querySelector('input[name="track17"]').value = record.tracks[i].name
         : record.tracks[i].id == 17 ? document.querySelector('input[name="track18"]').value = record.tracks[i].name
         : record.tracks[i].id == 18 ? document.querySelector('input[name="track19"]').value = record.tracks[i].name
         : record.tracks[i].id == 19 ? document.querySelector('input[name="track20"]').value = record.tracks[i].name
         : null
      }
   }



   const saveRecord = (event) => {
      event.preventDefault()

      if (validateRecordForm() == false) {
         return
      }

      if (event.target.coverImageFile.files.length > 0) {
         record.coverImage = /images/ + event.target.coverImageFile.files[0].name;
         uploadImage(event.target.coverImageFile.files[0])
      }
      record.title = event.target.recordTitle.value
      record.description = event.target.recordDescription.value
      record.year = event.target.recordYear.value
      record.medium = event.target.mediumSelector.value

      let tracks = [];

      tracks[0] = { id: 0, name: event.target.track1.value }
      tracks[1] = { id: 1, name: event.target.track2.value }
      tracks[2] = { id: 2, name: event.target.track3.value }
      tracks[3] = { id: 3, name: event.target.track4.value }
      tracks[4] = { id: 4, name: event.target.track5.value }
      tracks[5] = { id: 5, name: event.target.track6.value }
      tracks[6] = { id: 6, name: event.target.track7.value }
      tracks[7] = { id: 7, name: event.target.track8.value }
      tracks[8] = { id: 8, name: event.target.track9.value }
      tracks[9] = { id: 9, name: event.target.track10.value }

      tracks[10] = { id: 10, name: event.target.track11.value }
      tracks[11] = { id: 11, name: event.target.track12.value }
      tracks[12] = { id: 12, name: event.target.track13.value }
      tracks[13] = { id: 13, name: event.target.track14.value }
      tracks[14] = { id: 14, name: event.target.track15.value }
      tracks[15] = { id: 15, name: event.target.track16.value }
      tracks[16] = { id: 16, name: event.target.track17.value }
      tracks[17] = { id: 17, name: event.target.track18.value }
      tracks[18] = { id: 18, name: event.target.track19.value }
      tracks[19] = { id: 19, name: event.target.track20.value }

      let lastTrackID = 19

      for (let i = 0; i < 20; i++) {
         if (tracks[i].name == '') {
            lastTrackID = i - 1
            break
         }
      }

      if (lastTrackID < 19) {
         tracks = tracks.slice(0, lastTrackID + 1)
      }

      record.tracks = tracks;

      category.artists[artistID].records.splice(record.id, 1, record)
      categories.splice(category.id, 1, category)

      const requestOptions = {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(category)
      }

      fetch(jsonServerUrl + '/categories/' + category.id, requestOptions).then((response) => {
         if (response.ok) {
            contextValue.setCategories(categories)
            window.localStorage.setItem('recordCategories', JSON.stringify(categories));
            showMessage(messageSavedRecord)
            errorRecordTitle.current.style.display = 'none'
            errorRecord.current.style.display = 'none'
         }
         else {
            console.error('Något gick fel vid spara skiva')
         }
      })
   }

   const uploadImage = async (imageFile) => {
      const formData = new FormData()
      formData.append('file', imageFile)

      try {
         const result = await fetch(expressServerUrl, {
            method: 'POST',
            body: formData
         })

         await result.json()
      } catch (error) {
         console.error(error)
      }
   }

   const showMessage = (messageBox) => {
      messageBox.current.style.display = 'inline-block'
      setTimeout(() => {
          messageBox.current.style.display = 'none'
      }, 3000)
  }

   // Returnerar true om det inte finns några fel
   const validateRecordForm = () => {
      let noErrors = true

      if (recordTitle.current.value == '') {
         errorRecordTitle.current.style.display = 'block'
         noErrors = false
      }

      if (noErrors == false) {
         errorRecord.current.style.display = 'inline'
         errorRecord.current.style.margin = '0 0 0 30px'
      }

      return noErrors
   }

   return (
      <>
         <form id="editRecordForm" onSubmit={saveRecord}>
            <h2>{record.artist}</h2>
            <h3>Ändra skiva</h3>
            <div>
               <label htmlFor="recordTitle">Titel:</label>
               <input
                  id="recordTitle"
                  ref={recordTitle}
                  type="text"
                  name="recordTitle"
                  className="textInput"
               ></input>
               <div ref={errorRecordTitle} className="notVisible errorText">
                  Ange skivans titel!
               </div>
            </div>
            <div>
               <label htmlFor="recordDescription">Beskrivning:</label>
               <input
                  id="recordDescription"
                  ref={recordDescription}
                  type="text"
                  name="recordDescription"
                  className="textInput"
               ></input>
            </div>
            <div>
               <label htmlFor="recordDescription">Utgivningsår:</label>
               <input
                  id="recordYear"
                  ref={recordYear}
                  type="text"
                  name="recordYear"
                  className="textInput"
               />
            </div>
            <div className="selector-div">
               <p>Välj medium</p>
               <select name="mediumSelector" ref={mediumSelector}>
                  <option value="LP">LP</option>
                  <option value="2-LP">2-LP</option>
                  <option value="CD">CD</option>
                  <option value="2-CD">2-CD</option>
                  <option value="CDR">CDR</option>
                  <option value="2-CDR">2-CDR</option>
                  <option value="Vinylsingel">Vinylsingel</option>
                  <option value="Vinyl-maxisingel">Vinyl-maxisingel</option>
                  <option value="Cd-singel">CD-singel</option>
                  <option value="Cd-maxisingel">Vinyl-maxisingel</option>
               </select>
            </div>
            <div>
               <label htmlFor="coverImageFile" className="imagefile-label">
                  Skivomslagsbild:&nbsp; <b><span ref={oldImageFilename}></span></b>
               </label>
               <div style={{clear: "both"}}>
                  Välj en ny omslagsbild!&nbsp;&nbsp;&nbsp;
                  <input type="file" id="coverImageFile" ref={coverImageFile} name="coverImageFile" />
               </div>
            </div>

            <AddTracks />

            <br />
            <br />

            <button type="submit">Spara skiva</button>

            <div ref={errorRecord} className="notVisible errorText">
               Det finns fel i formuläret!
            </div>
            <div className="outer-messageBox">
               <div ref={messageSavedRecord} className="notVisible messageBox">
                  Skivan är sparad!
               </div>
            </div>
         </form>
         <Link to="/pages/RecordPage/" state={[record, artistID, categoryID]} className="backlink">
            Tillbaka
         </Link>
      </>
   )
}

export default EditRecordPage
