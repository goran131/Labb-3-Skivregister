import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, createContext } from 'react'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ArtistPage from './pages/ArtistPage'
import RecordPage from './pages/RecordPage'
import AddArtistPage from './pages/AddArtistPage'
import AddRecordsPage from './pages/AddRecordsPage'
import AddCategoriesPage from './pages/AddCategoriesPage'

export const CategoriesContext = createContext()

export const jsonServerUrl = 'http://localhost:5030'
export const expressServerUrl = 'http://localhost:5050/upload'
// export const jsonServerUrl = 'https://api-json-server-xi.vercel.app'
// export const expressServerUrl = 'https://api-express-server.vercel.app/upload'

function App() {
   const [categories, setCategories] = useState([])

   useEffect(() => {
      fetch(jsonServerUrl + '/categories', { method: 'GET' })
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
                  path="/pages/AddcategoriesPage"
                  element={<AddCategoriesPage />}
               />
               <Route path="/pages/ArtistPage" element={<ArtistPage />} />
               <Route path="/pages/RecordPage" element={<RecordPage />} />
               <Route
                  path="/pages/AddArtistPage/"
                  element={<AddArtistPage />}
               />
               <Route
                  path="/pages/AddRecordsPage"
                  element={<AddRecordsPage />}
               />
            </Routes>
         </CategoriesContext.Provider>
      </>
   )
}

export default App
