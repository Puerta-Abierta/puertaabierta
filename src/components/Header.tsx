'use client';

import Image from "next/image";
import Link from "next/link";
import cslx from 'clsx';

const links = [
    {name: "About", href: "/about"},
    {name: "Services", href: "/services"},
    {name: "Pricing", href: "/pricing"},
    {name: "Contact", href: "/contact"},
    {name: "Mentors", href: "/mentors"},
    {name: "FAQ", href: "/faq"},
]

export default function Header() {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 px-6">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                {/*Logo*/}
                <a href="/" className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={30}
                        height={30}
                        className="mr-3"
                    />
                    <div className="flex flex-col leading-tight">
                        <span className="block text-xl font-bold dark:text-white">Puerta Abierta</span>
                        {/* <span className="block">unlocking futures one door at a time</span> */}
                    </div>
                    
                </a>

                {/*Navbar*/}
                <ul className="font-medium flex space-x-8 items-center">
                    {links.map((link) => {
                        //const LinkIcon = link.icon;
                        return (
                        <li key={link.name}>
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block py-3 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >{link.name}
                            </Link>
                        </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}