'use client'
import {GoogleAuthProvider, signInWithPopup, signOut} from "@firebase/auth";
import {auth} from "@/firebase";
import {AuthContext} from "@/context/AuthContext";
import {useContext} from "react";

export const useAuth = () => {
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }

    const logOut = async () => {
        signOut(auth)
    }

    const {user, loading} = useContext(AuthContext)

    return {
        googleSignIn,
        logOut,
        user,
        loading
    }
}