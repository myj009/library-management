import { Link } from "react-router-dom";
import styles from "./styles/header.module.css";
import CustomLink from "./CustomLink";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AddBookModal from "./AddBookModal";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  async function handleSignOut() {
    try {
      await logout();
      navigate("/login");
    } catch {
      console.log("Failed to log out");
    }
  }

  return (
    <>
      <nav className={styles.main_nav}>
        <div className={styles.nav_logo}>
          <Link to="/">
            <h1>Bookstore</h1>
          </Link>
        </div>
        <div className={styles.nav_links}>
          <ul>
            <button
              type="button"
              className={`btn btn-primary ` + styles.add_book_btn}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add book
            </button>
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/books">Books</CustomLink>
            <li>
              <a href="#" onClick={handleSignOut}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <AddBookModal />
      </div>
    </>
  );
};

export default Header;
