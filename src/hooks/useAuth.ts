'use client'
import {GoogleAuthProvider, signInWithPopup, signOut} from "@firebase/auth";
import {auth, db, firestoreCollections} from "@/firebase";
import {AuthContext} from "@/context/AuthContext";
import {useContext} from "react";
import {collection, doc} from "@firebase/firestore";

export const useAuth = () => {
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }

    const logOut = async () => {
        signOut(auth)
    }

    const {user, loading} = useContext(AuthContext)

    const userRef = user ? doc(db, 'users', user.uid) : null

    return {
        googleSignIn,
        logOut,
        user,
        loading,
        userRef
    }
}