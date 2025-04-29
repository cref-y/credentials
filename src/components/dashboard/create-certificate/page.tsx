// app/create-certificates/page.tsx
import { useState, useRef } from 'react';
import { CertificateFormState, DistributionMethod, InputMethod } from '@/types/types';
import CertificateImageUpload from '../components/CertificateImageUpload';
import CertificateDetails from '../components/CertificateDetails';
import CertificateDeployment from '../components/CertificateDeployment';
import DistributionMethodSelector from '../components/DistributionMethodSelector';

const CreateCertificatePage = () => {
    // Form data state management
    const [state, setState] = useState<CertificateFormState>({
        studentName: '',
        achievement: '',
        imageCID: '',
        metadataCID: '',
        studentWallet: '',
        signers: [
            { address: '0x45.....8F21', role: 'Dean of School', status: 'completed' },
        ],
        selectedNetwork: 'hedera',
        selectedImage: null,
        isTemplate: false,
        templateName: '',
        requireApproval: true,
        maxMints: 100,
        expiryDate: ''
    });

    const [distributionMethod, setDistributionMethod] = useState<DistributionMethod>('direct');
    const [inputMethod, setInputMethod] = useState<InputMethod>('manual');
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(false);
    const [creatingMetadata, setCreatingMetadata] = useState(false);
    const [createdMetadata, setCreatedMetadata] = useState(false);
    const [deploying, setDeploying] = useState(false);
    const [deployed, setDeployed] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);[]

    const imageInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const successMessageRef = useRef<HTMLDivElement>(null);

    // Check if metadata can be created
    const isMetadataEligible = state.imageCID &&
        ((distributionMethod === 'direct' && state.studentName && state.achievement) ||
            (distributionMethod === 'qrcode' && state.templateName));

    // Count pending signers
    const pendingSigners = state.signers.filter(s => s.status === 'pending').length;

    // Event handlers
    const handleSelectImage = () => {
        imageInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setState(prev => ({ ...prev, selectedImage: file }));

            // Create image preview
            const reader = new FileReader();
            reader.onload = function (e) {
                setImagePreview(e.target?.result as string);
            }
            reader.readAsDataURL(file);
        }
    };

    const handleUploadToIPFS = async () => {
        if (!state.selectedImage) {
            setError('Please select an image first');
            return;
        }

        setUploadingImage(true);
        setError(null);

        try {
            const data = new FormData();
            data.append('file', state.selectedImage); // Add the file to FormData

            const uploadRequest = await fetch("/api/files", {
                method: "POST",
                body: data // Now this contains the actual file
            });

            if (!uploadRequest.ok) {
                const errorResponse = await uploadRequest.json();
                throw new Error(errorResponse.error || "Failed to upload image");
            }

            const ipfsUrl = await uploadRequest.json();
            const ipfsHash = ipfsUrl.split("/ipfs/")[1];
            if (!ipfsHash) throw new Error("Invalid IPFS URL format");

            const ipfsFormat = `ipfs://${ipfsHash}`;
            setState(prev => ({ ...prev, imageCID: ipfsFormat }));
            setUploadedImage(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to upload image');
            setUploadedImage(false);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleCreateMetadata = async () => {
        if (!state.imageCID) {
            setError('Please upload an image first');
            return;
        }

        setCreatingMetadata(true);
        setError(null);

        try {
            // Prepare metadata based on distribution method
            const metadata = {
                name: distributionMethod === 'direct' ? state.studentName : state.templateName,
                description: distributionMethod === 'direct'
                    ? `Certificate of ${state.achievement} awarded to ${state.studentName}`
                    : `Certificate template: ${state.templateName}`,
                image: state.imageCID,
                attributes: [
                    {
                        trait_type: "Achievement",
                        value: state.achievement,
                    },
                    {
                        trait_type: "Issued Date",
                        value: new Date().toISOString().split("T")[0],
                    },
                    ...(distributionMethod === 'direct' ? [] : [
                        {
                            trait_type: "Template",
                            value: "true"
                        },
                        {
                            trait_type: "Max Mints",
                            value: state.maxMints.toString()
                        },
                        ...(state.expiryDate ? [{
                            trait_type: "Expiry Date",
                            value: state.expiryDate
                        }] : [])
                    ])
                ],
                properties: {
                    signers: state.signers.map(signer => ({
                        address: signer.address,
                        role: signer.role,
                        status: signer.status
                    })),
                    network: state.selectedNetwork,
                    ...(distributionMethod === 'direct' ? {
                        recipient: state.studentWallet
                    } : {
                        requireApproval: state.requireApproval
                    })
                }
            };

            // Upload metadata to IPFS
            const metadataRequest = await fetch("/api/files", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(metadata),
            });

            if (!metadataRequest.ok) {
                const errorResponse = await metadataRequest.json();
                throw new Error(errorResponse.error || "Failed to create metadata");
            }

            const ipfsUrl = await metadataRequest.json();
            const ipfsHash = ipfsUrl.split("/ipfs/")[1];
            if (!ipfsHash) throw new Error("Invalid IPFS URL format");

            const ipfsFormat = `ipfs://${ipfsHash}`;
            setState(prev => ({ ...prev, metadataCID: ipfsFormat }));
            setCreatedMetadata(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create metadata');
            setCreatedMetadata(false);
        } finally {
            setCreatingMetadata(false);
        }
    };


    const handleAddSigner = () => {
        if (state.signers.length < 3) {
            const address = prompt('Enter signer wallet address:');
            if (address) {
                const role = prompt('Enter signer role:');
                if (role) {
                    setState(prev => ({
                        ...prev,
                        signers: [...prev.signers, { address, role, status: 'pending' }]
                    }));
                }
            }
        }
    };

    const handleEditSigner = (index: number) => {
        const newRole = prompt('Enter new role', state.signers[index].role);
        if (newRole !== null) {
            const updatedSigners = [...state.signers];
            updatedSigners[index].role = newRole;
            setState(prev => ({ ...prev, signers: updatedSigners }));
        }
    };

    const handleDeleteSigner = (index: number) => {
        const updatedSigners = [...state.signers];
        updatedSigners.splice(index, 1);
        setState(prev => ({ ...prev, signers: updatedSigners }));
    };

    const handleToggleSignerStatus = (index: number) => {
        const updatedSigners = [...state.signers];
        updatedSigners[index].status = updatedSigners[index].status === 'completed' ? 'pending' : 'completed';
        setState(prev => ({ ...prev, signers: updatedSigners }));
    };

    const handleNetworkSelection = (network: 'hedera' | 'edu-chain' | 'ethereum') => {
        setState(prev => ({ ...prev, selectedNetwork: network }));
    };

    const handleAddWalletAddress = () => {
        setState(prev => ({ ...prev, studentWallet: prev.studentWallet.trim() }));
        const addAddressBtn = document.getElementById('add-address-btn');
        if (addAddressBtn) {
            addAddressBtn.innerHTML = '<i className="fas fa-check"></i>';
            setTimeout(() => {
                addAddressBtn.innerHTML = 'Add Address';
            }, 2000);
        }
    };

    const generateQRCode = () => {
        setTimeout(() => {
            setQrCodeUrl('https://certifi.edu/mint/abcd1234');
            setQrCodeGenerated(true);
        }, 1000);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setDeploying(true);

        setTimeout(() => {
            setDeploying(false);
            setDeployed(true);
            setSuccessMessage(true);

            if (distributionMethod === 'qrcode') {
                generateQRCode();
            }

            if (successMessageRef.current) {
                successMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }, 3000);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen rounded-xl">
            <div className="container mx-auto px-1 py-4 max-w-6xl">
                <div className="p-6 rounded-2xl bg-white dark:bg-dark-card shadow-lg mb-8">
                    <div className="flex flex-col md:flex-row items-start justify-between mb-6">
                        <h3 className="text-xl font-semibold">Create Digital Certificate</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300 mt-2 md:mt-0">
                            You will need to store the certificate image and metadata on IPFS for easier retrieval.
                            <a href="#" className="text- hover:underline">What is IPFS?</a>
                        </p>
                    </div>

                    <DistributionMethodSelector
                        distributionMethod={distributionMethod}
                        setDistributionMethod={setDistributionMethod}
                    />

                    <form onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left column: Certificate image and details */}
                            <div>
                                <CertificateImageUpload
                                    imageInputRef={imageInputRef}
                                    selectedImage={state.selectedImage}
                                    imagePreview={imagePreview}
                                    uploadingImage={uploadingImage}
                                    uploadedImage={uploadedImage}
                                    imageCID={state.imageCID}
                                    error={error}
                                    handleSelectImage={handleSelectImage}
                                    handleImageChange={handleImageChange}
                                    handleUploadToIPFS={handleUploadToIPFS}
                                />

                                <CertificateDetails
                                    distributionMethod={distributionMethod}
                                    state={state}
                                    setState={setState}
                                    isMetadataEligible={isMetadataEligible as any}
                                    creatingMetadata={creatingMetadata}
                                    createdMetadata={createdMetadata}
                                    metadataCID={state.metadataCID}
                                    handleCreateMetadata={handleCreateMetadata}
                                    error={error}
                                    setError={setError}
                                />
                            </div>

                            {/* Right column: Deploy certificate NFT */}
                            <CertificateDeployment
                                distributionMethod={distributionMethod}
                                inputMethod={inputMethod}
                                setInputMethod={setInputMethod}
                                state={state}
                                setState={setState}
                                signers={state.signers}
                                pendingSigners={pendingSigners}
                                deploying={deploying}
                                deployed={deployed}
                                successMessage={successMessage}
                                successMessageRef={successMessageRef}
                                qrCodeUrl={qrCodeUrl}
                                qrCodeGenerated={qrCodeGenerated}
                                handleAddSigner={handleAddSigner}
                                handleEditSigner={handleEditSigner}
                                handleDeleteSigner={handleDeleteSigner}
                                handleToggleSignerStatus={handleToggleSignerStatus}
                                handleAddWalletAddress={handleAddWalletAddress}
                                metadataCID={state.metadataCID}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCertificatePage;