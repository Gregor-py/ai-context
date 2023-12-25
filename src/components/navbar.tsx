'use client'
import {Menu} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/hooks/useAuth";
import MobileSidebar from "@/components/mobile-sidebar";

const Navbar = () => {
    const {logOut} = useAuth()
    const handleLogOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={'flex items-center p-4'}>
            <MobileSidebar />
            <div className={'flex w-full justify-end'}>
                <Button variant={'destructive'} onClick={handleLogOut}>
                    Log out
                </Button>
            </div>
        </div>
    )
}

export default Navbar;