'use client';

import Image from "next/image";
import Link from "next/link";
import cslx from 'clsx';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import CoursesDropdown from "./CoursesDropdown";
import { Course } from '@/sanity/lib/courseTypes';

const links = [
    {name: "PRICING", href: "/pricing", tooltip: "View our transparent pricing plans"},
    {name: "FAQ", href: "/faq", tooltip: "Find answers to common questions"},
    {name: "FREE INTRO", href: "/mentors", tooltip: "Book a free introductory session"},
    {name: "CONTACT", href: "/contact", tooltip: "Get in touch with our team"},
]

interface HeaderProps {
  courses: Course[]
}

export default function Header({ courses }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="absolute top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 dark:bg-gray-900/80 px-4 sm:px-6">
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
                         <h1 className="block text-xl sm:text-2xl font-bold tracking-tighter bg-gradient-to-r from-indigo-100 via-indigo-500 to-indigo-950 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
                             Puerta Abierta </h1>
                        {/* <span className="block">unlocking futures one door at a time</span> */}
                    </div>
                    
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex space-x-8 items-center">
                    {/* About Link */}
                    <li>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/about"
                                    className="block text-[15px] rounded-full py-3 px-3 hover:bg-gray-100 hover:bg-transparent border-0 hover:text-blue-700 dark:text-white dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:bg-transparent"
                                >
                                    ABOUT
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Learn more about our mission and values</p>
                            </TooltipContent>
                        </Tooltip>
                    </li>
                    
                    {/* Courses Dropdown */}
                    <li>
                        <CoursesDropdown courses={courses} />
                    </li>
                    
                    {/* Other Links */}
                    {links.map((link) => {
                        return (
                        <li key={link.name}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={link.href}
                                        className={cslx(
                                            "block text-[15px] rounded-full",
                                            link.name === "CONTACT"
                                                ? "font-bold px-4 py-2 bg-indigo-700 text-white rounded-full hover:bg-indigo-800 transition-colors duration-400"
                                                : "py-3 px-3 hover:bg-gray-100 hover:bg-transparent border-0 hover:text-blue-700 dark:text-white dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:bg-transparent"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{link.tooltip}</p>
                                </TooltipContent>
                            </Tooltip>
                        </li>
                        );
                    })}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50 dark:bg-gray-900/95 mb-4">
                    <div className="px-6 py-4 space-y-2 pb-8">
                        <Link
                            href="/about"
                            className="block px-4 py-4 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            ABOUT
                        </Link>
                        
                        <Link
                            href="/courses"
                            className="block px-4 py-4 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            COURSES
                        </Link>
                        
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cslx(
                                    "block px-4 py-4 text-base font-medium rounded-md",
                                    link.name === "CONTACT"
                                        ? "bg-indigo-700 text-white hover:bg-indigo-800"
                                        : "text-gray-700 hover:text-blue-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}