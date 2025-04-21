export default function DashboardCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Certificates Issued Card */}
            <div className="dashboard-card p-6 rounded-2xl dark:bg-dark-card bg-white shadow-lg">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-sm font-medium dark:text-gray-300 text-gray-500">Certificates Issued</h3>
                        <p className="text-3xl font-bold">853</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                        <i className="fas fa-certificate"></i>
                    </div>
                </div>
                <div className="flex items-center text-green-500 text-sm">
                    <i className="fas fa-arrow-up mr-1"></i>
                    <span>12% increase</span>
                    <span className="dark:text-gray-400 text-gray-500 ml-1">from last month</span>
                </div>
            </div>

            {/* Students Card */}
            <div className="dashboard-card p-6 rounded-2xl dark:bg-dark-card bg-white shadow-lg">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-sm font-medium dark:text-gray-300 text-gray-500">Students</h3>
                        <p className="text-3xl font-bold">1,248</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                        <i className="fas fa-user-graduate"></i>
                    </div>
                </div>
                <div className="flex items-center text-green-500 text-sm">
                    <i className="fas fa-arrow-up mr-1"></i>
                    <span>7% increase</span>
                    <span className="dark:text-gray-400 text-gray-500 ml-1">from last month</span>
                </div>
            </div>

            {/* Verification Requests Card */}
            <div className="dashboard-card p-6 rounded-2xl dark:bg-dark-card bg-white shadow-lg">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-sm font-medium dark:text-gray-300 text-gray-500">Verification Requests</h3>
                        <p className="text-3xl font-bold">38</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                        <i className="fas fa-shield-alt"></i>
                    </div>
                </div>
                <div className="flex items-center text-yellow-500 text-sm">
                    <i className="fas fa-arrow-down mr-1"></i>
                    <span>3% decrease</span>
                    <span className="dark:text-gray-400 text-gray-500 ml-1">from last month</span>
                </div>
            </div>
        </div>
    )
}