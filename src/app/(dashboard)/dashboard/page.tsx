'use client'

import {Button} from "@/components/ui/button";
import {useAuth} from "@/hooks/useAuth";
import {useProtectedRoute} from "@/hooks/useProtectedRoute";

export default function Dashboard() {
    useProtectedRoute()
    const {user, logOut} = useAuth()
    const handleLogOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.error(error)
        }
    }

    if (!user) {
        return null;
    }

    return (
        <div>
            <div className={'text-7xl text-violet-700'}>
                Dashboard
            </div>
            <Button onClick={handleLogOut} variant={'default'}>Log out ({user.displayName})</Button>
        </div>
    )
}