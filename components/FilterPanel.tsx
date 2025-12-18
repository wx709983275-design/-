import React from 'react';
import { Search } from 'lucide-react';

interface FilterPanelProps {
    className?: string;
}

const MobileFilterBar: React.FC<FilterPanelProps> = ({ className }) => {
    const regions = ["不限", "英国", "新加坡", "中国香港", "美国", "澳洲", "加拿大"];
    
    return (
        <div className={`bg-white sticky top-12 z-40 pb-2 ${className}`}>
             {/* Search */}
             <div className="px-4 py-3">
                <div className="bg-gray-100 rounded-full flex items-center px-4 py-2">
                    <Search size={16} className="text-gray-400 mr-2" />
                    <input 
                        type="text" 
                        placeholder="搜索学校 / 专业" 
                        className="bg-transparent border-none outline-none text-sm w-full text-gray-700"
                    />
                </div>
            </div>

            {/* Tags */}
            <div className="flex overflow-x-auto px-4 gap-2 no-scrollbar pb-2">
                <button className="whitespace-nowrap bg-purple-600 text-white text-xs px-4 py-1.5 rounded-full shadow-sm">
                    全部地区
                </button>
                {regions.slice(1).map((r, i) => (
                    <button key={i} className="whitespace-nowrap bg-gray-50 text-gray-600 text-xs px-4 py-1.5 rounded-full border border-gray-100">
                        {r}
                    </button>
                ))}
            </div>
            
            <div className="flex items-center justify-between px-4 mt-2 text-xs text-gray-400 border-b border-gray-50 pb-2">
                 <span>排序: QS排名</span>
                 <span>筛选: 硕士</span>
            </div>
        </div>
    );
};

export default MobileFilterBar;