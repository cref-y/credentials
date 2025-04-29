import { useState, useEffect } from 'react';

interface CertificateMintingAnimationProps {
    isMinted: boolean;
    onAnimationComplete: () => void;
    certificateTitle?: string;
}

const CertificateMintingAnimation = ({
    isMinted = false,
    onAnimationComplete = () => { },
    certificateTitle = "Certificate of Achievement"
}: CertificateMintingAnimationProps) => {
    const [animationStage, setAnimationStage] = useState('initial');

    useEffect(() => {
        if (isMinted && animationStage === 'initial') {
            // Start animation sequence
            setAnimationStage('floating');

            // After floating, move to corner
            const floatTimer = setTimeout(() => {
                setAnimationStage('moving');
            }, 1000);

            // After moving to corner, trigger completion callback
            const completionTimer = setTimeout(() => {
                setAnimationStage('complete');
                onAnimationComplete();
            }, 2500);

            return () => {
                clearTimeout(floatTimer);
                clearTimeout(completionTimer);
            };
        }
    }, [isMinted, animationStage, onAnimationComplete]);

    if (!isMinted && animationStage === 'initial') {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <div
                className={`
          relative transform transition-all duration-1000 ease-in-out
          ${animationStage === 'initial' ? 'scale-0 opacity-0' : ''}
          ${animationStage === 'floating' ? 'scale-100 opacity-100 animate-pulse' : ''}
          ${animationStage === 'moving' ? 'scale-75 opacity-90 -translate-x-full -translate-y-full' : ''}
          ${animationStage === 'complete' ? 'scale-0 opacity-0' : ''}
        `}
            >
                {/* Certificate Background */}
                <div className="w-80 h-64 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-800 rounded-lg shadow-lg border-2 border-blue-300 dark:border-blue-700 overflow-hidden">
                    {/* Certificate Header */}
                    <div className="p-4 text-center border-b border-blue-200 dark:border-blue-700">
                        <div className="text-xl font-bold text-blue-800 dark:text-blue-300">
                            {certificateTitle}
                        </div>
                    </div>

                    {/* Certificate Content */}
                    <div className="p-4 text-center">
                        <div className="mb-3 text-gray-600 dark:text-gray-300 text-sm">
                            This certificate is proudly presented to
                        </div>
                        <div className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
                            [Recipient Name]
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            For successfully completing the requirements
                        </div>
                    </div>

                    {/* Certificate Footer */}
                    <div className="absolute bottom-0 w-full p-2 bg-blue-600 dark:bg-blue-800 text-white text-xs text-center">
                        Verified on Blockchain • Tamper-Proof • Permanent
                    </div>
                </div>

                {/* Mint Effect */}
                <div className={`absolute inset-0 bg-blue-400 dark:bg-blue-600 opacity-0 rounded-lg
          ${animationStage === 'floating' ? 'animate-mint-pulse' : ''}
        `}></div>

                {/* Particles effect */}
                {animationStage === 'floating' && (
                    <>
                        <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full animate-particle-1"></div>
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-particle-2"></div>
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-purple-400 rounded-full animate-particle-3"></div>
                        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-red-400 rounded-full animate-particle-4"></div>
                    </>
                )}

                {/* Blockchain Link Visual */}
                {(animationStage === 'floating' || animationStage === 'moving') && (
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                        <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-6 h-6 bg-blue-500 dark:bg-blue-700 rounded opacity-90 animate-chain-block"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                ></div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Success Notification */}
            {animationStage === 'moving' && (
                <div className="fixed top-4 right-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded shadow-lg animate-fade-in">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Certificate Minted Successfully!</span>
                    </div>
                </div>
            )}

            {/* Overlay */}
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-1000
          ${animationStage === 'floating' ? 'opacity-30' : 'opacity-0'}
          ${animationStage === 'complete' ? 'pointer-events-none' : ''}
        `}
            ></div>
        </div>
    );
};

export default CertificateMintingAnimation;

// Add these styles to your global CSS or use a CSS-in-JS solution
// .animate-mint-pulse {
//   animation: mint-pulse 1s ease-in-out infinite;
// }
// .animate-particle-1 {
//   animation: particle-float 1.5s ease-in-out infinite;
// }
// .animate-particle-2 {
//   animation: particle-float 1.5s ease-in-out infinite 0.2s;
// }
// .animate-particle-3 {
//   animation: particle-float 1.5s ease-in-out infinite 0.4s;
// }
// .animate-particle-4 {
//   animation: particle-float 1.5s ease-in-out infinite 0.6s;
// }
// .animate-chain-block {
//   animation: chain-block 1s ease-in-out infinite;
// }
// .animate-fade-in {
//   animation: fade-in 0.5s ease-in-out forwards;
// }
// @keyframes mint-pulse {
//   0%, 100% { opacity: 0; }
//   50% { opacity: 0.5; }
// }
// @keyframes particle-float {
//   0%, 100% { transform: translateY(0) translateX(0); }
//   50% { transform: translateY(-10px) translateX(5px); }
// }
// @keyframes chain-block {
//   0%, 100% { transform: translateY(0); }
//   50% { transform: translateY(-5px); }
// }
// @keyframes fade-in {
//   from { opacity: 0; transform: translateY(-10px); }
//   to { opacity: 1; transform: translateY(0); }
// }