import DashboardCards from './components/DashboardCards'
import CertificateChart from './components/CertificateChart'
import VerificationProgress from './components/VerificationProgress'
import ActivityCalendar from './components/ActivityCalendar'
import RecentCertificates from './components/RecentCertificates'

export default function Dashboard() {
    return (
        <div className="page-transition">
            <DashboardCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 rounded-2xl dark:bg-dark-card bg-white shadow-lg">
                    <CertificateChart />
                </div>
                <div className="p-6 rounded-2xl dark:bg-dark-card bg-white shadow-lg">
                    <VerificationProgress />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="p-6 rounded-2xl dark:bg-dark-card bg-white shadow-lg">
                    <ActivityCalendar />
                </div>
                <div className="p-6 rounded-2xl dark:bg-dark-card bg-white shadow-lg">
                    <RecentCertificates />
                </div>
            </div>
        </div>
    )
}