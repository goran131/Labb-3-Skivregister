import { useRef, ReactElement } from 'react'
import { useLocation, Link } from 'react-router-dom'

const CategoryPage = (): ReactElement => {
    const location = useLocation()
    const category = location.state

    const noArtistsText = useRef(null)
    const addArtistsLink = useRef(null)

    if (category.artists.length == 0) {
        setTimeout(() => {
            noArtistsText.current.style.display = 'block'
            addArtistsLink.current.style.display = 'block'
        }, 50)
    }

    return (
        <>
            <div>
                <h2>{category.name}</h2>

                <div>
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

                    <br />
                    <br />

                    <Link
                        ref={addArtistsLink}
                        to="/pages/AddArtistPage"
                        state={category.id}
                        className="notVisible"
                    >
                        <button type="button" id="addArtistsButton">
                            Lägg till artister
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default CategoryPage
