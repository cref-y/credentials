import { RefObject, useState, useRef, useEffect } from 'react';
import { CertificateFormState, Signer } from '@/types/types';
import CertificateMintingAnimation from './CertificateMintingAnimation';
import QRCode from "react-qr-code";

interface CertificateDeploymentProps {
    distributionMethod: 'direct' | 'qrcode';
    inputMethod: 'manual' | 'file';
    setInputMethod: (method: 'manual' | 'file') => void;
    state: CertificateFormState;
    setState: React.Dispatch<React.SetStateAction<CertificateFormState>>;
    signers: Signer[];
    pendingSigners: number;
    deploying: boolean;
    deployed: boolean;
    successMessage: boolean;
    successMessageRef: RefObject<HTMLDivElement>;
    qrCodeUrl: string;
    qrCodeGenerated: boolean;
    handleAddSigner: () => void;
    handleEditSigner: (index: number) => void;
    handleDeleteSigner: (index: number) => void;
    handleToggleSignerStatus: (index: number) => void;
    handleAddWalletAddress: () => void;
    metadataCID: string;
}

const CertificateDeployment = ({
    distributionMethod,
    inputMethod,
    setInputMethod,
    state,
    setState,
    signers,
    pendingSigners,
    deploying,
    deployed,
    successMessage,
    successMessageRef,
    qrCodeUrl,
    qrCodeGenerated,
    handleAddSigner,
    handleEditSigner,
    handleDeleteSigner,
    handleToggleSignerStatus,
    handleAddWalletAddress,
    metadataCID
}: CertificateDeploymentProps) => {
    const [fileUploading, setFileUploading] = useState(false);
    const [fileError, setFileError] = useState("");
    const [walletError, setWalletError] = useState("");
    const [showAddSignerModal, setShowAddSignerModal] = useState(false);
    const [editingSignerIndex, setEditingSignerIndex] = useState<number | null>(null);
    const [newSigner, setNewSigner] = useState<{ address: string; role: string; status: 'pending' | 'completed' }>({
        address: '',
        role: '',
        status: 'pending'
    });

    // Animation state
    const [showAnimation, setShowAnimation] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

    // QR code related states
    const [qrCodeImageUrl, setQrCodeImageUrl] = useState<string | null>(null);
    const qrCodeRef = useRef<HTMLDivElement>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Validate Ethereum wallet address
    const isValidEthAddress = (address: string): boolean => {
        return /^0x[a-fA-F0-9]{40}$/.test(address);
    };

    // Trigger animation when deployment is successful
    useEffect(() => {
        if (deployed && !animationComplete && !showAnimation) {
            setShowAnimation(true);
        }
    }, [deployed, animationComplete, showAnimation]);

    // Generate QR code when deployed and distributionMethod is 'qrcode'
    useEffect(() => {
        if (deployed && distributionMethod === 'qrcode' && qrCodeGenerated) {
            // If a QR code is already generated but we don't have the image URL yet,
            // we can try to create a data URL from the QR code element
            if (qrCodeRef.current && !qrCodeImageUrl) {
                try {
                    // This is a fallback method in case we need to create an image from the QR code element
                    const svgElement = qrCodeRef.current.querySelector('svg');
                    if (svgElement) {
                        const svgData = new XMLSerializer().serializeToString(svgElement);
                        const blob = new Blob([svgData], { type: 'image/svg+xml' });
                        const url = URL.createObjectURL(blob);
                        setQrCodeImageUrl(url);
                    }
                } catch (error) {
                    console.error('Error creating QR code image:', error);
                }
            }
        }
    }, [deployed, distributionMethod, qrCodeGenerated, qrCodeImageUrl]);

    // Handle animation completion
    const handleAnimationComplete = () => {
        setAnimationComplete(true);
        // Scroll to success message if it exists
        if (successMessageRef?.current) {
            successMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Handle file upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) {
            setFileError("No file selected");
            return;
        }

        const file = files[0];
        // Check file type and size
        if (!file.type.includes('csv') && !file.type.includes('excel') && !file.type.includes('spreadsheet')) {
            setFileError("Please upload a CSV or Excel file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setFileError("File size exceeds 5MB limit");
            return;
        }

        setFileError("");
        setFileUploading(true);

        // Simulating file processing
        setTimeout(() => {
            // Mock successful processing - would be replaced with actual file parsing logic
            setState(prev => ({
                ...prev,
                batchRecipients: [
                    { wallet: "0x123...456", name: "John Doe", email: "john@example.com" },
                    { wallet: "0x789...012", name: "Jane Smith", email: "jane@example.com" },
                ]
            }));
            setFileUploading(false);
        }, 1500);
    };

    // Handle downloading QR code
    const handleDownloadQRCode = () => {
        if (qrCodeRef.current) {
            const svgElement = qrCodeRef.current.querySelector('svg');
            if (svgElement) {
                // Create a canvas from the SVG
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();

                // Convert SVG to data URL
                const svgData = new XMLSerializer().serializeToString(svgElement);
                const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                const svgUrl = URL.createObjectURL(svgBlob);

                img.onload = function () {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx?.drawImage(img, 0, 0);

                    // Convert canvas to data URL and trigger download
                    const pngUrl = canvas.toDataURL('image/png');
                    const downloadLink = document.createElement('a');
                    downloadLink.href = pngUrl;
                    downloadLink.download = `${state.certificateName || 'Certificate'}_QRCode.png`;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    URL.revokeObjectURL(svgUrl);
                };

                img.src = svgUrl;
            }
        }
    };

    // Handle sharing QR code
    const handleShareQRCode = () => {
        if (navigator.share && qrCodeImageUrl) {
            navigator.share({
                title: `${state.certificateName || 'Certificate'} QR Code`,
                text: 'Scan this QR code to claim your certificate',
                url: qrCodeUrl || window.location.href,
            })
                .catch((error) => console.log('Error sharing', error));
        } else {
            // Fallback for browsers that don't support the Web Share API
            // Copy the certificate link to clipboard
            navigator.clipboard.writeText(qrCodeUrl || window.location.href)
                .then(() => alert('Certificate link copied to clipboard!'))
                .catch((error) => console.error('Could not copy text: ', error));
        }
    };

    // Handle adding a new signer
    const openAddSignerModal = () => {
        setNewSigner({ address: '', role: '', status: 'pending' });
        setEditingSignerIndex(null);
        setShowAddSignerModal(true);
    };

    // Handle editing an existing signer
    const openEditSignerModal = (index: number) => {
        setNewSigner({ ...signers[index] });
        setEditingSignerIndex(index);
        setShowAddSignerModal(true);
    };

    // Save signer (for both add and edit)
    const saveSigner = () => {
        if (!isValidEthAddress(newSigner.address)) {
            setWalletError("Please enter a valid Ethereum address");
            return;
        }

        if (!newSigner.role.trim()) {
            setWalletError("Please enter a role for the signer");
            return;
        }

        setWalletError("");

        if (editingSignerIndex !== null) {
            // Handle edit logic (would be implemented in parent component)
            const updatedSigners = [...signers];
            updatedSigners[editingSignerIndex] = { ...newSigner };
            // Would need a setter for signers in the parent component
            // setSigners(updatedSigners);
            handleEditSigner(editingSignerIndex);
        } else {
            // Handle add logic
            handleAddSigner();
        }

        setShowAddSignerModal(false);
    };

    // Validate wallet address on input
    const validateWalletAddress = (address: string) => {
        if (address && !isValidEthAddress(address)) {
            setWalletError("Please enter a valid Ethereum address");
        } else {
            setWalletError("");
        }
    };

    // Reset file input when switching to manual mode
    useEffect(() => {
        if (inputMethod === 'manual' && fileInputRef.current) {
            fileInputRef.current.value = '';
            setFileError("");
        }
    }, [inputMethod]);

    const isDisabled = !metadataCID || deploying || (signers.length === 0) ||
        (distributionMethod === 'direct' && (
            (inputMethod === 'manual' && !isValidEthAddress(state.studentWallet)) ||
            (inputMethod === 'file' && (!state.batchRecipients || state.batchRecipients.length === 0))
        ));


    return (
        <div>
            <h4 className="text-lg font-medium uppercase mb-4 tracking-wide">
                {distributionMethod === 'direct'
                    ? 'Deploy Your Certificate NFT'
                    : 'Create Your Certificate Template'}
            </h4>

            {distributionMethod === 'direct' && (
                <>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <button
                            type="button"
                            onClick={() => setInputMethod('manual')}
                            className={`w-full py-3 
                                ${inputMethod === 'manual'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800'} 
                                rounded-lg transition-colors`}
                        >
                            Manual Input
                        </button>
                        <button
                            type="button"
                            onClick={() => setInputMethod('file')}
                            className={`w-full py-3 
                                ${inputMethod === 'file'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800'} 
                                rounded-lg transition-colors`}
                        >
                            Upload File
                        </button>
                    </div>

                    {inputMethod === 'manual' ? (
                        <div className="mb-8">
                            <label className="block text-sm font-medium mb-2">Recipient Wallet Address</label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={state.studentWallet}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setState(prev => ({ ...prev, studentWallet: value }));
                                        validateWalletAddress(value);
                                    }}
                                    className={`flex-1 px-4 py-2 rounded-l-lg bg-gray-50 dark:bg-gray-800 border ${walletError ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} text-base`}
                                    placeholder="0x..."
                                    required
                                />
                                <button
                                    type="button"
                                    id="add-address-btn"
                                    onClick={handleAddWalletAddress}
                                    className={`px-4 py-2 ${isValidEthAddress(state.studentWallet) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'} text-white rounded-r-lg transition-colors`}
                                    disabled={!isValidEthAddress(state.studentWallet)}
                                >
                                    Verify
                                </button>
                            </div>
                            {walletError && (
                                <p className="mt-1 text-sm text-red-500">{walletError}</p>
                            )}
                        </div>
                    ) : (
                        <div className="mb-8">
                            <label className="block text-sm font-medium mb-2">Upload Recipients File (CSV or Excel)</label>
                            <div className="flex flex-col">
                                <div className={`border-2 border-dashed rounded-lg p-6 text-center ${fileError ? 'border-red-400' : 'border-gray-300 dark:border-gray-700'}`}>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        accept=".csv,.xlsx,.xls"
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer">
                                        {fileUploading ? (
                                            <div className="flex flex-col items-center">
                                                <i className="fas fa-spinner fa-spin text-2xl text-blue-600 mb-2"></i>
                                                <span className="text-sm">Processing file...</span>
                                            </div>
                                        ) : state.batchRecipients && state.batchRecipients.length > 0 ? (
                                            <div className="flex flex-col items-center">
                                                <i className="fas fa-file-alt text-2xl text-green-600 mb-2"></i>
                                                <span className="text-sm font-medium">{state.batchRecipients.length} recipients loaded</span>
                                                <span className="text-xs text-gray-500 mt-1">Click to change file</span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center">
                                                <i className="fas fa-cloud-upload-alt text-2xl text-blue-600 mb-2"></i>
                                                <span className="text-sm">Drag and drop a file or click to browse</span>
                                                <span className="text-xs text-gray-500 mt-1">CSV or Excel file with wallet addresses</span>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                {fileError && (
                                    <p className="mt-1 text-sm text-red-500">{fileError}</p>
                                )}
                                {state.batchRecipients && state.batchRecipients.length > 0 && (
                                    <div className="mt-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <p className="text-sm font-medium mb-2">Recipients Preview:</p>
                                        <div className="max-h-32 overflow-y-auto">
                                            <table className="w-full text-xs">
                                                <thead className="text-left border-b border-gray-200 dark:border-gray-700">
                                                    <tr>
                                                        <th className="pb-2">Wallet</th>
                                                        <th className="pb-2">Name</th>
                                                        <th className="pb-2">Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {state.batchRecipients.slice(0, 3).map((recipient, idx) => (
                                                        <tr key={idx} className="border-b border-gray-100 dark:border-gray-800">
                                                            <td className="py-1 font-mono">{recipient.wallet}</td>
                                                            <td className="py-1">{recipient.name}</td>
                                                            <td className="py-1">{recipient.email}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            {state.batchRecipients.length > 3 && (
                                                <p className="text-xs text-gray-500 mt-2">
                                                    +{state.batchRecipients.length - 3} more recipients
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}

            <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                    <h5 className="text-sm font-medium uppercase tracking-wide">Certificate Signers</h5>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{signers.length}/5 signers</span>
                </div>

                <div className="mb-4">
                    <button
                        type="button"
                        onClick={openAddSignerModal}
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50"
                        disabled={signers.length >= 5}
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add Signer
                    </button>
                </div>

                <div className="space-y-3">
                    {signers.length === 0 ? (
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">No signers added yet</p>
                            <p className="text-xs mt-1 text-gray-400 dark:text-gray-500">
                                Add at least one signer to approve the certificate
                            </p>
                        </div>
                    ) : (
                        signers.map((signer, index) => (
                            <div
                                key={index}
                                className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-between group"
                            >
                                <div className="flex items-center">
                                    <div className={`w-2 h-2 rounded-full mr-3 ${signer.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                                        }`}></div>
                                    <div>
                                        <p className="text-sm font-medium">{signer.address}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{signer.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        type="button"
                                        className="text-blue-600 hover:text-blue-700"
                                        onClick={() => openEditSignerModal(index)}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="text-red-500 hover:text-red-600"
                                        onClick={() => handleDeleteSigner(index)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className={`p-1 rounded-full ${signer.status === 'completed'
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-yellow-100 text-yellow-600'
                                            }`}
                                        onClick={() => handleToggleSignerStatus(index)}
                                        title={signer.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
                                    >
                                        <i className={`fas ${signer.status === 'completed' ? 'fa-check' : 'fa-clock'
                                            } text-xs`}></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {pendingSigners > 0 && (
                    <div className="mt-3 p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 flex items-center text-yellow-600 dark:text-yellow-400">
                        <i className="fas fa-clock mr-2 text-sm"></i>
                        <span className="text-xs">
                            {pendingSigners} pending approval{pendingSigners > 1 ? 's' : ''}
                        </span>
                    </div>
                )}
            </div>

            <button
                type="submit"
                className={`w-full py-3 px-4 ${deployed ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
                    } text-white rounded-lg transition-colors flex items-center justify-center ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                disabled={isDisabled}
            >

                {deploying ? (
                    <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        {distributionMethod === 'direct' ? 'Minting...' : 'Creating...'}
                    </>
                ) : deployed ? (
                    <>
                        <i className="fas fa-check-circle mr-2"></i>
                        {distributionMethod === 'direct' ? 'Successfully Minted' : 'Template Created'}
                    </>
                ) : (
                    <>
                        <i className={`fas ${distributionMethod === 'direct' ? 'fa-certificate' : 'fa-qrcode'
                            } mr-2`}></i>
                        {distributionMethod === 'direct' ? 'Mint Certificate NFT' : 'Create Template'}
                    </>
                )}
            </button>

            {successMessage && (
                <div
                    ref={successMessageRef}
                    className={`mt-4 p-4 rounded-lg border ${distributionMethod === 'direct'
                        ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400'
                        : 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400'
                        }`}
                >
                    <div className="flex items-start">
                        <i className={`fas ${distributionMethod === 'direct' ? 'fa-check-circle' : 'fa-qrcode'
                            } text-xl mr-3`}></i>
                        <div>
                            <p className="font-medium">
                                {distributionMethod === 'direct'
                                    ? 'Certificate NFT Minted Successfully!'
                                    : 'Certificate Template Created!'}
                            </p>
                            {distributionMethod === 'direct' ? (
                                inputMethod === 'manual' ? (
                                    <p className="text-sm mt-1">
                                        The certificate has been sent to: <span className="font-mono">{state.studentWallet}</span>
                                    </p>
                                ) : (
                                    <div className="mt-1">
                                        <p className="text-sm">Certificates have been sent to {state.batchRecipients?.length || 0} recipients.</p>
                                        <button className="text-xs text-blue-600 mt-1 flex items-center">
                                            <i className="fas fa-download mr-1"></i> Download confirmation report
                                        </button>
                                    </div>
                                )
                            ) : (
                                <div className="mt-3">
                                    {qrCodeGenerated ? (
                                        <div
                                            ref={qrCodeRef}
                                            className="bg-white dark:bg-gray-800 p-3 rounded-md inline-block"
                                        >
                                            {/* Actual QR Code Implementation */}
                                            <QRCode
                                                value={qrCodeUrl || `https://certificate.example.com/${metadataCID}`}
                                                size={128}
                                                level="H"
                                                // renderAs="svg"
                                                // includeMargin={true}
                                                bgColor={"#ffffff"}
                                                fgColor={"#000000"}
                                            />
                                        </div>
                                    ) : (
                                        <div className="bg-white dark:bg-gray-800 p-3 rounded-md inline-block">
                                            <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                                <i className="fas fa-qrcode text-4xl text-blue-500"></i>
                                            </div>
                                        </div>
                                    )}
                                    <div className="mt-3">
                                        <button
                                            className="text-sm bg-blue-600 text-white px-3 py-1 rounded mr-2"
                                            onClick={handleDownloadQRCode}
                                            disabled={!qrCodeGenerated}
                                        >
                                            <i className="fas fa-download mr-1"></i> Download QR
                                        </button>
                                        <button
                                            className="text-sm bg-white dark:bg-gray-800 border border-blue-600 text-blue-600 px-3 py-1 rounded"
                                            onClick={handleShareQRCode}
                                            disabled={!qrCodeGenerated}
                                        >
                                            <i className="fas fa-share-alt mr-1"></i> Share
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Signer Modal */}
            {showAddSignerModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-medium mb-4">
                            {editingSignerIndex !== null ? 'Edit Signer' : 'Add Signer'}
                        </h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Wallet Address</label>
                            <input
                                type="text"
                                value={newSigner.address}
                                onChange={(e) => {
                                    setNewSigner({ ...newSigner, address: e.target.value });
                                    validateWalletAddress(e.target.value);
                                }}
                                className={`w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border ${walletError ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                                placeholder="0x..."
                            />
                            {walletError && (
                                <p className="mt-1 text-xs text-red-500">{walletError}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Role</label>
                            <input
                                type="text"
                                value={newSigner.role}
                                onChange={(e) => setNewSigner({ ...newSigner, role: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                                placeholder="e.g. Instructor, Dean, CEO"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="status-pending"
                                        checked={newSigner.status === 'pending'}
                                        onChange={() => setNewSigner({ ...newSigner, status: 'pending' })}
                                        className="mr-2"
                                    />
                                    <label htmlFor="status-pending" className="text-sm">Pending</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="status-completed"
                                        checked={newSigner.status === 'completed'}
                                        onChange={() => setNewSigner({ ...newSigner, status: 'completed' })}
                                        className="mr-2"
                                    />
                                    <label htmlFor="status-completed" className="text-sm">Completed</label>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setShowAddSignerModal(false)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={saveSigner}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                disabled={!isValidEthAddress(newSigner.address) || !newSigner.role.trim()}
                            >
                                {editingSignerIndex !== null ? 'Update' : 'Add'} Signer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Certificate Minting Animation */}
            {/* <CertificateMintingAnimation
                isMinted={showAnimation}
                onAnimationComplete={handleAnimationComplete}
                certificateTitle={state.certificateName || "Certificate of Achievement"}
            /> */}
        </div>
    );
};

export default CertificateDeployment;