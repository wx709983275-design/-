import React, { useEffect } from 'react';
import { X, Maximize2 } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center text-white shrink-0">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <span className="bg-white/20 p-1.5 rounded-lg">🎓</span>
                            {title}
                        </h2>
                        <p className="text-xs text-blue-100 mt-1 ml-10">详细了解专业信息与申请要求</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-1 hover:bg-white/20 rounded-full transition-colors">
                            <Maximize2 size={18} />
                        </button>
                        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto bg-gray-50 custom-scrollbar">
                   {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;