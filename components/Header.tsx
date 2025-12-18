import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

const Header: React.FC = () => {
    return (
        <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10 flex items-center justify-between px-6">
            <div className="flex items-center">
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <Menu size={24} />
                </button>
            </div>
            
            <div className="flex items-center space-x-4">
                <button className="text-gray-400 hover:text-gray-600 relative">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white transform translate-x-1/2 -translate-y-1/2"></span>
                </button>
                <div className="h-6 w-px bg-gray-200"></div>
                <div className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                    <span className="text-blue-600 mr-1">大道教育</span>
                    <span className="text-gray-300 mx-1">|</span>
                    <span>王续</span>
                    <div className="ml-2 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                        <User size={16} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;