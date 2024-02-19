import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import App from '../App.jsx'

test('Renders the main page', () => {
    render(<App />)
    expect(true).toBeTruthy()
})
