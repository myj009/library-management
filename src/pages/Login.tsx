import React, { useState } from "react";
import styles from "./styles/login.module.css";
import FormInputArea from "../components/FormInputArea";
import { Link, useNavigate } from "react-router-dom";
import { UserCredential } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { loginWithEmailAndPassword, signInWithGoogle } = useAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await loginWithEmailAndPassword(email, password);
      navigate("/");
    } catch {
      setError("Failed to login");
    }
    setLoading(false);
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then((result: UserCredential) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.main_div}>
      <div className={styles.app_container}>
        {/* card with 2 sides. Image on left side and signup form on the right sides */}
        <div className={styles.card}>
          <div className={styles.left}></div>
          <div className={styles.right}>
            <div className={styles.title}>
              <h1>Login</h1>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <form className={styles.form} onSubmit={handleSubmit}>
              <FormInputArea
                title="Email-Id"
                type="email"
                name="email"
                onChange={handleEmailChange}
                value={email}
              />
              <FormInputArea
                title="Password"
                type="password"
                name="password"
                onChange={handlePasswordChange}
                value={password}
              />
              <div className={styles.login_area}>
                <button
                  className={styles.button}
                  disabled={loading}
                  type="submit"
                >
                  Log In
                </button>
                <Link to="/signup">Sign Up</Link>
              </div>
            </form>
            <div className={styles.line}>
              <p className={styles.or_tag}>OR</p>
            </div>
            <div className={styles.google_button_div}>
              <button
                disabled={loading}
                className={`${styles.google_button} ${styles.button}`}
                onClick={handleSignInWithGoogle}
              >
                <img
                  className={styles.icon_md}
                  src="./../assets/google_icon.png"
                ></img>
                <p>Continue with Google</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
