'use client';

import Image from "next/image";
import Link from "next/link";
import cslx from 'clsx';

const links = [
    {name: "ABOUT", href: "/about"},
    {name: "SERVICES", href: "/services"},
    {name: "PRICING", href: "/pricing"},
    {name: "FAQ", href: "/faq"},
    {name: "FREE INTRO", href: "/mentors"},
    {name: "CONTACT", href: "/contact"},
]

export default function Header() {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 px-6">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                {/*Logo*/}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={30}
                        height={30}
                        className="mr-3 transition-transform duration-500 hover:rotate-180"
                    />
                    <div className="flex flex-col leading-tight">
                         <h1 className="block text-2xl font-bold tracking-tighter bg-gradient-to-r from-indigo-100 via-indigo-500 to-indigo-950 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
                             Puerta Abierta </h1>
                        {/* <span className="block">unlocking futures one door at a time</span> */}
                    </div>
                    
                </Link>

                {/*Navbar*/}
                <ul className="flex space-x-8 items-center">
                    {links.map((link) => {
                        //const LinkIcon = link.icon;
                        return (
                        <li key={link.name}>
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cslx(
                                    "block text-[15px]  rounded-full",
                                    link.name === "CONTACT"
                                        ? "font-bold p-4 bg-indigo-300 hover:bg-indigo-400 md:dark:hover:bg-indigo-400 transition-colors duration-400"
                                        : " md:p-0 py-3 px-3 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                )}
                            >
                                {link.name}
                            </Link>
                        </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}