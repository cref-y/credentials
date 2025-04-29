"use client"

import { useState } from 'react'
import {
    FiHome, FiWallet, FiPlusCircle, FiLayers, FiShield,
    FiSettings, FiUser, FiMenu, FiX, FiChevronDown,
    FiChevronUp, FiCopy
} from 'react-icons/fi'
import {
    HiOutlineAcademicCap, HiOutlineBadgeCheck, HiOutlineCollection
} from 'react-icons/hi'
import { RiNftLine } from 'react-icons/ri'
import { useAppContext } from '@/context/appContext'

type NavItem = {
    id: string
    label: string
    icon: keyof typeof iconComponents
}

const NAV_ITEMS: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'chart-pie' },
    { id: 'wallet_account', label: 'Wallet', icon: 'wallet' },
    { id: 'create_certificate', label: 'Create Certificate', icon: 'plus-circle' },
    { id: 'identity_admin', label: 'Identity Admin', icon: 'user-shield' },
    { id: 'settings', label: 'Settings', icon: 'cog' }
]

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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const toggleWalletDetails = () => {
        setIsWalletExpanded(!isWalletExpanded)
    }

    const handleNavItemClick = (tabId: string) => {
        setActiveTab(tabId)
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false)
        }
    }

    return (
        <aside className="lg:w-62 w-full bg-white lg:min-h-screen border-r border-gray-200">
            {/* Logo and Mobile Menu Button */}
            <div className="p-4 flex justify-between items-center lg:justify-start border-b border-gray-200">
                <div
                    onClick={() => handleNavItemClick('dashboard')}
                    className="flex items-center space-x-3 group cursor-pointer"
                >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                        <HiOutlineAcademicCap className="text-white text-xl" />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-green-800 to-indigo-600 bg-clip-text text-transparent">
                        Crefy
                    </span>
                </div>
                <button
                    onClick={toggleMobileMenu}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    {isMobileMenuOpen ? (
                        <FiX className="text-xl text-gray-600" />
                    ) : (
                        <FiMenu className="text-xl text-gray-600" />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <nav className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
                <div className="p-4">
                    <ul className="space-y-1">
                        {NAV_ITEMS.map((item) => {
                            const IconComponent = iconComponents[item.icon]
                            return (
                                <li key={item.id}>
                                    <div
                                        onClick={() => handleNavItemClick(item.id)}
                                        className={`flex items-center space-x-3 p-3 rounded-lg transition-all cursor-pointer ${activeTab === item.id
                                            ? 'bg-primary/10 text-primary border-l-4 border-primary'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                                            }`}
                                    >
                                        {/* icons */}
                                        <FiHome />
                                        <span className="font-medium">{item.label}</span>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                {/* Wallet Section */}
                <div className="p-4 border-t border-gray-200">
                    <div
                        onClick={toggleWalletDetails}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 shadow-sm cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center mr-3 shadow">
                                <FiUser className="text-sm" />
                            </div>
                            <div>
                                <div className="text-sm font-medium">Connected Wallet</div>
                                <div className="border border-gray-300 rounded-full bg-gray-300">
                                    <appkit-network-button />
                                </div>
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
                        <div className="mt-2 p-3 rounded-lg bg-gray-50 shadow-sm space-y-2 animate-fadeIn">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Address:</span>
                                <div className="flex items-center">
                                    <span className="font-mono">0x71C...a3F9</span>
                                    <button className="ml-2 text-primary hover:text-primary-dark">
                                        <FiCopy className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Balance:</span>
                                <span className="font-medium">ℏ 1,245.32</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Network:</span>
                                <span className="font-medium">Testnet</span>
                            </div>
                            <div className="pt-2 mt-2 border-t border-gray-200">
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
                <div className="p-4 border-t border-gray-200">
                    <h3 className="text-xs uppercase font-semibold text-gray-500 mb-2 tracking-wider">
                        Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 flex flex-col items-center transition-colors"
                            onClick={() => handleNavItemClick('create_certificate')}
                        >
                            <FiPlusCircle className="w-5 h-5 text-primary mb-1" />
                            <span className="text-xs">New Certificate</span>
                        </button>
                        <button
                            className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 flex flex-col items-center transition-colors"
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