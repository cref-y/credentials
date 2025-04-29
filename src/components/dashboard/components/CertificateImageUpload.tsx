import { RefObject } from 'react';

interface CertificateImageUploadProps {
    imageInputRef: RefObject<HTMLInputElement>;
    selectedImage: File | null;
    imagePreview: string | null;
    uploadingImage: boolean;
    uploadedImage: boolean;
    imageCID: string;
    error: string | null;
    handleSelectImage: () => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUploadToIPFS: () => Promise<void>;
}

const CertificateImageUpload = ({
    imageInputRef,
    selectedImage,
    imagePreview,
    uploadingImage,
    uploadedImage,
    imageCID,
    error,
    handleSelectImage,
    handleImageChange,
    handleUploadToIPFS
}: CertificateImageUploadProps) => {

    const handleBoxClick = async () => {
        if (selectedImage && !uploadingImage && !uploadedImage) {
            // If image is selected but not uploaded, upload it
            await handleUploadToIPFS();
        } else {
            // Otherwise trigger file selection
            handleSelectImage();
        }
    };

    const getStatusMessage = () => {
        if (uploadingImage) {
            return (
                <p className="text-blue-600">
                    <i className="fas fa-spinner fa-spin mr-2"></i> Uploading to IPFS...
                </p>
            );
        }
        if (uploadedImage) {
            return (
                <p className="text-green-500">
                    <i className="fas fa-check-circle mr-2"></i> Successfully uploaded to IPFS
                </p>
            );
        }
        if (selectedImage) {
            return (
                <p className="text-blue-600">
                    <i className="fas fa-cloud-upload-alt mr-2"></i> Click to upload to IPFS
                </p>
            );
        }
        return (
            <p className="text-gray-500 dark:text-gray-400">
                <i className="fas fa-upload mr-2"></i> Click to select an image (JPEG, PNG, WebP)
            </p>
        );
    };

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium uppercase tracking-wide">Certificate Image</h4>
                {imageCID && (
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                        IPFS Ready
                    </span>
                )}
            </div>

            <div
                onClick={handleBoxClick}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer
                    ${error && !selectedImage ? 'border-red-500 dark:border-red-500 animate-shake' :
                        uploadedImage ? 'border-green-500 dark:border-green-500 hover:border-green-600 dark:hover:border-green-600' :
                            selectedImage ? 'border-blue-500 dark:border-blue-500 hover:border-blue-600 dark:hover:border-blue-600' :
                                'border-gray-300 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-600'}`}
            >
                <div className="mb-4 flex items-center justify-center">
                    {imagePreview ? (
                        <div className="relative">
                            <img
                                src={imagePreview}
                                alt="Certificate Preview"
                                className="max-h-48 rounded-lg shadow-md object-contain"
                            />
                            {uploadingImage && (
                                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                                    <div className="text-white">
                                        <i className="fas fa-spinner fa-spin text-2xl"></i>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-blue-600/10 dark:bg-blue-400/10 flex items-center justify-center">
                            <i className="fas fa-certificate text-blue-600 dark:text-blue-400 text-4xl"></i>
                        </div>
                    )}
                </div>

                <p className="text-sm mb-2 font-medium">
                    {selectedImage ? (
                        <>
                            <i className="fas fa-file-image mr-2 text-blue-500"></i>
                            {selectedImage.name}
                            <span className="text-xs text-gray-500 ml-2">
                                ({(selectedImage.size / 1024).toFixed(1)} KB)
                            </span>
                        </>
                    ) : (
                        "No image selected"
                    )}
                </p>

                <div className="text-sm mt-4">
                    {getStatusMessage()}
                </div>

                <input
                    type="file"
                    ref={imageInputRef}
                    onChange={handleImageChange}
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                />
            </div>

            {error && (
                <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    {error}
                </p>
            )}

            {imageCID && (
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <label className="block text-sm font-medium mb-1">IPFS Content Identifier (CID)</label>
                    <div className="flex items-center">
                        <code className="text-xs text-gray-700 dark:text-gray-300 font-mono break-all">
                            {imageCID}
                        </code>
                        <button
                            onClick={() => navigator.clipboard.writeText(imageCID)}
                            className="ml-2 text-gray-500 hover:text-blue-500"
                            title="Copy to clipboard"
                        >
                            <i className="fas fa-copy"></i>
                        </button>
                    </div>
                    <a
                        href={`https://ipfs.io/ipfs/${imageCID.split('//')[1]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-xs text-blue-500 hover:underline"
                    >
                        <i className="fas fa-external-link-alt mr-1"></i>
                        View on IPFS gateway
                    </a>
                </div>
            )}
        </div>
    );
};

export default CertificateImageUpload;