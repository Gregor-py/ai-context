'use client'
import {Button} from '@/components/ui/button'
import {useAuth} from "@/hooks/useAuth";

export default function Home() {
    const {user,logOut,googleSignIn} = useAuth()
    const handleSignIn = async () => {
        try {
            await googleSignIn()
        } catch (error) {
            console.error(error)
        }
    }
    const handleLogOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <Button onClick={handleSignIn} variant={'default'}>Login</Button>
            {user && <Button onClick={handleLogOut} variant={'default'}>Log out ({user.displayName})</Button>}
        </div>
    )
}
