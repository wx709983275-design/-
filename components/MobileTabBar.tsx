import React from 'react';
import { Home, Compass, User, FileText } from 'lucide-react';

interface MobileTabBarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const MobileTabBar: React.FC<MobileTabBarProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center pb-[env(safe-area-inset-bottom)] pt-2 z-50">
            <TabItem 
                icon={<Home size={24} />} 
                label="首页" 
                isActive={activeTab === 'home'} 
                onClick={() => onTabChange('home')} 
            />
            <TabItem 
                icon={<Compass size={24} />} 
                label="选校" 
                isActive={activeTab === 'select'} 
                onClick={() => onTabChange('select')} 
            />
            <TabItem 
                icon={<FileText size={24} />} 
                label="申请" 
                isActive={activeTab === 'apply'} 
                onClick={() => onTabChange('apply')} 
            />
            <TabItem 
                icon={<User size={24} />} 
                label="我的" 
                isActive={activeTab === 'profile'} 
                onClick={() => onTabChange('profile')} 
            />
        </div>
    );
};

const TabItem: React.FC<{ icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }> = ({ icon, label, isActive, onClick }) => {
    return (
        <button 
            onClick={onClick}
            className={`flex flex-col items-center justify-center w-full space-y-1 ${isActive ? 'text-purple-600' : 'text-gray-400'}`}
        >
            <div className="transform transition-transform active:scale-90">
                {icon}
            </div>
            <span className="text-[10px] font-medium">{label}</span>
        </button>
    );
};

export default MobileTabBar;