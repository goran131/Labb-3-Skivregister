import { useContext, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { CategoriesContext, jsonServerUrl, expressServerUrl } from '../App.jsx'
import AddTracks from '../components/AddTracks.jsx'

function AddArtistPage() {
    const contextValue = useContext(CategoriesContext)
    let categories = contextValue.categories

    let newArtist = null
    let category = null

    const location = useLocation()
    let categoryID = location.state // Om categoryID finns i location.state så ska den kategorin vara förvald

    const categorySelector = useRef(null)

    if (categoryID != null) {
        setTimeout(() => {
            categorySelector.current.selectedIndex = categoryID
        }, 50)
    }

    // setUseRefs() // Det går inte att anropa setUseRefs before initialisation. Varför

    const artistName = useRef(null)
    const artistDescription = useRef(null)
    const saveArtistButton = useRef(null)
    const messageSavedArtist = useRef(null)

    const errorArtistName = useRef(null)

    const addRecordDiv = useRef(null)
    const addRecordForm = useRef(null)
    const recordTitle = useRef(null)
    const recordDescription = useRef(null)
    const recordYear = useRef(null)
    const mediumSelector = useRef(null)
    const coverImageFile = useRef(null)
    const messageSavedRecord = useRef(null)

    const errorCoverImage = useRef(null)
    const errorRecord = useRef(null)
    const errorRecordTitle = useRef(null)

    const SaveNewArtist = (event) => {
        event.preventDefault()

        let categoryID = event.target.categorySelector.selectedOptions[0].value

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
                    addRecordDiv.current.style.display = 'block'
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

    const setUseRefs = () => {
        const artistName = useRef(null)
        const artistDescription = useRef(null)
        const saveArtistButton = useRef(null)
        const messageSavedArtist = useRef(null)

        const errorArtistName = useRef(null)

        const addRecordDiv = useRef(null)
        const addRecordForm = useRef(null)
        const recordTitle = useRef(null)
        const recordDescription = useRef(null)
        const recordYear = useRef(null)
        const mediumSelector = useRef(null)
        const coverImageFile = useRef(null)
        const messageSavedRecord = useRef(null)

        const errorCoverImage = useRef(null)
        const errorRecordTitle = useRef(null)
        const errorRecord = useRef(null)
    }

    const disableArtistForm = () => {
        categorySelector.current.disabled = true
        artistName.current.disabled = true
        artistDescription.current.disabled = true
        saveArtistButton.current.disabled = true
    }

    const saveRecord = (event) => {
        event.preventDefault()

        if (validateRecordForm() == false) {
            return
        }

        let recordID = newArtist.records.length
        let imageUrl = /images/ + event.target.coverImageFile.files[0].name
        let recordTitle = event.target.recordTitle.value
        let recordDescription = event.target.recordDescription.value
        let year = event.target.recordYear.value
        let medium = event.target.mediumSelector.value
        let tracks = []

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

        let newRecord = {
            id: recordID,
            artist: newArtist.name,
            title: recordTitle,
            description: recordDescription,
            coverImage: imageUrl,
            year: year,
            medium: medium,
            tracks: tracks
        }

        newArtist.records = [...newArtist.records, newRecord]

        category.artists.splice(newArtist.id, 1, newArtist)

        let newCategories = categories

        newCategories.splice(category.id, 1, category)

        uploadImage(event.target.coverImageFile.files[0])

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(category)
        }

        fetch(
            jsonServerUrl + '/categories/' + category.id,
            requestOptions
        ).then((response) => {
            if (response.ok) {
                contextValue.setCategories(newCategories)
                showMessage(messageSavedRecord)
                resetRecordForm()
            } else {
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

    // Returnerar true om det inte finns några fel
    const validateRecordForm = () => {
        let noErrors = true

        if (recordTitle.current.value == '') {
            errorRecordTitle.current.style.display = 'block'
            noErrors = false
        }

        if (coverImageFile.current.value == '') {
            errorCoverImage.current.style.display = 'block'
            noErrors = false
        }

        if (noErrors == false) {
            errorRecord.current.style.display = 'inline'
            errorRecord.current.style.margin = '0 0 0 30px'
        }

        return noErrors
    }

    const resetRecordForm = () => {
        recordTitle.current.value = ''
        recordDescription.current.value = ''
        recordYear.current.value = ''
        mediumSelector.current.selectValue = 'LP'
        coverImageFile.current.value = ''
        errorRecordTitle.current.style.display = 'none'
        errorCoverImage.current.style.display = 'none'
        errorRecord.current.style.display = 'none'
    }

    return (
        <>
            <h3>Lägg till ny artist</h3>
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
                    <div
                        ref={messageSavedArtist}
                        className="notVisible messageBox"
                    >
                        Ny artist sparad!
                    </div>
                </div>
            </form>
            <br />

            <div ref={addRecordDiv} className="notVisible">
                <form
                    id="addRecordForm"
                    ref={addRecordForm}
                    onSubmit={saveRecord}
                >
                    <h3>Lägg till skivor</h3>
                    <div>
                        <label htmlFor="recordTitle">Titel:</label>
                        <input
                            id="recordTitle"
                            ref={recordTitle}
                            type="text"
                            name="recordTitle"
                            className="textInput"
                        ></input>
                        <div
                            ref={errorRecordTitle}
                            className="notVisible errorText"
                        >
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
                        <label htmlFor="recordYear">Utgivningsår:</label>
                        <input
                            id="recordYear"
                            ref={recordYear}
                            type="text"
                            name="recordYear"
                            className="textInput"
                        ></input>
                    </div>
                    <div className="selector-div">
                        <p>Välj medium</p>
                        <select name="mediumSelector" ref={mediumSelector}>
                            <option value="LP">LP</option>
                            <option value="Dubbel-LP">Dubbel-LP</option>
                            <option value="CD">CD</option>
                            <option value="Dubbel-CD">Dubbel-CD</option>
                            <option value="Vinylsingel">Vinylsingel</option>
                            <option value="Vinyl-maxisingel">
                                Vinyl-maxisingel
                            </option>
                            <option value="Cd-singel">CD-singel</option>
                            <option value="Cd-maxisingel">
                                Vinyl-maxisingel
                            </option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="coverImageFile">Skivomslagsbild:</label>
                        <br />
                        <input
                            type="file"
                            id="coverImageFile"
                            ref={coverImageFile}
                            name="coverImageFile"
                        ></input>
                        <div
                            ref={errorCoverImage}
                            className="notVisible errorText"
                        >
                            Välj en omslagsbild!
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
                        <div
                            ref={messageSavedRecord}
                            className="notVisible messageBox"
                        >
                            Skivan är sparad!
                        </div>
                    </div>
                    <br />
                    <br />
                </form>
            </div>
        </>
    )
}

export default AddArtistPage
