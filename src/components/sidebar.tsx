import Link from "next/link";
import {Montserrat} from "next/font/google";
import {cn} from "@/lib/utils";
import {LayoutDashboard, WholeWord, Settings, ScrollText, Braces} from "lucide-react";

const montserrat = Montserrat({weight: "600", subsets: ['latin']})

const routes = [
    {label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", color: "text-sky-500"},
    {label: "Example generator", icon: WholeWord, href: "/example-generator", color: "text-green-400"},
    {label: "My sentences", icon: ScrollText, href: "/my-sentences", color: "text-red-500"},
    {label: "Paste json", icon: Braces, href: "/paste-json", color: "text-yellow-500"},
    {label: "Settings", icon: Settings, href: "/settings", color: "text-white"},
]

const Sidebar = () => {
    return (
        <div className={'space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'}>
            <div className={'px-3 py-2 flex-1'}>
                <Link href={'/dashboard'} className={'flex items-center pl-3 mb-14'}>
                    <div className={'relative w-8 h-8 mr-4'}>
                        <div className={cn('text-2xl text-indigo-300 font-bold', montserrat)}>LOGO</div>
                    </div>
                </Link>
                <div className={'space-y-1'}>
                    {routes.map(route => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={'text-sm flex group p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded transition'}
                        >
                            <div className={'flex items-center flex-1'}>
                                <route.icon className={cn('h-5 w-5 mr-3', route.color)}/>
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar