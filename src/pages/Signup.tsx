import React, { useState } from "react";
import FormInputArea from "../components/FormInputArea";
import styles from "./styles/signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { UserCredential } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, signUpWithEmailAndPassword, signInWithGoogle } = useAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setError("");
      setLoading(true);
      await signUpWithEmailAndPassword(email, password);
      //navigate('/')
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
    console.log(user);
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
    <div className="">
      <div className={styles.app_container}>
        {/* card with 2 sides. Image on left side and signup form on the right sides */}
        <div className={styles.card}>
          <div className={styles.left}></div>
          <div className={styles.right}>
            {error && <p style={{ color: "red" }}>{error}</p>}
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
              <FormInputArea
                title="Confirm Password"
                type="password"
                name="confirm-password"
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
              />
              <div className={styles.login_area}>
                <Link to="/login">Login</Link>
                <button
                  className={styles.button}
                  disabled={loading}
                  type="submit"
                >
                  Sign up
                </button>
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

export default Signup;
