'use client'
import React, {createContext, useEffect, useState} from "react";
import {auth} from "@/firebase";
import {User as FirebaseUser} from "firebase/auth";

interface Auth {
    user: FirebaseUser | null;
    loading: boolean;
}

export const AuthContext = createContext<Auth>({user: null, loading: false});

export const AuthContextProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<FirebaseUser | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [user])

    return (
        <AuthContext.Provider value={{user, loading}}>
            {loading && <div className={'text-3xl text-red-600'}>Loading...</div>}
            {!loading && children}
        </AuthContext.Provider>
    );
};