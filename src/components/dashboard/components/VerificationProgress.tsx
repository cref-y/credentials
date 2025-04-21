export default function VerificationProgress() {
    return (
        <>
            <h3 className="text-lg font-semibold mb-6">Verification Progress</h3>

            <div className="flex flex-col items-center mb-6">
                <div className="relative w-48 h-48">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Background circle */}
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#2D3748" strokeWidth="8" opacity="0.2" />
                        {/* Progress circle */}
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#5D5CDE" strokeWidth="8" strokeLinecap="round"
                            strokeDasharray="68 100" strokeDashoffset="25" className="progress-circle-animation" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold">76%</span>
                        <span className="text-sm dark:text-gray-400 text-gray-500">Completed</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Computer Science</span>
                        <span className="text-sm font-medium">89%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Business Admin</span>
                        <span className="text-sm font-medium">65%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Engineering</span>
                        <span className="text-sm font-medium">76%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                </div>
            </div>
        </>
    )
}