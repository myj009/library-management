import './App.css'
import Login from './components/Login/Login'
import HomePage from './components/Home'
import { Routes, Route, BrowserRouter } from 'react-router-dom'



// Add react router and configure routes for login and signup


function App() {

  return (
    <BrowserRouter>
      <div className="root-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
