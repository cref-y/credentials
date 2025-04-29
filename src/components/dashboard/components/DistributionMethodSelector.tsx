import { DistributionMethod } from '@/types/types';

interface DistributionMethodSelectorProps {
    distributionMethod: DistributionMethod;
    setDistributionMethod: (method: DistributionMethod) => void;
}

const DistributionMethodSelector = ({
    distributionMethod,
    setDistributionMethod
}: DistributionMethodSelectorProps) => {
    return (
        <div className="mb-8">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                <button
                    type="button"
                    onClick={() => setDistributionMethod('direct')}
                    className={`py-3 px-6 font-medium text-sm focus:outline-none transition-all
                    ${distributionMethod === 'direct'
                            ? 'border-b-2 border-blue-600 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                >
                    <i className="fas fa-user-graduate mr-2"></i>
                    Direct Issuance
                </button>

                <button
                    type="button"
                    onClick={() => setDistributionMethod('qrcode')}
                    className={`py-3 px-6 font-medium text-sm focus:outline-none transition-all
                    ${distributionMethod === 'qrcode'
                            ? 'border-b-2 border-blue-600 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                >
                    <i className="fas fa-qrcode mr-2"></i>
                    QR Code Template
                </button>
            </div>

            {/* Tab Content */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
                {distributionMethod === 'direct' && (
                    <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                            <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center">
                                <i className="fas fa-user-graduate text-blue-600 text-2xl"></i>
                            </div>
                        </div>
                        <div>
                            <h5 className="font-medium text-lg mb-2">Direct Issuance</h5>
                            <p className="text-gray-600 dark:text-gray-300">
                                Mint certificate directly to a specific student's wallet address.
                                Use this option when you already know the recipient's wallet address.
                            </p>
                        </div>
                    </div>
                )}

                {distributionMethod === 'qrcode' && (
                    <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                            <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center">
                                <i className="fas fa-qrcode text-blue-600 text-2xl"></i>
                            </div>
                        </div>
                        <div>
                            <h5 className="font-medium text-lg mb-2">QR Code Template</h5>
                            <p className="text-gray-600 dark:text-gray-300">
                                Create a QR code template that users can scan to mint their certificate.
                                Ideal for events or when recipients will claim their certificates later.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DistributionMethodSelector;