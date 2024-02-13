import { useLocation, Link } from 'react-router-dom'
import { useRef } from 'react'

function ArtistPage() {
    const location = useLocation()
    const [artist, categoryID] = location.state

    const addRecordsButton = useRef(null)

    // Borde funka utan en timeout
    const changeText = () => {
        setTimeout(function () {
            if (artist.records.length == 0) {
                addRecordsButton.current.innerText = 'Lägg till skivor'
            }
        }, 50)
    }

    return (
        <>
            <div>
                <h2>{artist.name}</h2>
                <p>{artist.description}</p>
                {artist.records.map((record) => (
                    <div key={record.id}>
                        <Link
                            to="/pages/RecordPage"
                            state={[record, artist, categoryID]}
                        >
                            {record.medium + ': ' + record.title}
                        </Link>
                    </div>
                ))}
            </div>
            <br />
            <Link
                to="/pages/AddRecordsPage"
                state={[artist, categoryID]}
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
        </>
    )
}

export default ArtistPage
