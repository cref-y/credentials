"use client"

import { usePathname } from 'next/navigation'
import { getPageTitle } from '@/utils/helpers'
import { FiMoon, FiSun, FiBell, FiChevronDown, FiUser, FiLogOut, FiBriefcase } from 'react-icons/fi'

export default function Header() {
    const pathname = usePathname()
    const title = getPageTitle(pathname)

    return (
        <header className="flex justify-between items-center px-6 border-b dark:border-gray-700 border-gray-200">
            <h1 className="text-2xl font-bold dark:text-white text-gray-800">{title}</h1>

            <div className="flex items-center space-x-4">
                {/* Theme Toggle */}
                <button
                    id="theme-toggle"
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Toggle theme"
                >
                    <FiMoon className="dark:hidden text-gray-600" />
                    <FiSun className="hidden dark:block text-yellow-400" />
                </button>

                {/* Notifications */}
                <button
                    id="notification-btn"
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
                    aria-label="Notifications"
                >
                    <FiBell className="text-gray-600 dark:text-gray-300" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Profile Dropdown */}
                <div className="relative group">
                    <button
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="User menu"
                    >
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                            <FiUser className="w-4 h-4" />
                        </div>
                        <span className="hidden md:inline-block text-sm font-medium dark:text-white text-gray-800">
                            Metropolitan University
                        </span>
                        <FiChevronDown className="text-xs text-gray-500" />
                    </button>

                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 hidden group-hover:block z-10">
                        <ul className="py-1">
                            <li>
                                <a href="#" className="flex items-center px-4 py-2 text-sm dark:text-gray-200 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <FiUser className="mr-3 w-4 h-4" />
                                    Profile
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center px-4 py-2 text-sm dark:text-gray-200 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <FiBriefcase className="mr-3 w-4 h-4" />
                                    Organization
                                </a>
                            </li>
                            <li className="border-t dark:border-gray-700">
                                <a href="#" className="flex items-center px-4 py-2 text-sm dark:text-gray-200 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <FiLogOut className="mr-3 w-4 h-4" />
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}