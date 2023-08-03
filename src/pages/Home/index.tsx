import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

function HomePage() {

  const navigate = useNavigate()
  const {user, logout} = useAuth()

  async function handleSignOut() {
    try {
      await logout()
      navigate('/login')
    }
    catch {
      console.log("Failed to log out")
    }
  }

  return (
    <>
    <div>{user?.email}</div>
    <button onClick={handleSignOut}>Sign out</button>
    </>
  )
}

export default HomePage