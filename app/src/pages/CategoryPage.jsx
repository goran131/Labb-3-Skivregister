import { useLocation, Link } from 'react-router-dom'
// import { React, useState, useEffect } from 'react'

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
                        <div key={artist.id}>
                            <Link
                                to={'/pages/ArtistPage/' + category.id}
                                state={artist}
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
