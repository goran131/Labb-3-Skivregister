import { useLocation, Link } from 'react-router-dom'

const CategoryPage = () => {
    const location = useLocation()
    const category = location.state

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
                </div>
            </div>
        </>
    )
}

export default CategoryPage
