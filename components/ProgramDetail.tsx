import React from 'react';
import { Program, University, LanguageScore } from '../types';
import { ExternalLink, Globe, Flag, MapPin, Clock } from 'lucide-react';

interface ProgramDetailProps {
    program: Program;
    university: University;
}

const ProgramDetail: React.FC<ProgramDetailProps> = ({ program, university }) => {
    return (
        <div className="p-4 space-y-4 bg-gray-50/50 pb-24">
            {/* Header Info */}
            <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white border border-gray-100 rounded-xl p-2 flex items-center justify-center shadow-sm mb-3">
                     <img src={university.logo} alt={university.nameCN} className="max-w-full max-h-full object-contain" />
                </div>
                <h1 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
                    {program.nameCN}
                </h1>
                <div className="text-xs text-gray-500 mb-3 px-4">{university.nameCN} · {program.nameEN}</div>
                
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs w-full">
                    <span className="flex items-center text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        <MapPin size={10} className="mr-1" /> {university.location}
                    </span>
                    <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded font-bold border border-yellow-100">
                        QS {university.qsRanking}
                    </span>
                     <a href="#" className="text-blue-600 flex items-center bg-blue-50 px-2 py-1 rounded">
                        <ExternalLink size={10} className="mr-1" /> 官网
                    </a>
                </div>
            </div>

            {/* Basic Info Grid */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
                 <h3 className="flex items-center text-sm font-bold text-gray-800 mb-3">
                    <span className="mr-2 text-purple-500">▍</span> 基本信息
                </h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                    <InfoItem label="专业方向" value={program.faculty} />
                    <InfoItem label="学位类型" value={program.degreeType} />
                    <InfoItem label="项目时长" value={program.duration} />
                    <InfoItem label="学费" value={program.tuition} />
                    <InfoItem label="所属学院" value={program.school} fullWidth />
                </div>
            </div>

            {/* Program Goal / Description */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="flex items-center text-sm font-bold text-gray-800 mb-3">
                    <span className="mr-2 text-purple-500">▍</span> 专业目标
                </h3>
                <p className="text-xs text-gray-600 leading-6 text-justify">
                    {program.description}
                </p>
            </div>
            
             {/* Career & Highlights */}
             {(program.highlights || program.career) && (
                 <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
                    {program.highlights && (
                        <div>
                             <h3 className="flex items-center text-sm font-bold text-gray-800 mb-2">
                                招生特点
                            </h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                {program.highlights}
                            </p>
                        </div>
                    )}
                    {program.career && (
                        <div>
                             <h3 className="flex items-center text-sm font-bold text-gray-800 mb-2">
                                就业服务
                            </h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                {program.career.replace('就业服务：', '')}
                            </p>
                        </div>
                    )}
                 </div>
             )}
             
            {/* Curriculum */}
            {program.curriculum.length > 0 && (
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="flex items-center text-sm font-bold text-gray-800">
                             <span className="mr-2 text-purple-500">▍</span> 课程设置
                        </h3>
                        <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">{program.curriculum.length}门课</span>
                    </div>

                    <div className="space-y-2">
                        {program.curriculum.map((c, i) => (
                            <div key={i} className="flex justify-between items-start p-2.5 bg-gray-50 rounded-lg">
                                <div>
                                    <div className="text-xs font-bold text-gray-700 mb-0.5">{c.nameCN}</div>
                                    <div className="text-[10px] text-gray-400">{c.nameEN}</div>
                                </div>
                                <span className="text-[10px] px-1.5 py-0.5 bg-white text-gray-400 rounded border border-gray-100 shrink-0 ml-2">
                                    {c.type}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

             {/* Application Rounds */}
             <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="flex items-center text-sm font-bold text-gray-800 mb-3">
                    <span className="mr-2 text-purple-500">▍</span> 申请时间
                </h3>
                <div className="mb-3 inline-flex items-center text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                     <Clock size={12} className="mr-1"/>
                     26年秋季入学
                </div>
                <div className="space-y-2">
                    {program.rounds.map((round, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 border border-gray-100 rounded-lg bg-gray-50">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-gray-800">{round.name}</span>
                                <span className="text-[10px] text-gray-400 mt-0.5">{round.date}</span>
                            </div>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                round.status === 'closed' ? 'bg-gray-200 text-gray-500' : 
                                round.status === 'open' ? 'bg-green-100 text-green-600' : 'bg-yellow-50 text-yellow-600'
                            }`}>
                                {round.status === 'closed' ? '已截止' : round.status === 'open' ? '开放申请' : '未开始'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Requirements */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="flex items-center text-sm font-bold text-gray-800 mb-4">
                     <span className="mr-2 text-purple-500">▍</span> 申请要求
                </h3>
                
                <div className="space-y-6">
                    {/* Language Requirements */}
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">语言要求</h4>
                        <div className="space-y-3">
                            {program.requirements.ielts && (
                                <LanguageCard title="雅思 IELTS" icon={<Globe size={14}/>} scoreData={program.requirements.ielts} />
                            )}
                            {program.requirements.toefl && (
                                <LanguageCard title="托福 TOEFL" icon={<Flag size={14}/>} scoreData={program.requirements.toefl} />
                            )}
                        </div>
                    </div>

                    {/* Documents */}
                    {program.requirements.documents && program.requirements.documents.length > 0 && (
                        <div>
                             <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">文书要求</h4>
                             <ul className="list-disc list-outside ml-3 space-y-1.5 text-xs text-gray-600">
                                 {program.requirements.documents.map((doc, idx) => (
                                     <li key={idx} className="pl-1 leading-relaxed">{doc}</li>
                                 ))}
                             </ul>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Bottom Safe Area Spacer */}
            <div className="h-4"></div>
        </div>
    );
};

const InfoItem: React.FC<{ label: string; value: string; fullWidth?: boolean }> = ({ label, value, fullWidth }) => (
    <div className={`flex flex-col ${fullWidth ? 'col-span-2' : ''}`}>
        <span className="text-[10px] text-gray-400 mb-0.5">{label}</span>
        <span className="text-xs text-gray-800 font-bold break-words">{value}</span>
    </div>
);

const LanguageCard: React.FC<{ title: string, icon: React.ReactNode, scoreData: LanguageScore }> = ({ title, icon, scoreData }) => (
    <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
        <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1.5 text-purple-700 font-bold text-xs">
                {icon}
                {title}
            </div>
            <div className="text-right flex items-baseline gap-1">
                <span className="text-[10px] text-purple-400">Total</span>
                <span className="text-lg font-bold text-purple-700 leading-none">{scoreData.total}</span>
            </div>
        </div>
        <div className="grid grid-cols-4 gap-1 pt-2 border-t border-purple-100/50">
             <ScoreItem label="听" value={scoreData.listening} />
             <ScoreItem label="读" value={scoreData.reading} />
             <ScoreItem label="写" value={scoreData.writing} />
             <ScoreItem label="说" value={scoreData.speaking} />
        </div>
    </div>
);

const ScoreItem: React.FC<{ label: string, value?: string }> = ({ label, value }) => (
    <div className="text-center bg-white/50 rounded py-1">
        <span className="text-[10px] text-gray-400 block transform scale-90">{label}</span>
        <span className="text-xs font-bold text-gray-700">{value || '-'}</span>
    </div>
);

export default ProgramDetail;