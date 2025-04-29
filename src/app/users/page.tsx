"use client";

import { useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { Abi as NFT_ABI, contractAddress as NFT_CONTRACT_ADDRESS } from '@/config/abi';
import { Scanner } from '@yudiel/react-qr-scanner';
import { toast } from 'react-hot-toast';

type NFT = {
    id: string;
    name: string;
    image: string;
    issuer: string;
    date: string;
    metadata: string;
};

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'scanner' | 'nfts'>('dashboard');
    const [showScanner, setShowScanner] = useState(false);
    const { address } = useAccount();

    // Fetch user's NFTs
    const { data: nfts = [], isLoading: loadingNFTs } = useContractRead({
        address: NFT_CONTRACT_ADDRESS,
        abi: NFT_ABI,
        functionName: 'getCertificatesByOwner',
        args: [address],
        enabled: !!address,
    });

    const handleScanSuccess = (result: string) => {
        toast.success(`Scanned: ${result}`);
        // Here you would handle the NFT claim logic
        setShowScanner(false);
        setActiveTab('nfts'); // Switch to NFTs tab after scan
    };

    return (
        <div className="flex h-screen bg-gray-50 text-gray-800">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-blue-600">CertifyChain</h1>
                    <p className="text-xs text-gray-500">NFT Certificates</p>
                </div>

                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                            >
                                <i className="fas fa-tachometer-alt mr-3"></i>
                                Dashboard
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => { setActiveTab('scanner'); setShowScanner(true); }}
                                className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'scanner' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                            >
                                <i className="fas fa-qrcode mr-3"></i>
                                QR Scanner
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab('nfts')}
                                className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'nfts' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                            >
                                <i className="fas fa-certificate mr-3"></i>
                                My Certificates
                                {nfts.length > 0 && (
                                    <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                                        {nfts.length}
                                    </span>
                                )}
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="flex items-center justify-between px-6 py-4">
                        <h2 className="text-lg font-semibold capitalize">
                            {activeTab === 'dashboard' && 'Dashboard'}
                            {activeTab === 'scanner' && 'QR Code Scanner'}
                            {activeTab === 'nfts' && 'My Certificates'}
                        </h2>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-full hover:bg-gray-100">
                                <i className="fas fa-bell"></i>
                            </button>
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                                    {address?.slice(2, 4).toUpperCase()}
                                </div>
                                <span className="ml-2 text-sm font-medium hidden md:inline">
                                    {address?.slice(0, 6)}...{address?.slice(-4)}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {/* Dashboard Tab */}
                    {activeTab === 'dashboard' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="font-medium mb-4">Quick Actions</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => { setActiveTab('scanner'); setShowScanner(true); }}
                                        className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
                                    >
                                        <div className="text-blue-500 text-2xl mb-2">
                                            <i className="fas fa-qrcode"></i>
                                        </div>
                                        <span className="font-medium">Scan QR Code</span>
                                    </button>
                                    <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center">
                                        <div className="text-blue-500 text-2xl mb-2">
                                            <i className="fas fa-certificate"></i>
                                        </div>
                                        <span className="font-medium">View Certificates</span>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="font-medium mb-4">Recent Activity</h3>
                                <div className="space-y-4">
                                    {nfts.slice(0, 3).map((nft, index) => (
                                        <div key={index} className="flex items-center p-3 border border-gray-100 rounded-lg">
                                            <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                                                <i className="fas fa-certificate"></i>
                                            </div>
                                            <div>
                                                <p className="font-medium">{nft.name}</p>
                                                <p className="text-xs text-gray-500">Issued on {nft.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {nfts.length === 0 && (
                                        <p className="text-gray-500 text-center py-4">No recent activity</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* QR Scanner Tab */}
                    {activeTab === 'scanner' && (
                        <div className="max-w-md mx-auto">
                            {showScanner ? (
                                <div className="bg-black rounded-xl overflow-hidden mb-6 relative">
                                    <Scanner
                                        onDecode={handleScanSuccess}
                                        onError={(error) => toast.error(error.message)}
                                        constraints={{ facingMode: 'environment' }}
                                        containerStyle={{ width: '100%', height: '100%' }}
                                        videoStyle={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />

                                    {/* Scanner frame overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="border-4 border-white rounded-lg w-64 h-64 relative">
                                            <div className="absolute -top-1 -left-1 w-8 h-8 border-l-4 border-t-4 border-white"></div>
                                            <div className="absolute -top-1 -right-1 w-8 h-8 border-r-4 border-t-4 border-white"></div>
                                            <div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-4 border-b-4 border-white"></div>
                                            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-4 border-b-4 border-white"></div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                                    <div className="text-blue-500 text-5xl mb-4">
                                        <i className="fas fa-qrcode"></i>
                                    </div>
                                    <h3 className="text-xl font-medium mb-2">QR Code Scanner</h3>
                                    <p className="text-gray-600 mb-6">
                                        Click the button below to activate your camera and scan a certificate QR code
                                    </p>
                                    <button
                                        onClick={() => setShowScanner(true)}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <i className="fas fa-camera mr-2"></i> Activate Scanner
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* NFTs Tab */}
                    {activeTab === 'nfts' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">
                                    My Certificate NFTs ({nfts.length})
                                </h3>
                                <button
                                    onClick={() => { setActiveTab('scanner'); setShowScanner(true); }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                                >
                                    <i className="fas fa-qrcode mr-2"></i> Scan New
                                </button>
                            </div>

                            {loadingNFTs ? (
                                <div className="flex justify-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                                </div>
                            ) : nfts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {nfts.map((nft) => (
                                        <div key={nft.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                                            <div className="h-48 bg-blue-50 flex items-center justify-center">
                                                {nft.image ? (
                                                    <img src={nft.image} alt={nft.name} className="h-full w-full object-contain" />
                                                ) : (
                                                    <i className="fas fa-certificate text-5xl text-blue-200"></i>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-medium mb-1">{nft.name}</h4>
                                                <p className="text-sm text-gray-500 mb-3">Issued by: {nft.issuer}</p>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-400">{nft.date}</span>
                                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                                    <div className="text-gray-300 text-5xl mb-4">
                                        <i className="fas fa-certificate"></i>
                                    </div>
                                    <h3 className="text-lg font-medium mb-2">No Certificates Found</h3>
                                    <p className="text-gray-600 mb-6">
                                        You haven't collected any certificate NFTs yet. Scan a QR code to claim your first certificate.
                                    </p>
                                    <button
                                        onClick={() => { setActiveTab('scanner'); setShowScanner(true); }}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <i className="fas fa-qrcode mr-2"></i> Scan QR Code
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;