
import React from 'react';
import { Search } from 'lucide-react';

interface FilterPanelProps {
    className?: string;
    activeRegion?: string;
    onRegionChange?: (region: string) => void;
}

const MobileFilterBar: React.FC<FilterPanelProps> = ({ className, activeRegion = "不限", onRegionChange }) => {
    // 筛选选项，与 mockData.ts 中的 location 字段对应
    const regions = ["不限", "英国", "美国", "澳大利亚", "新加坡", "中国香港", "加拿大", "欧洲", "亚洲"];
    
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
                {regions.map((r) => (
                    <button 
                        key={r} 
                        onClick={() => onRegionChange?.(r)}
                        className={`whitespace-nowrap text-xs px-4 py-1.5 rounded-full shadow-sm transition-colors ${
                            activeRegion === r 
                            ? 'bg-purple-600 text-white font-bold' 
                            : 'bg-gray-50 text-gray-600 border border-gray-100'
                        }`}
                    >
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
