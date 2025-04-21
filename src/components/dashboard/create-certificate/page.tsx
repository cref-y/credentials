import { useState } from 'react';
import { FaCertificate, FaCloudUploadAlt, FaFileImage, FaArrowRight, FaPlus, FaEdit, FaTrash, FaClock, FaCheckCircle } from 'react-icons/fa';

const CreateCertificatePage = () => {
    const [formData, setFormData] = useState({
        studentName: '',
        achievement: '',
        imageCID: '',
        metadataCID: '',
        studentWallet: '',
        signers: [
            { address: '0x45.....8F21', role: 'Dean of School', status: 'completed' },
            { address: '0x72.....1A45', role: 'Department Chair', status: 'pending' }
        ],
        selectedNetwork: 'hedera'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddSigner = () => {
        if (formData.signers.length < 3) {
            setFormData(prev => ({
                ...prev,
                signers: [...prev.signers, { address: '', role: '', status: 'pending' }]
            }));
        }
    };

    const handleRemoveSigner = (index: number) => {
        setFormData(prev => ({
            ...prev,
            signers: prev.signers.filter((_, i) => i !== index)
        }));
    };

    const handleSignerChange = (index: number, field: string, value: string) => {
        const updatedSigners = [...formData.signers];
        updatedSigners[index] = { ...updatedSigners[index], [field]: value };
        setFormData(prev => ({
            ...prev,
            signers: updatedSigners
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="mb-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-dark-card shadow-lg">
                <div className="flex flex-col md:flex-row items-start justify-between mb-6">
                    <h3 className="text-xl font-semibold">Create Digital Certificate</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mt-2 md:mt-0">
                        You will need to store the certificate image and metadata on IPFS for easier retrieval.
                        <a href="#" className="text-primary hover:underline">What is IPFS?</a>
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left column: Certificate image and details */}
                        <div>
                            <div className="mb-8">
                                <h4 className="text-lg font-medium uppercase mb-4 tracking-wide">Certificate Image</h4>

                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center transition-all hover:border-primary dark:hover:border-primary animate-pulse-slow">
                                    <div id="certificate-preview" className="mb-4 flex items-center justify-center">
                                        <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                                            <FaCertificate className="text-primary text-4xl" />
                                        </div>
                                    </div>

                                    <p className="text-sm mb-2">b5b12ae1-1101-412e-b171-9bd1aa743416.png</p>

                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                                        <button
                                            type="button"
                                            className="w-full sm:w-auto px-6 py-2.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors"
                                        >
                                            <FaCloudUploadAlt className="mr-2" />
                                            Upload Image to IPFS
                                        </button>
                                        <button
                                            type="button"
                                            className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg flex items-center justify-center transition-colors"
                                        >
                                            <FaFileImage className="mr-2" />
                                            Select Image
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Image CID</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-lighter border border-gray-300 dark:border-gray-700 text-base"
                                    placeholder="ipfs://Qm..."
                                    value={formData.imageCID}
                                    onChange={handleInputChange}
                                    name="imageCID"
                                    readOnly
                                />
                            </div>

                            <div className="space-y-6 mt-8">
                                <h4 className="text-lg font-medium uppercase mb-4 tracking-wide">Certificate Details</h4>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Student Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-lighter border border-gray-300 dark:border-gray-700 text-base focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                        placeholder="Full name as it will appear on certificate"
                                        value={formData.studentName}
                                        onChange={handleInputChange}
                                        name="studentName"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Distinction / Achievement</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-lighter border border-gray-300 dark:border-gray-700 text-base focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                        placeholder="e.g. Bachelor of Computer Science, First Class Honors"
                                        value={formData.achievement}
                                        onChange={handleInputChange}
                                        name="achievement"
                                        required
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors flex items-center justify-center group"
                                >
                                    <span className="mr-2">Create & Upload Metadata</span>
                                    <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                                </button>

                                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                    Fill in all fields and upload image to IPFS first
                                </p>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium mb-2">Metadata CID</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-lighter border border-gray-300 dark:border-gray-700 text-base"
                                    value={formData.metadataCID}
                                    onChange={handleInputChange}
                                    name="metadataCID"
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* Right column: Deploy certificate NFT */}
                        <div>
                            <h4 className="text-lg font-medium uppercase mb-4 tracking-wide">Deploy Your Certificate NFT</h4>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <button
                                    type="button"
                                    className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                                >
                                    Manual Input
                                </button>
                                <button
                                    type="button"
                                    className="w-full py-3 bg-gray-100 dark:bg-dark-lighter hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    Upload File
                                </button>
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-medium mb-2">Add Student Wallet Address</label>
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        className="flex-1 px-4 py-2 rounded-l-lg bg-gray-100 dark:bg-dark-lighter border border-gray-300 dark:border-gray-700 text-base"
                                        placeholder="0x..."
                                        value={formData.studentWallet}
                                        onChange={handleInputChange}
                                        name="studentWallet"
                                    />
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-primary-dark transition-colors"
                                    >
                                        Add Address
                                    </button>
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-3">
                                    <h5 className="text-lg font-medium uppercase tracking-wide">Certificate Signers</h5>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">(3 max)</span>
                                </div>

                                <div className="mb-4">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Signers ({formData.signers.length}/3)</div>
                                        <button
                                            type="button"
                                            onClick={handleAddSigner}
                                            disabled={formData.signers.length >= 3}
                                            className="px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center disabled:opacity-50"
                                        >
                                            <FaPlus className="mr-1" />
                                            Add Signer
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {formData.signers.map((signer, index) => (
                                        <div key={index} className="p-3 rounded-lg bg-gray-100 dark:bg-dark-lighter flex items-center justify-between group hover:bg-primary/5 transition-colors">
                                            <div className="flex items-center">
                                                <div className={`w-2 h-2 rounded-full ${signer.status === 'completed' ? 'bg-green-500' :
                                                    signer.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'
                                                    } mr-3`}></div>
                                                <div>
                                                    <p className="font-medium">{signer.address}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{signer.role}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {signer.status === 'completed' && (
                                                    <button type="button" className="text-green-500">
                                                        <FaCheckCircle />
                                                    </button>
                                                )}
                                                {signer.status === 'pending' && (
                                                    <button type="button" className="text-yellow-500">
                                                        <FaClock />
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    className="text-primary"
                                                    onClick={() => handleSignerChange(index, 'role', prompt('Enter new role', signer.role) || signer.role)}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-red-500"
                                                    onClick={() => handleRemoveSigner(index)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {formData.signers.some(s => s.status === 'pending') && (
                                    <div className="mt-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center text-yellow-600">
                                        <FaClock className="mr-2" />
                                        <span className="text-sm">Waiting for {formData.signers.filter(s => s.status === 'pending').length} of {formData.signers.length} signers to complete</span>
                                    </div>
                                )}
                            </div>

                            <div className="mb-6">
                                <h5 className="text-sm font-medium mb-3">Select network to deploy your Certificate NFT</h5>
                                <div className="grid grid-cols-3 gap-3">
                                    {['hedera', 'edu-chain', 'ethereum'].map(network => (
                                        <button
                                            key={network}
                                            type="button"
                                            className={`py-3 px-2 bg-gray-100 dark:bg-dark-lighter rounded-lg transition-colors flex items-center justify-center ${formData.selectedNetwork === network
                                                ? 'bg-primary text-white'
                                                : 'hover:bg-primary hover:text-white'
                                                }`}
                                            onClick={() => setFormData(prev => ({ ...prev, selectedNetwork: network }))}
                                        >
                                            {network.charAt(0).toUpperCase() + network.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors flex items-center justify-center group mt-6"
                            >
                                <FaCertificate className="mr-2" />
                                <span>Deploy Certificate NFT</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCertificatePage;