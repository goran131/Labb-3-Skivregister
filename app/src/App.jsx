import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, createContext } from 'react'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ArtistPage from './pages/ArtistPage'
import RecordPage from './pages/RecordPage'
import AddArtistPage from './pages/AddArtistPage'
import AddRecordsPage from './pages/AddRecordsPage'

export const CategoriesContext = createContext()

function App() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch('http://localhost:5030/categories')
            .then((response) => response.json())
            .then((categories) => setCategories(categories))
    }, [])

    return (
        <>
            <CategoriesContext.Provider value={{ categories, setCategories }}>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route
                        path="/pages/CategoryPage"
                        element={<CategoryPage />}
                    />
                    <Route
                        path="/pages/ArtistPage/:categoryID"
                        element={<ArtistPage />}
                    />
                    <Route path="/pages/RecordPage" element={<RecordPage />} />
                    <Route
                        path="/pages/AddArtistPage/"
                        element={<AddArtistPage />}
                    />
                    <Route
                        path="/pages/AddRecordsPage/:categoryID"
                        element={<AddRecordsPage />}
                    />
                </Routes>
            </CategoriesContext.Provider>
        </>
    )
}

export default App
