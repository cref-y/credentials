import Link from 'next/link'

export default function RecentCertificates() {
    return (
        <>
            <h3 className="text-lg font-semibold mb-6">Recent Certificates</h3>

            <div className="space-y-4">
                <div className="flex items-center p-3 rounded-lg dark:bg-dark-lighter bg-gray-100">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                        <i className="fas fa-certificate text-blue-500"></i>
                    </div>
                    <div className="flex-1">
                        <h4 className="font-medium">Bachelor of Computer Science</h4>
                        <p className="text-sm dark:text-gray-400 text-gray-500">Issued to: John Smith</p>
                    </div>
                    <div className="text-xs text-right dark:text-gray-400 text-gray-500">
                        <div>2 days ago</div>
                        <div className="text-green-500">Verified</div>
                    </div>
                </div>

                <div className="flex items-center p-3 rounded-lg dark:bg-dark-lighter bg-gray-100">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mr-4">
                        <i className="fas fa-certificate text-purple-500"></i>
                    </div>
                    <div className="flex-1">
                        <h4 className="font-medium">Master of Business Administration</h4>
                        <p className="text-sm dark:text-gray-400 text-gray-500">Issued to: Sarah Johnson</p>
                    </div>
                    <div className="text-xs text-right dark:text-gray-400 text-gray-500">
                        <div>3 days ago</div>
                        <div className="text-yellow-500">Pending</div>
                    </div>
                </div>

                <div className="flex items-center p-3 rounded-lg dark:bg-dark-lighter bg-gray-100">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                        <i className="fas fa-certificate text-green-500"></i>
                    </div>
                    <div className="flex-1">
                        <h4 className="font-medium">Blockchain Development</h4>
                        <p className="text-sm dark:text-gray-400 text-gray-500">Issued to: Alex Chen</p>
                    </div>
                    <div className="text-xs text-right dark:text-gray-400 text-gray-500">
                        <div>5 days ago</div>
                        <div className="text-green-500">Verified</div>
                    </div>
                </div>

                <Link href="/collection" className="block text-center text-primary hover:underline">View All Certificates</Link>
            </div>
        </>
    )
}