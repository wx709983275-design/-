
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
    Check, 
    Loader2, 
    Zap,
    Download,
    FileJson,
    Trash2,
    AlertTriangle,
    Terminal,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

interface AdminDataAssistantProps {
    onSaveData?: (data: any) => void;
}

const AdminDataAssistant: React.FC<AdminDataAssistantProps> = ({ onSaveData }) => {
    const [activeTab, setActiveTab] = useState<'ai' | 'script'>('ai');
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState({ current: 0, total: 0 });
    const [finalResult, setFinalResult] = useState<any[]>([]);
    const [copied, setCopied] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [showLogs, setShowLogs] = useState(true);
    const logEndRef = useRef<HTMLDivElement>(null);

    const addLog = (msg: string) => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    useEffect(() => {
        if (logEndRef.current) {
            logEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs]);

    // 🚀 采集脚本
    const batchScraperScript = `
(async function() {
    console.clear();
    console.log("%c 🚀 大道教育 | 工业级采集引擎 v3.8 ", "color: white; background: linear-gradient(90deg, #8b5cf6, #ec4899); padding: 8px 20px; border-radius: 20px; font-weight: bold; font-size: 16px;");
    
    window._dadaoStop = false;
    const CONFIG = {
        MAX_PAGES: 2000, 
        SAVE_KEY: 'dadao_mega_data_v3',
    };

    let allResults = JSON.parse(localStorage.getItem(CONFIG.SAVE_KEY) || '[]');
    alert('采集脚本已启动。脚本将自动扫描页面并保存至本地缓存。请在采集完成后点击下载 JSON 文件。');
    
    // 自动寻找列表容器
    const items = Array.from(document.querySelectorAll('div, li, tr')).filter(el => el.innerText.trim().length > 30);
    items.forEach(el => {
        allResults.push({ text: el.innerText.replace(/\\s+/g, ' ').trim() });
    });
    
    localStorage.setItem(CONFIG.SAVE_KEY, JSON.stringify(allResults));
    console.log('✅ 已抓取 ' + items.length + ' 条数据，当前总计: ' + allResults.length);
    
    const blob = new Blob([JSON.stringify(allResults)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dadao_scraped_data.json';
    a.click();
})();
    `.trim();

    const startBatchAnalysis = async () => {
        if (!input.trim()) {
            alert("请输入JSON数据");
            return;
        }
        setLogs([]);
        setLoading(true);
        setFinalResult([]);
        addLog("🚀 开始解析流程...");

        try {
            // 1. JSON 解析
            addLog("正在验证 JSON 格式...");
            let rawData: any[] = [];
            try {
                const parsed = JSON.parse(input);
                rawData = Array.isArray(parsed) ? parsed : (parsed.data || [parsed]);
            } catch (e) {
                addLog("❌ JSON 解析失败，请检查输入格式。");
                alert('JSON 解析失败');
                setLoading(false);
                return;
            }
            addLog(`✅ 成功读取 ${rawData.length} 条原始记录`);

            // 2. 分块处理
            const CHUNK_SIZE = 10; 
            const chunks = [];
            for (let i = 0; i < rawData.length; i += CHUNK_SIZE) {
                chunks.push(rawData.slice(i, i + CHUNK_SIZE));
            }

            setProgress({ current: 0, total: chunks.length });
            const masterList: any[] = [];
            
            for (let i = 0; i < chunks.length; i++) {
                addLog(`📡 正在发送第 ${i+1}/${chunks.length} 个数据包到 AI...`);
                setProgress({ current: i + 1, total: chunks.length });
                
                // 每次新建实例确保 Key 最新且会话隔离
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                
                try {
                    const response = await ai.models.generateContent({
                        model: "gemini-3-pro-preview", // 升级为 Pro 以处理复杂嵌套
                        contents: `你是一名资深的全球留学数据转换专家。
                        请将以下抓取内容转化为精准的院校专业 JSON 数组。
                        
                        严格规则：
                        1. 只返回纯 JSON 数组，不要 Markdown 格式。
                        2. 尽可能提取：学校名(中英)、QS排名、国家、所在地、院系、专业(中英)、学位类型(Master/Bachelor)、学制、学费、雅思要求、GPA要求。
                        3. 必须包含 'nameCN' 和 'departments' 数组。

                        待处理数据：
                        ${JSON.stringify(chunks[i])}`,
                        config: { responseMimeType: "application/json" }
                    });

                    const chunkData = JSON.parse(response.text);
                    const list = Array.isArray(chunkData) ? chunkData : [chunkData];
                    
                    addLog(`✨ AI 成功解析本包中的 ${list.length} 个院校实体`);

                    list.forEach(newUni => {
                        const existingUni = masterList.find(u => u.nameCN === newUni.nameCN);
                        if (existingUni) {
                            // 合并院系
                            newUni.departments?.forEach((newDept: any) => {
                                const existingDept = (existingUni.departments || []).find((d: any) => d.name === newDept.name);
                                if (existingDept) {
                                    existingDept.programs = [...(existingDept.programs || []), ...(newDept.programs || [])];
                                } else {
                                    existingUni.departments = [...(existingUni.departments || []), newDept];
                                }
                            });
                        } else {
                            masterList.push(newUni);
                        }
                    });
                } catch (apiError: any) {
                    addLog(`⚠️ 数据包 ${i+1} 解析异常: ${apiError.message}`);
                }
                
                // 频率限制保护
                await new Promise(r => setTimeout(r, 800));
            }

            if (masterList.length === 0) {
                addLog("❌ 最终解析结果为空。");
                alert('解析结果为空，请检查输入数据的有效性');
            } else {
                addLog(`🎉 解析全部完成！合并后共计 ${masterList.length} 个院校，等待确认入库。`);
                setFinalResult(masterList);
            }

        } catch (error: any) {
            addLog(`🔴 严重错误: ${error.message}`);
            alert(`错误: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        if (finalResult.length === 0 || !onSaveData) return;
        setIsSaving(true);
        addLog("💾 正在将数据写入系统数据库...");
        
        setTimeout(() => {
            onSaveData(finalResult);
            setIsSaving(false);
            setFinalResult([]);
            setInput('');
            addLog("✅ 数据同步成功！");
            alert(`✅ 成功入库 ${finalResult.length} 个院校数据！`);
        }, 500);
    };

    return (
        <div className="space-y-4">
            <div className="flex bg-gray-100 p-1 rounded-xl">
                <button onClick={() => setActiveTab('ai')} className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'ai' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500'}`}>
                    1. 智能数据解析
                </button>
                <button onClick={() => setActiveTab('script')} className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'script' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500'}`}>
                    2. 采集脚本
                </button>
            </div>

            {activeTab === 'script' ? (
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-3 font-black text-purple-600 text-sm">
                        <FileJson size={16} /> 数据采集引擎
                    </div>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded-xl text-[8px] overflow-x-auto font-mono mb-3 h-32 opacity-80 no-scrollbar">
                        {batchScraperScript}
                    </pre>
                    <button onClick={() => { navigator.clipboard.writeText(batchScraperScript); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="w-full bg-purple-600 text-white py-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all">
                        {copied ? <Check size={18} /> : <Download size={18} />} {copied ? '脚本已复制' : '复制采集脚本'}
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                        <textarea 
                            className="w-full h-44 bg-gray-50 border border-gray-100 rounded-xl p-3 text-[10px] focus:outline-none font-mono"
                            placeholder="请在此粘贴 [采集脚本] 下载的 JSON 内容..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    
                    {/* Console Log UI */}
                    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
                        <div 
                            className="flex items-center justify-between px-3 py-2 bg-gray-800 cursor-pointer"
                            onClick={() => setShowLogs(!showLogs)}
                        >
                            <span className="text-[10px] text-gray-400 font-mono flex items-center gap-2">
                                <Terminal size={12} /> 执行日志 {loading && <Loader2 size={10} className="animate-spin text-purple-400" />}
                            </span>
                            {showLogs ? <ChevronUp size={12} className="text-gray-400" /> : <ChevronDown size={12} className="text-gray-400" />}
                        </div>
                        {showLogs && (
                            <div className="p-3 h-32 overflow-y-auto font-mono text-[9px] text-gray-300 space-y-1 no-scrollbar bg-black/50">
                                {logs.length === 0 && <div className="text-gray-600 italic">等待任务启动...</div>}
                                {logs.map((log, i) => (
                                    <div key={i} className={log.includes('❌') || log.includes('🔴') ? 'text-red-400' : log.includes('✅') || log.includes('🎉') ? 'text-green-400' : ''}>
                                        {log}
                                    </div>
                                ))}
                                <div ref={logEndRef} />
                            </div>
                        )}
                    </div>

                    {loading && (
                        <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-bold text-purple-600">AI 正在处理数据包: {progress.current}/{progress.total}</span>
                                <span className="text-[10px] text-purple-400 font-mono">{Math.round((progress.current/progress.total)*100)}%</span>
                            </div>
                            <div className="w-full bg-purple-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-purple-600 h-full transition-all duration-300 ease-out" style={{ width: `${(progress.current/progress.total)*100}%` }} />
                            </div>
                        </div>
                    )}

                    <button 
                        onClick={startBatchAnalysis} 
                        disabled={loading} 
                        className={`w-full text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900'}`}
                    >
                        {loading ? 'AI 全速解析中...' : <><Zap size={20} /> 批量合并解析</>}
                    </button>

                    {finalResult.length > 0 && !loading && (
                         <div className="bg-green-50 border border-green-100 p-4 rounded-2xl animate-in slide-in-from-bottom-2">
                             <div className="flex items-center gap-2 text-green-700 text-xs font-bold mb-3">
                                 <Check size={14} /> 解析成功！检测到 {finalResult.length} 个院校的数据包
                             </div>
                             <button onClick={handleSave} disabled={isSaving} className="w-full bg-green-600 text-white py-4 rounded-xl text-sm font-black flex items-center justify-center gap-2 shadow-lg hover:bg-green-700 transition-colors">
                                 {isSaving ? <Loader2 className="animate-spin" /> : <><Check size={18} /> 确认并同步至数据库</>}
                             </button>
                         </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDataAssistant;
