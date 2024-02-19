import { useLocation, Link } from 'react-router-dom'
import { CategoriesContext, jsonServerUrl } from '../App.jsx'
import { useContext, useRef, useState } from 'react'
import removeIcon from '/src/assets/remove-icon.webp'

function ArtistPage() {
    const location = useLocation()
    const [artistID, categoryID] = location.state

    const contextValue = useContext(CategoriesContext)
    let categories = contextValue.categories

    let [category] = categories.slice(categoryID, categoryID + 1)

    let [artist] = categories[categoryID].artists.slice(artistID, artistID + 1)

    const addRecordsButton = useRef(null)

    // Borde funka utan en timeout
    const changeText = () => {
        setTimeout(function () {
            if (artist.records.length == 0) {
                addRecordsButton.current.innerText = 'Lägg till skivor'
            }
        }, 50)
    }

    const removeRecord = (record) => {
        let res = confirm(
            'Vill du verkligen ta bort ' +
                record.title +
                '. Det går inte att ångra.'
        )

        if (res == true) {
            removeRecordFromJSON(record)
        }
    }

    const removeRecordFromJSON = (record) => {
        categories[category.id].artists[artist.id].records.splice(record.id, 1)
        resetRecordIDs(categories[category.id].artists[artist.id].records)

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
                alert('Skivan är ' + record.title + ' är borttagen')
                contextValue.setCategories(categories)
                window.location.reload()
            } else {
                console.error('Något gick fel vid borttagning av skiva')
            }
        })
    }

    const resetRecordIDs = (records) => {
        for (let i = 0; i < records.length; i++) {
            records[i].id = i
        }
    }

    return (
        <>
            <div>
                <h2>{artist.name}</h2>
                <p>{artist.description}</p>
                {artist.records.map((record) => (
                    <div key={record.id} className="records">
                        <Link
                            to="/pages/RecordPage"
                            state={[record, artist, category.id]}
                        >
                            {record.medium + ': ' + record.title}
                        </Link>
                        <img
                            src={removeIcon}
                            className="remove-icon"
                            onClick={() => {
                                return removeRecord(record)
                            }}
                        />
                    </div>
                ))}
            </div>
            <br />
            <Link
                to="/pages/AddRecordsPage"
                state={[artist, category.id]}
                onLoad={changeText()}
            >
                <button
                    ref={addRecordsButton}
                    type="button"
                    id="addRecordsButton"
                >
                    Lägg till fler skivor
                </button>
            </Link>

            <Link
                to="/pages/CategoryPage/"
                state={category}
                className="backlink"
            >
                Tillbaka
            </Link>
        </>
    )
}

export default ArtistPage
