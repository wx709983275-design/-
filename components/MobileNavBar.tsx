import React from 'react';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';

interface MobileNavBarProps {
    title: string;
    showBack?: boolean;
    onBack?: () => void;
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({ title, showBack, onBack }) => {
    return (
        <div className="fixed top-0 left-0 right-0 h-12 bg-white flex items-center justify-between px-3 z-50 border-b border-gray-100 shadow-sm">
            <div className="flex items-center w-1/4">
                {showBack && (
                    <button 
                        onClick={onBack} 
                        className="p-1 -ml-1 active:bg-gray-100 rounded-full transition-colors"
                    >
                        <ChevronLeft size={24} className="text-gray-800" />
                    </button>
                )}
            </div>
            
            <div className="flex-1 text-center font-bold text-gray-800 text-base truncate px-2">
                {title}
            </div>
            
            <div className="w-1/4 flex justify-end">
                {/* Simulated WeChat 'Capsule' button placeholder or similar */}
                <div className="w-[80px] h-[30px] rounded-full border border-gray-200 bg-white/50 flex items-center justify-center gap-3 px-3">
                   <div className="w-1 h-1 bg-black rounded-full"></div>
                   <div className="w-[1px] h-4 bg-gray-200"></div>
                   <div className="w-4 h-4 rounded-full border-2 border-gray-800"></div>
                </div>
            </div>
        </div>
    );
};

export default MobileNavBar;