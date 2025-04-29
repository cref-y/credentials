import { CertificateFormState } from '@/types/types';

interface CertificateDetailsProps {
    distributionMethod: 'direct' | 'qrcode';
    state: CertificateFormState;
    setState: React.Dispatch<React.SetStateAction<CertificateFormState>>;
    isMetadataEligible: boolean;
    creatingMetadata: boolean;
    createdMetadata: boolean;
    metadataCID: string;
    handleCreateMetadata: () => Promise<void>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const CertificateDetails = ({
    distributionMethod,
    state,
    setState,
    isMetadataEligible,
    creatingMetadata,
    createdMetadata,
    metadataCID,
    handleCreateMetadata,
    error,
    setError
}: CertificateDetailsProps) => {
    const inputClasses = "w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
    const labelClasses = "block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1";

    const handleMetadataCreation = async () => {
        try {
            setError(null);
            await handleCreateMetadata();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create metadata');
        }
    };

    return (
        <div className="mt-6">
            <h4 className="text-base font-medium mb-4">Certificate Details</h4>

            <div className="space-y-4">
                {distributionMethod === 'direct' ? (
                    <>
                        <div>
                            <label className={labelClasses}>User Name</label>
                            <input
                                type="text"
                                value={state.studentName}
                                onChange={(e) => setState(prev => ({ ...prev, studentName: e.target.value }))}
                                className={inputClasses}
                                placeholder="Full name as it will appear on certificate"
                                required
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>Distinction / Achievement</label>
                            <input
                                type="text"
                                value={state.achievement}
                                onChange={(e) => setState(prev => ({ ...prev, achievement: e.target.value }))}
                                className={inputClasses}
                                placeholder="e.g. Certificate of Excellence in Project Management"
                                required
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <label className={labelClasses}>Template Name</label>
                            <input
                                type="text"
                                value={state.templateName}
                                onChange={(e) => {
                                    if (e.target.value.length <= 50) {
                                        setState(prev => ({ ...prev, templateName: e.target.value }));
                                    }
                                }}
                                className={inputClasses}
                                placeholder="e.g. CS101 Spring 2025 Certificate"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {state.templateName.length}/50 characters
                            </p>
                        </div>

                        <div>
                            <label className={labelClasses}>Certificate Base Details</label>
                            <textarea
                                value={state.achievement}
                                onChange={(e) => {
                                    if (e.target.value.length <= 120) {
                                        setState(prev => ({ ...prev, achievement: e.target.value }));
                                    }
                                }}
                                className={`${inputClasses} min-h-[80px]`}
                                placeholder="e.g. Certificate of Completion for CS101 Spring 2025"
                                maxLength={120}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {state.achievement.length}/120 characters - Appears on all certificates minted from this template
                            </p>
                        </div>

                        <div className="p-3 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Template Options</p>

                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="requireApproval"
                                    checked={state.requireApproval}
                                    onChange={(e) => setState(prev => ({ ...prev, requireApproval: e.target.checked }))}
                                    className="mr-2 h-3 w-3 rounded text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="requireApproval" className="text-xs">
                                    Require approval for each mint request
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={labelClasses}>Max mints</label>
                                    <input
                                        type="number"
                                        value={state.maxMints}
                                        onChange={(e) => {
                                            const value = Math.max(1, Math.min(1000, Number(e.target.value)));
                                            setState(prev => ({ ...prev, maxMints: value }));
                                        }}
                                        className="w-full px-2 py-1 rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs"
                                        min="1"
                                        max="1000"
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Expiry Date</label>
                                    <input
                                        type="date"
                                        value={state.expiryDate}
                                        onChange={(e) => setState(prev => ({ ...prev, expiryDate: e.target.value }))}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-2 py-1 rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div className="mt-4">
                    <label className={`${labelClasses} flex justify-between items-center`}>
                        <span>Metadata</span>
                        {metadataCID && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                <i className="fas fa-check-circle mr-1"></i> Created
                            </span>
                        )}
                    </label>

                    {metadataCID ? (
                        <div className="group relative">
                            <input
                                type="text"
                                value={metadataCID}
                                className={`${inputClasses} text-xs text-gray-500 pr-8`}
                                readOnly
                            />
                            <button
                                onClick={() => navigator.clipboard.writeText(metadataCID)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
                                title="Copy to clipboard"
                            >
                                <i className="fas fa-copy text-sm"></i>
                            </button>
                        </div>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={handleMetadataCreation}
                                disabled={!isMetadataEligible || creatingMetadata}
                                className={`w-full px-3 py-2 text-sm rounded-md border flex items-center justify-center transition-colors
                                    ${creatingMetadata
                                        ? 'bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed'
                                        : isMetadataEligible
                                            ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 cursor-pointer'
                                            : 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'}`}
                            >
                                {creatingMetadata ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        Creating metadata...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-file-export mr-2"></i>
                                        Generate Metadata
                                    </>
                                )}
                            </button>
                            {error && (
                                <p className="mt-2 text-xs text-red-500 dark:text-red-400">
                                    <i className="fas fa-exclamation-circle mr-1"></i>
                                    {error}
                                </p>
                            )}
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                {isMetadataEligible
                                    ? "Metadata will include certificate details and image reference"
                                    : "Complete all required fields above to generate metadata"}
                            </p>
                        </>
                    )}

                    {metadataCID && (
                        <div className="mt-2 flex space-x-2">
                            <a
                                href={`https://ipfs.io/ipfs/${metadataCID.split('//')[1]}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-500 hover:underline flex items-center"
                            >
                                <i className="fas fa-external-link-alt mr-1"></i>
                                View on IPFS
                            </a>
                            <button
                                onClick={() => setState(prev => ({ ...prev, metadataCID: '' }))}
                                className="text-xs text-gray-500 hover:text-red-500 flex items-center"
                            >
                                <i className="fas fa-redo mr-1"></i>
                                Regenerate
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CertificateDetails;