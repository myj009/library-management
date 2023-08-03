import React, {createContext, useContext, useEffect, useState} from 'react';
import { GoogleAuthProvider, User, UserCredential, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

type AuthContextType = {
    user: User | null;
    signUpWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>;
    loginWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>;
    signInWithGoogle: () => Promise<UserCredential>;
    logout: () => Promise<void>;
};

type UserContextProps = {
    children: React.ReactNode;
};

const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => {
    return useContext(AuthContext);
}

export function AuthContextProvider({children}: UserContextProps) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Add an observer to get the current user or be notified when the user's auth state changes.
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            
        });
    
        // Unsubscribe the observer when the component unmounts.
        return () => unsubscribe();
    }, [])

    function signUpWithEmailAndPassword(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function loginWithEmailAndPassword(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }

    function logout() {
        return signOut(auth)
    }

    const exportValue : AuthContextType = {
        user,
        signUpWithEmailAndPassword,
        loginWithEmailAndPassword,
        logout,
        signInWithGoogle
    }

    return (
        <AuthContext.Provider value={exportValue}>
            {children}
        </AuthContext.Provider>
    )
}

