import { usePathname } from 'next/navigation'
import { getPageTitle } from '@/utils/helpers'

export default function Header() {
    const pathname = usePathname()
    const title = getPageTitle(pathname)

    return (
        <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{title}</h1>

            <div className="flex items-center space-x-4">
                <button id="theme-toggle" className="p-2 rounded-full dark:bg-dark-lighter bg-gray-200 dark:text-white text-gray-800">
                    <i className="fas fa-moon dark:hidden"></i>
                    <i className="fas fa-sun hidden dark:block"></i>
                </button>

                <button id="notification-btn" className="p-2 rounded-full dark:bg-dark-lighter bg-gray-200 dark:text-white text-gray-800 relative">
                    <i className="fas fa-bell"></i>
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="relative group">
                    <button className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                            <i className="fas fa-university"></i>
                        </div>
                        <span className="hidden md:inline-block">Metropolitan University</span>
                        <i className="fas fa-chevron-down text-xs"></i>
                    </button>

                    <div className="absolute right-0 mt-2 w-48 dark:bg-dark-lighter bg-white rounded-lg shadow-lg hidden group-hover:block z-10">
                        <ul className="py-2">
                            <li>
                                <a href="#" className="block px-4 py-2 dark:hover:bg-dark-DEFAULT hover:bg-gray-100">Profile</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 dark:hover:bg-dark-DEFAULT hover:bg-gray-100">Organization</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 dark:hover:bg-dark-DEFAULT hover:bg-gray-100">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}