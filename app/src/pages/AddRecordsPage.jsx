import { useContext, useRef } from 'react'
import { CategoriesContext } from '../App.jsx'
import { useLocation, useParams, Link } from 'react-router-dom'
import AddTracks from '../components/AddTracks.jsx'

function AddRecordsPage() {
    const contextValue = useContext(CategoriesContext)
    let categories = contextValue.categories

    const { categoryID } = useParams()
    let [category] = categories.slice(categoryID, categoryID + 1)

    const location = useLocation()
    const artist = location.state

    const addRecordForm = useRef(null)
    const recordTitle = useRef(null)
    const recordDescription = useRef(null)
    const recordYear = useRef(null)
    const mediumSelector = useRef(null)
    const coverImageFile = useRef(null)

    const saveRecord = (event) => {
        event.preventDefault()

        let recordID = artist.records.length
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
            artist: artist.name,
            title: recordTitle,
            description: recordDescription,
            coverImage: imageUrl,
            year: year,
            medium: medium,
            tracks: tracks
        }

        artist.records = [...artist.records, newRecord]

        category.artists.splice(artist.id, 1, artist)

        categories.splice(category.id, 1, category)

        uploadImage(event.target.coverImageFile.files[0])

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(category)
        }

        fetch(
            'http://localhost:5030/categories/' + category.id,
            requestOptions
        ).then((response) => {
            if (response.ok) {
                alert('Skivan är sparad')
                contextValue.setCategories(categories)
                resetRecordForm()
            } else {
                console.error('Något gick fel vid spara skiva')
            }
        })
    }

    const uploadImage = async (imageFile) => {
        const formData = new FormData()
        formData.append('file', imageFile)
        const urlEndpoint = 'http://localhost:5050/upload'

        try {
            const result = await fetch(urlEndpoint, {
                method: 'POST',
                body: formData
            })

            await result.json()
        } catch (error) {
            console.error(error)
        }
    }

    const resetRecordForm = () => {
        recordTitle.current.value = ''
        recordDescription.current.value = ''
        recordYear.current.value = ''
        mediumSelector.current.selectValue = 'LP'
        coverImageFile.current.value = ''
    }

    return (
        <>
            <form id="addRecordForm" ref={addRecordForm} onSubmit={saveRecord}>
                <h2>{artist.name}</h2>
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
                        <option value="Cd-maxisingel">Vinyl-maxisingel</option>
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
                </div>

                <AddTracks />
                <br />
                <br />
                <button type="submit">Spara skiva</button>
            </form>
            <br />
            <Link
                to={'/pages/ArtistPage/' + categoryID}
                state={artist}
                className="backlink"
            >
                Tillbaka
            </Link>
        </>
    )
}

export default AddRecordsPage
