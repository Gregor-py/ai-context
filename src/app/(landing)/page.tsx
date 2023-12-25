'use client'
import {Button} from '@/components/ui/button'
import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/navigation";

export default function Home() {
    const {user,googleSignIn} = useAuth()
    const router = useRouter();
    const handleSignIn = async () => {
        try {
            await googleSignIn()
        } catch (error) {
            console.error(error)
        }
    }

    if (user) {
        router.push('/dashboard')
    }

    return (
        <div>
            <Button onClick={handleSignIn} variant={'default'}>Login</Button>

            <h1 className={'text-9xl text-indigo-700'}>Landing</h1>
        </div>
    )
}
