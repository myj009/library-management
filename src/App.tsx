import './App.css'
import Login from './pages/Login'
import HomePage from './pages/Home'
import Signup from './pages/Signup'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'

function App() {

  return (
    <BrowserRouter>
      <div className="root-container">
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        </Routes>
        </AuthContextProvider>
      </div>
    </BrowserRouter>
  )
}

export default App
