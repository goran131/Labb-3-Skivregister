import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CategoriesContext } from '../App.jsx'

function Home() {
    const value = useContext(CategoriesContext)
    const categories = value.categories

    return (
        <>
            <div>
                <p>
                    Här kan du lägga upp hela din skivsamling grupperad efter
                    musikkategorier. Du kan även skapa egna kategorier.
                </p>
                <div>
                    <h3>Musikkategorier</h3>
                    {categories.map((category) => (
                        <div key={category.id}>
                            <Link to="/pages/CategoryPage" state={category}>
                                {category.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
