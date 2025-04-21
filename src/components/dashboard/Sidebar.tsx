import Link from 'next/link'
import { NAV_ITEMS } from '@/utils/constants'
import { useState, useEffect } from 'react'
import { FiHome, FiWallet, FiPlusCircle, FiLayers, FiShield, FiSettings, FiUser, FiMenu, FiX, FiChevronDown, FiChevronUp, FiCopy } from 'react-icons/fi'
import { HiOutlineAcademicCap, HiOutlineBadgeCheck, HiOutlineCollection } from 'react-icons/hi'
import { RiNftLine } from 'react-icons/ri'
import { useAppContext } from '@/context/appContext'
import { useRouter } from 'next/router'

const iconComponents = {
    'chart-pie': FiHome,
    'wallet': FiWallet,
    'plus-circle': FiPlusCircle,
    'layer-group': FiLayers,
    'user-shield': FiShield,
    'cog': FiSettings,
    'certificate': HiOutlineAcademicCap,
    'award': HiOutlineBadgeCheck,
    'collection': HiOutlineCollection,
    'nft': RiNftLine
}

export default function Sidebar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isWalletExpanded, setIsWalletExpanded] = useState(false)
    const { activeTab, setActiveTab } = useAppContext()
    const router = useRouter()

    // Sync active path with router on initial load
    useEffect(() => {
        const path = window.location.pathname
        // Map pathname to tab ID if needed
        const tabMapping = {
            '/': 'dashboard',
            '/create-certificate': 'create_certificate',
            '/identity-admin': 'identity_admin',
            '/wallet': 'wallet_account',
            '/nftmarket': 'nftmarket'
        }

        if (tabMapping[path]) {
            setActiveTab(tabMapping[path])
        }
    }, [setActiveTab])

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const toggleWalletDetails = () => {
        setIsWalletExpanded(!isWalletExpanded)
    }

    // Helper to map nav items to activeTab values
    const getTabIdFromPath = (path) => {
        const tabMapping = {
            '/': 'dashboard',
            '/create-certificate': 'create_certificate',
            '/identity-admin': 'identity_admin',
            '/wallet': 'wallet_account',
            '/nftmarket': 'nftmarket'
        }
        return tabMapping[path] || 'dashboard'
    }

    // Helper to map tab IDs to paths
    const getPathFromTabId = (tabId) => {
        const pathMapping = {
            'dashboard': '/',
            'create_certificate': '/create-certificate',
            'identity_admin': '/identity-admin',
            'wallet_account': '/wallet',
            'nftmarket': '/nftmarket'
        }
        return pathMapping[tabId] || '/'
    }

    const handleNavItemClick = (tabId) => {
        setActiveTab(tabId)

        // Navigate to the corresponding path
        const path = getPathFromTabId(tabId)
        router.push(path)

        // Close mobile menu when clicking on a nav item
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false)
        }
    }

    return (
        <aside className="lg:w-62 w-full dark:bg-dark-lighter bg-gray-50 lg:min-h-screen border-r dark:border-gray-700 border-gray-200">
            {/* Logo and Mobile Menu Button */}
            <div className="p-4 flex justify-between items-center lg:justify-start border-b dark:border-gray-700 border-gray-200">
                <div
                    onClick={() => handleNavItemClick('dashboard')}
                    className="flex items-center space-x-3 group cursor-pointer"
                >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                        <HiOutlineAcademicCap className="text-white text-xl" />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                        Crefy
                    </span>
                </div>
                <button
                    onClick={toggleMobileMenu}
                    className="lg:hidden p-2 rounded-lg dark:hover:bg-gray-700 hover:bg-gray-200 transition-colors"
                >
                    {isMobileMenuOpen ? (
                        <FiX className="text-xl dark:text-gray-300 text-gray-600" />
                    ) : (
                        <FiMenu className="text-xl dark:text-gray-300 text-gray-600" />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <nav className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
                <div className="p-4">
                    <ul className="space-y-1">
                        {NAV_ITEMS.map((item) => {
                            const IconComponent = iconComponents[item.icon] || FiHome
                            const tabId = getTabIdFromPath(item.path)

                            return (
                                <li key={item.path}>
                                    <div
                                        onClick={() => handleNavItemClick(tabId)}
                                        className={`flex items-center space-x-3 p-3 rounded-lg transition-all cursor-pointer ${activeTab === tabId
                                            ? 'bg-primary text-primary dark:text-white border-l-4 border-primary'
                                            : 'dark:text-gray-300 text-gray-700 hover:bg-primary/5 hover:text-primary dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <IconComponent className="w-5 h-5 flex-shrink-0" />
                                        <span className="font-medium">{item.label}</span>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                {/* Wallet Section */}
                <div className="p-4 border-t dark:border-gray-700 border-gray-200">
                    <div
                        onClick={toggleWalletDetails}
                        className="flex items-center justify-between p-3 rounded-lg dark:bg-dark-card bg-white shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center mr-3 shadow">
                                <FiUser className="text-white text-sm" />
                            </div>
                            <div>
                                <div className="text-sm font-medium">Connected Wallet</div>
                                <div className="text-xs dark:text-gray-400 text-gray-500">Hedera Testnet</div>
                            </div>
                        </div>
                        {isWalletExpanded ? (
                            <FiChevronUp className="text-gray-500" />
                        ) : (
                            <FiChevronDown className="text-gray-500" />
                        )}
                    </div>

                    {/* Expanded Wallet Details */}
                    {isWalletExpanded && (
                        <div className="mt-2 p-3 rounded-lg dark:bg-dark-card bg-white shadow-sm space-y-2 animate-fadeIn">
                            <div className="flex justify-between items-center text-sm">
                                <span className="dark:text-gray-400 text-gray-500">Address:</span>
                                <div className="flex items-center">
                                    <span className="font-mono">0x71C...a3F9</span>
                                    <button className="ml-2 text-primary hover:text-primary-dark">
                                        <FiCopy className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="dark:text-gray-400 text-gray-500">Balance:</span>
                                <span className="font-medium">ℏ 1,245.32</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="dark:text-gray-400 text-gray-500">Network:</span>
                                <span className="font-medium">Testnet</span>
                            </div>
                            <div className="pt-2 mt-2 border-t dark:border-gray-700 border-gray-200">
                                <button
                                    className="w-full py-2 px-3 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-sm font-medium transition-colors"
                                    onClick={() => handleNavItemClick('wallet_account')}
                                >
                                    Manage Wallet
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="p-4 border-t dark:border-gray-700 border-gray-200">
                    <h3 className="text-xs uppercase font-semibold dark:text-gray-400 text-gray-500 mb-2 tracking-wider">
                        Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            className="p-2 rounded-lg dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 flex flex-col items-center transition-colors"
                            onClick={() => handleNavItemClick('create_certificate')}
                        >
                            <FiPlusCircle className="w-5 h-5 text-primary mb-1" />
                            <span className="text-xs">New Certificate</span>
                        </button>
                        <button
                            className="p-2 rounded-lg dark:bg-gray-800 bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 flex flex-col items-center transition-colors"
                            onClick={() => handleNavItemClick('nftmarket')}
                        >
                            <RiNftLine className="w-5 h-5 text-purple-500 mb-1" />
                            <span className="text-xs">View NFTs</span>
                        </button>
                    </div>
                </div>
            </nav>
        </aside>
    )
}