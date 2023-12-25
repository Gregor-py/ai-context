'use client'

import {Button} from "@/components/ui/button";
import {useAuth} from "@/hooks/useAuth";
import {useProtectedRoute} from "@/hooks/useProtectedRoute";

export default function Dashboard() {
    useProtectedRoute()
    const {user} = useAuth()

    if (!user) {
        return null;
    }

    return (
        <div>
            <div className={'text-2xl text-violet-700'}>
                Dashboard
            </div>
        </div>
    )
}