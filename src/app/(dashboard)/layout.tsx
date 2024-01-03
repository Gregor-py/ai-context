'use client'
import React from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import {useProtectedRoute} from "@/hooks/useProtectedRoute";
import {useAuth} from "@/hooks/useAuth";

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
    useProtectedRoute()
    const {user} = useAuth()

    if (!user) {
        return null;
    }
    return (
        <div className={'h-full relative'}>
            <div className={'hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900 md:w-72'}>
                <div>
                    <Sidebar/>
                </div>
            </div>
            <main className={'md:pl-72'}>
                <Navbar />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout;