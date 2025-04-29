// types.ts
export interface Signer {
    address: string;
    role: string;
    status: 'pending' | 'completed';
}

export interface CertificateFormState {
    studentName: string;
    achievement: string;
    imageCID: string;
    metadataCID: string;
    studentWallet: string;
    signers: Signer[];
    selectedNetwork: 'hedera' | 'edu-chain' | 'ethereum';
    selectedImage: File | null;
    isTemplate: boolean;
    templateName: string;
    requireApproval: boolean;
    maxMints: number;
    expiryDate: string;
}

export type DistributionMethod = 'direct' | 'qrcode';
export type InputMethod = 'manual' | 'file';

// Types for certificate creation and deployment

// Types for certificate form state
export interface CertificateFormState {
    // Basic certificate information
    certificateName: string;
    certificateDescription?: string;
    studentWallet: string;

    // Certificate metadata
    metadataURL?: string;
    certificateImage?: string;

    // For batch certificate creation
    batchRecipients?: {
        wallet: string;
        name: string;
        email: string;
    }[];

    // Additional properties that might be needed based on component usage
    issuerName?: string;
    issueDate?: string;
    expiryDate?: string;
    certificateId?: string;

    // Any custom attributes/fields that might be relevant
    customFields?: Record<string, string>;
}

// Types for certificate signers
export interface Signer {
    address: string;
    role: string;
    status: 'pending' | 'completed';
}

// Types for certificate metadata
export interface CertificateMetadata {
    name: string;
    description: string;
    image: string;
    issuer: string;
    recipient: string;
    issuedOn: string;
    expiresOn?: string;
    signers: Signer[];
    attributes?: {
        trait_type: string;
        value: string;
    }[];
}

// Types for QR code distribution
export interface QRCodeData {
    url: string;
    template_id: string;
    issuer: string;
}

// Types for certificate deployment status
export interface DeploymentStatus {
    status: 'idle' | 'preparing' | 'deploying' | 'success' | 'error';
    message?: string;
    txHash?: string;
    error?: string;
}

// Certificate distribution methods
export type DistributionMethod = 'direct' | 'qrcode';

// Certificate input methods
export type InputMethod = 'manual' | 'file';