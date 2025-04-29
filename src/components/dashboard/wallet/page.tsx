import { useState } from 'react';

const WalletPage = () => {
    const [walletAddress, setWalletAddress] = useState('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');
    const [balance, setBalance] = useState('ℏ 1,245.32');
    const [network, setNetwork] = useState('Hedera Testnet');
    const [gasPrice, setGasPrice] = useState('Low (ℏ 0.0001)');
    const [transactions, setTransactions] = useState([
        { type: 'Received', amount: 'ℏ 50.00', date: '22 Oct 2023', icon: 'down', color: 'green' },
        { type: 'Certificate Mint', amount: 'ℏ 1.25', date: '20 Oct 2023', icon: 'up', color: 'red' },
        { type: 'Verification Fee', amount: 'ℏ 0.50', date: '18 Oct 2023', icon: 'certificate', color: 'blue' }
    ]);
    const [authorizedWallets, setAuthorizedWallets] = useState([
        { name: 'Admin Wallet', address: '0x3a4e7fD5...7a23', role: 'Admin' },
        { name: 'Verifier', address: '0x8b6f4a2c...5e12', role: 'Verifier' }
    ]);
    const [securitySettings, setSecuritySettings] = useState([
        { name: 'Two-Factor Authentication', description: 'Add an extra layer of security', enabled: false },
        { name: 'Transaction Notifications', description: 'Get notified for all transactions', enabled: true },
        { name: 'Auto-lock Wallet', description: 'Automatically lock after 15 minutes', enabled: true }
    ]);

    const copyAddress = () => {
        navigator.clipboard.writeText(walletAddress);
    };

    const toggleSecuritySetting = (index) => {
        const newSettings = [...securitySettings];
        newSettings[index].enabled = !newSettings[index].enabled;
        setSecuritySettings(newSettings);
    };

    const revokeWallet = (index) => {
        const newWallets = [...authorizedWallets];
        newWallets.splice(index, 1);
        setAuthorizedWallets(newWallets);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Wallet</h1>

            {/* Connected Wallet Section */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Connected Wallet</h2>

                <div className="bg-gray-100 p-4 rounded-xl mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white mr-4">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2H4z" />
                                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-medium">Hedera Wallet</h3>
                                <div className="flex items-center text-gray-600 text-sm">
                                    <span>0x71C7656EC7ab88b098defB751B7401B5f6d8976F</span>
                                    <button onClick={copyAddress} className="ml-2 text-blue-600">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm">
                                Disconnect
                            </button>
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">
                                Switch Wallet
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Balance Card */}
                    <div className="bg-indigo-600 rounded-xl p-6 text-white">
                        <div className="flex flex-col">
                            <span className="text-sm opacity-80 mb-1">Balance</span>
                            <span className="text-3xl font-bold mb-2">ℏ 1,245.32</span>
                        </div>

                        <div className="absolute top-6 right-6 bg-white bg-opacity-20 p-2 rounded-lg">
                            <span className="text-sm">hips</span>
                        </div>

                        <p className="text-sm opacity-80 mb-4">Hedera Testnet</p>

                        <div className="flex space-x-3 mt-auto">
                            <button className="px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg flex items-center text-sm">
                                <span className="mr-1">+</span> Add Funds
                            </button>
                            <button className="px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg flex items-center text-sm">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                                Transfer
                            </button>
                        </div>
                    </div>

                    {/* Network Status Card */}
                    <div className="bg-gray-100 rounded-xl p-6">
                        <h3 className="font-medium mb-4">Network Status</h3>

                        <div className="flex items-center mb-4">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm">Connected to Hedera Testnet</span>
                        </div>

                        <div className="text-gray-600 mb-6">
                            <p className="mb-2 text-sm">Network ID: <span className="text-gray-800">testnet</span></p>
                            <p className="text-sm">Gas Price: <span className="text-gray-800">Low (ℏ 0.0001)</span></p>
                        </div>

                        <button className="w-full px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors text-sm">
                            Change Network
                        </button>
                    </div>

                    {/* Recent Transactions Card */}
                    <div className="bg-gray-100 rounded-xl p-6">
                        <h3 className="font-medium mb-4">Recent Transactions</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </div>
                                    <span className="text-sm">Received</span>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-sm">ℏ 50.00</p>
                                    <p className="text-xs text-gray-500">22 Oct 2023</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                        </svg>
                                    </div>
                                    <span className="text-sm">Certificate Mint</span>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-sm">ℏ 1.25</p>
                                    <p className="text-xs text-gray-500">20 Oct 2023</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm">Verification Fee</span>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-sm">ℏ 0.50</p>
                                    <p className="text-xs text-gray-500">18 Oct 2023</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wallet Management Section */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Wallet Management</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Authorized Wallets */}
                    <div className="bg-gray-100 rounded-xl p-6">
                        <h3 className="font-medium mb-4">Authorized Wallets</h3>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between bg-white bg-opacity-50 p-3 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white mr-3">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Admin Wallet</p>
                                        <p className="text-xs text-gray-500">0x3a4e7fD5...7a23</p>
                                    </div>
                                </div>
                                <button className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg">
                                    Revoke
                                </button>
                            </div>

                            <div className="flex items-center justify-between bg-white bg-opacity-50 p-3 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white mr-3">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Verifier</p>
                                        <p className="text-xs text-gray-500">0x8b6f4a2c...5e12</p>
                                    </div>
                                </div>
                                <button className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg">
                                    Revoke
                                </button>
                            </div>
                        </div>

                        <button className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg text-sm">
                            Add New Authorized Wallet
                        </button>
                    </div>

                    {/* Security Settings */}
                    <div className="bg-gray-100 rounded-xl p-6">
                        <h3 className="font-medium mb-4">Security Settings</h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Two-Factor Authentication</p>
                                    <p className="text-xs text-gray-500">Add an extra layer of security</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={securitySettings[0].enabled}
                                        onChange={() => toggleSecuritySetting(0)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-300 peer-checked:bg-indigo-600 rounded-full peer after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Transaction Notifications</p>
                                    <p className="text-xs text-gray-500">Get notified for all transactions</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={securitySettings[1].enabled}
                                        onChange={() => toggleSecuritySetting(1)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-300 peer-checked:bg-indigo-600 rounded-full peer after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Auto-lock Wallet</p>
                                    <p className="text-xs text-gray-500">Automatically lock after 15 minutes</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={securitySettings[2].enabled}
                                        onChange={() => toggleSecuritySetting(2)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-300 peer-checked:bg-indigo-600 rounded-full peer after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                                </label>
                            </div>
                        </div>

                        <button className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg text-sm">
                            Manage Security Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletPage;