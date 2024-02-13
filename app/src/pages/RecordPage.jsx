import { useLocation, Link } from 'react-router-dom'
import ImagePopup from '../components/ImagePopup'
import 'reactjs-popup/dist/index.css'
import css from './RecordPage.module.css'

function RecordPage() {
    const location = useLocation()
    const [record, artist, categoryID] = location.state

    return (
        <>
            <div>
                <h3>Artist: {artist.name}</h3>
                <h3>Skivtitel: {record.title}</h3>
                <p>Utgivningsår: {record.year}</p>

                <p>Medium: {record.medium}</p>
                <p>{record.description}</p>
                <p>
                    <strong>Låtar:</strong>
                </p>
                <div>
                    {record.tracks.length > 0 ? (
                        <ol className={css.left}>
                            {record.tracks.map((track) => (
                                <li key={track.id}>{track.name}</li>
                            ))}
                        </ol>
                    ) : (
                        <div className={css.leftNoTracks}>
                            Ingen låtlista är tillgänglig
                        </div>
                    )}

                    <div className={css.right}>
                        <div className={css.imageBox}>
                            <ImagePopup imageUrl={record.coverImage} />
                        </div>
                    </div>
                </div>
            </div>

            <Link
                to="/pages/ArtistPage/"
                state={[artist, categoryID]}
                className="backlink"
            >
                Tillbaka
            </Link>
        </>
    )
}

export default RecordPage
