import React from 'react';
import { 
    LayoutGrid, 
    ListOrdered, 
    GraduationCap, 
    FileText, 
    Users, 
    Send, 
    FileCheck, 
    User, 
    Settings, 
    Briefcase,
    PieChart,
    Wallet
} from 'lucide-react';

const Sidebar: React.FC = () => {
    return (
        <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 flex flex-col z-20 overflow-y-auto">
            <div className="p-6 flex items-center justify-center border-b border-gray-100">
                <div className="flex flex-col items-center">
                    <img src="https://picsum.photos/120/40" alt="Logo" className="h-10 mb-2 opacity-80" />
                    <span className="text-xs text-gray-400 font-bold tracking-widest">CONSULTANCY</span>
                </div>
            </div>

            <div className="flex-1 py-4">
                <div className="px-6 mb-2 text-xs font-semibold text-gray-400">通用</div>
                <nav className="mb-6">
                    <SidebarItem icon={<LayoutGrid size={18} />} label="总览" />
                </nav>

                <div className="px-6 mb-2 text-xs font-semibold text-gray-400">定校规划</div>
                <nav className="mb-6">
                    <SidebarItem icon={<ListOrdered size={18} />} label="排名数据库" />
                    <SidebarItem icon={<GraduationCap size={18} />} label="选校匹配" active />
                </nav>

                <div className="px-6 mb-2 text-xs font-semibold text-gray-400">文书写作</div>
                <nav className="mb-6">
                    <SidebarItem icon={<Users size={18} />} label="客户档案" />
                    <SidebarItem icon={<Send size={18} />} label="推荐信" />
                    <SidebarItem icon={<FileText size={18} />} label="简历" />
                    <SidebarItem icon={<User size={18} />} label="个人陈述" />
                </nav>
                
                 <div className="px-6 mb-2 text-xs font-semibold text-gray-400">CRM系统</div>
                <nav className="mb-6">
                    <SidebarItem icon={<PieChart size={18} />} label="数据总览" />
                    <SidebarItem icon={<Briefcase size={18} />} label="市场资源" />
                    <SidebarItem icon={<Settings size={18} />} label="签约客户" />
                </nav>
            </div>

             <div className="p-4">
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium shadow-md hover:opacity-90 transition-opacity">
                    <Wallet size={16} />
                    账户充值
                </button>
             </div>
        </div>
    );
};

const SidebarItem: React.FC<{ icon: React.ReactNode, label: string, active?: boolean }> = ({ icon, label, active }) => {
    return (
        <a href="#" className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${active ? 'bg-purple-50 text-purple-700 border-r-4 border-purple-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
            <span className="mr-3">{icon}</span>
            {label}
        </a>
    );
};

export default Sidebar;