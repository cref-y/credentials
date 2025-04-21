"use client"
import { AppProvider, useAppContext } from "@/context/appContext"
import Dashboard from "@/components/dashboard/page";
import WalletPage from "@/components/dashboard/wallet/page";
import CreateCertificatePage from "@/components/dashboard/create-certificate/page";

import IdentityAdmin from "@/components/institutions/admins/page";
import KycVerification from "@/components/students/kyc_verification/page"
import NFTMarketplace from "@/components/students/nftmarket/page"
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import ConnectTemplate from "@/components/ui/ConnectTemplate";
import CreateCertificate from "@/components/institutions/create-certificate/page";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

function DashboardContent() {
    const { activeTab } = useAppContext();
    const { isConnected } = useAppKitAccount();

    if (!isConnected) {
        return <ConnectTemplate />;
    }

    switch (activeTab) {
        case "dashboard":
            return <CreateCertificatePage />;
        case "create_certificate":
            return <CreateCertificatePage />;
        case "identity_admin":
            return <IdentityAdmin />;
        case "wallet_account":
            return <WalletPage />;
        case "nftmarket":
            return <NFTMarketplace />;
        case "disconnect":
            return <Dashboard />;
        default:
            return <Dashboard />;
    }
}

export default function Page() {
    return (
        <AppProvider>
            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Sidebar with fixed height and overflow control */}
                <div className="lg:w-72 w-full lg:h-screen lg:sticky lg:top-0 lg:overflow-y-auto">
                    <Sidebar />
                </div>

                {/* Main content area with independent scrolling */}
                <main className="flex-1 p-6 overflow-auto">
                    <Header />
                    <DashboardContent />
                </main>
            </div>
        </AppProvider>
    );
}