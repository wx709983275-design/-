
import React, { useState, useRef, useEffect } from 'react';
import MobileNavBar from './components/MobileNavBar';
import MobileTabBar from './components/MobileTabBar';
import MobileFilterBar from './components/FilterPanel';
import ProgramDetail from './components/ProgramDetail';
import AdminDataAssistant from './components/AdminDataAssistant';
import { universities as initialUniversities, homeCarouselData, latestNewsData, admissionsActivitiesData, ieltsCoursesData, applicationStatusData, languageInstitutions, sinoForeignPrograms, studentCases } from './mockData';
import { University, Department, Program, LanguageInstitution, LanguageCourse, SinoForeignProgram, StudentCase } from './types';
import { 
    ChevronRight, 
    MapPin, 
    GraduationCap, 
    Bell, 
    Upload, 
    FileCheck, 
    Users, 
    Calendar, 
    Video, 
    ArrowRight, 
    Plus, 
    Heart, 
    Trash2,
    LayoutList,
    Check,
    Send,
    User,
    Settings,
    ShieldCheck,
    RefreshCw,
    Sparkles,
    Trophy,
    BookOpen,
    Globe,
    Megaphone,
    Microscope,
    Handshake,
    CloudUpload,
    Paperclip,
    X,
    Clock,
    MessageSquare,
    Filter,
    School,
    Plane,
    Award,
    Briefcase,
    FileText
} from 'lucide-react';

// ==========================================
// App Main Component
// ==========================================

type Screen = 
  | { id: 'root', title: string }
  | { id: 'depts', title: string, university: University }
  | { id: 'progs', title: string, university: University, department: Department }
  | { id: 'detail', title: '专业详情', university: University, program: Program }
  | { id: 'plan', title: '我的申请计划' }
  | { id: 'language_institutions', title: '语言培训机构' }
  | { id: 'language_institution_detail', title: string, institution: LanguageInstitution }
  | { id: 'sino_foreign', title: '中外合办项目' }
  | { id: 'success_cases', title: '名校录取案例' }
  | { id: 'case_detail', title: '学生档案', studentCase: StudentCase };

interface PlanItem {
    university: University;
    program: Program;
}

function App() {
  const [navStack, setNavStack] = useState<Screen[]>([{ id: 'root', title: '大道教育' }]);
  const [activeTab, setActiveTab] = useState('home');
  const [applyTab, setApplyTab] = useState<'form' | 'status'>('form');
  const [applicationPlan, setApplicationPlan] = useState<PlanItem[]>([]);
  
  const [dynamicUniversities, setDynamicUniversities] = useState<University[]>(() => {
      const saved = localStorage.getItem('dadao_full_database');
      if (saved) {
          try {
              return JSON.parse(saved);
          } catch(e) { return initialUniversities; }
      }
      return initialUniversities;
  });

  const saveNewData = (extractedData: any[]) => {
      try {
          setDynamicUniversities(prev => {
              const newUnis = [...prev];
              extractedData.forEach(item => {
                  const fullUni: University = {
                      id: item.id || `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                      nameCN: item.nameCN,
                      nameEN: item.nameEN,
                      location: item.location || '未知',
                      country: item.country || '其他',
                      logo: item.logo || 'https://picsum.photos/100/100',
                      qsRanking: item.qsRanking || 999,
                      departments: item.departments?.map((d: any) => ({
                          id: d.id || `d-${Math.random().toString(36).substr(2, 5)}`,
                          name: d.name || '综合院系',
                          programCount: d.programs?.length || 0,
                          programs: d.programs?.map((p: any) => ({
                              ...p,
                              id: p.id || `p-${Math.random().toString(36).substr(2, 5)}`,
                              degreeType: p.degreeType || 'Master',
                              faculty: p.faculty || d.name,
                              school: p.school || d.name,
                              duration: p.duration || '1年',
                              tuition: p.tuition || '待更新',
                              applicationFee: p.applicationFee || '待定',
                              description: p.description || '项目详情正在收录中。',
                              rounds: p.rounds || [],
                              requirements: p.requirements || { gpa: '不限', background: '不限' },
                              curriculum: p.curriculum || [],
                              career: p.career || '',
                              highlights: p.highlights || ''
                          }))
                      })) || []
                  };

                  const idx = newUnis.findIndex(u => u.nameCN === fullUni.nameCN);
                  if (idx === -1) {
                      newUnis.push(fullUni);
                  } else {
                      // 合并逻辑：保留原有的 ID，更新内容
                      newUnis[idx] = { ...newUnis[idx], ...fullUni, id: newUnis[idx].id };
                  }
              });
              const sorted = [...newUnis].sort((a, b) => a.qsRanking - b.qsRanking);
              localStorage.setItem('dadao_full_database', JSON.stringify(sorted));
              return sorted;
          });
      } catch (err) {
          console.error("Failed to save data:", err);
          alert("入库失败：数据量过大，浏览器存储空间已满。");
      }
  };

  const resetData = () => {
      if(confirm('确定要恢复出厂设置吗？这将清除所有已导入的数据。')) {
          localStorage.removeItem('dadao_full_database');
          setDynamicUniversities(initialUniversities);
          window.location.reload();
      }
  };

  const currentScreen = navStack[navStack.length - 1];
  const pushScreen = (screen: Screen) => { setNavStack(prev => [...prev, screen]); window.scrollTo(0,0); };
  const popScreen = () => { if (navStack.length > 1) { setNavStack(prev => prev.slice(0, -1)); window.scrollTo(0,0); } };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    let title = '大道教育';
    if(tab === 'select') title = '选校中心';
    if(tab === 'apply') title = '申请管理';
    if(tab === 'profile') title = '管理中心';
    setNavStack([{ id: 'root', title }]);
  }
  
  // Specific handler to jump to apply form
  const handleNavigateToApply = () => {
      setActiveTab('apply');
      setApplyTab('form');
      setNavStack([{ id: 'root', title: '申请管理' }]);
      window.scrollTo(0, 0);
  };

  const addToPlan = (uni: University, prog: Program) => {
      if (applicationPlan.some(p => p.program.id === prog.id)) return;
      setApplicationPlan(prev => [...prev, { university: uni, program: prog }]);
  }

  const removeFromPlan = (progId: string) => { setApplicationPlan(prev => prev.filter(p => p.program.id !== progId)); }

  const renderRootContent = () => {
      switch(activeTab) {
          case 'home': return <HomeView pushScreen={pushScreen} onNavigateToSelect={() => handleTabChange('select')} onNavigateToApply={handleNavigateToApply} />;
          case 'select': return <UniversityListView pushScreen={pushScreen} planCount={applicationPlan.length} unis={dynamicUniversities} />;
          case 'apply': return <ApplyView applyTab={applyTab} setApplyTab={setApplyTab} />;
          case 'profile': return (
              <div className="px-4 py-6 space-y-6 pb-32">
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600"><User size={32} /></div>
                          <div>
                              <h2 className="font-bold text-xl text-gray-800 flex items-center gap-1.5">数据管理面板 <ShieldCheck size={16} className="text-green-500" /></h2>
                              <p className="text-xs text-gray-400">支持 AI 批量导入与全量数据持久化</p>
                          </div>
                      </div>
                      <button onClick={resetData} className="p-2 bg-red-50 text-red-400 rounded-full hover:bg-red-100 transition-colors" title="恢复出厂设置"><RefreshCw size={20} /></button>
                  </div>
                  <AdminDataAssistant onSaveData={saveNewData} />
              </div>
          );
          default: return null;
      }
  }

  const renderContent = () => {
    if (currentScreen.id !== 'root') {
        switch (currentScreen.id) {
            case 'depts': return <DepartmentListView screen={currentScreen} pushScreen={pushScreen} />;
            case 'progs': return <ProgramListView screen={currentScreen} pushScreen={pushScreen} addToPlan={addToPlan} plan={applicationPlan} />;
            case 'detail': return <ProgramDetailView screen={currentScreen} />;
            case 'plan': return <ApplicationPlanView plan={applicationPlan} removeFromPlan={removeFromPlan} pushScreen={pushScreen} onStartApply={handleNavigateToApply} />;
            case 'language_institutions': return <LanguageInstitutionListView pushScreen={pushScreen} />;
            case 'language_institution_detail': return <LanguageInstitutionDetailView screen={currentScreen} />;
            case 'sino_foreign': return <SinoForeignProgramListView />;
            case 'success_cases': return <SuccessCaseListView pushScreen={pushScreen} />;
            case 'case_detail': return <SuccessCaseDetailView screen={currentScreen} />;
            default: return null;
        }
    }
    return <div className="pb-20 pt-12">{renderRootContent()}</div>;
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <MobileNavBar title={currentScreen.title} showBack={navStack.length > 1} onBack={popScreen} />
      <main className="animate-in fade-in duration-200">{renderContent()}</main>
      {navStack.length === 1 && <MobileTabBar activeTab={activeTab} onTabChange={handleTabChange} />}
    </div>
  );
}

// 首页组件
const HomeView: React.FC<{ pushScreen: any; onNavigateToSelect: () => void; onNavigateToApply: () => void; }> = ({ pushScreen, onNavigateToSelect, onNavigateToApply }) => {
    const quickEntries = [
        { label: '开始申请', icon: <Send className="text-blue-600" />, color: 'bg-blue-50' },
        { label: '语言培训', icon: <BookOpen className="text-orange-500" />, color: 'bg-orange-50' },
        { label: '科研背提', icon: <Microscope className="text-purple-600" />, color: 'bg-purple-50' },
        { label: '中外合办', icon: <Handshake className="text-green-600" />, color: 'bg-green-50' },
        { label: '名校案例', icon: <FileCheck className="text-indigo-500" />, color: 'bg-indigo-50' },
    ];

    const handleEntryClick = (entry: any) => {
        if (entry.label === '开始申请') {
            onNavigateToApply();
        } else if (entry.label === '科研背提') {
            // 模拟跳转小程序
            if(window.confirm("即将跳转至「科研鲸」小程序，是否继续？")) {
                console.log("Navigating to Research Whale Mini Program");
            }
        } else if (entry.label === '语言培训') {
            pushScreen({ id: 'language_institutions', title: '语言培训' });
        } else if (entry.label === '中外合办') {
            pushScreen({ id: 'sino_foreign', title: '中外合办' });
        } else if (entry.label === '名校案例') {
            pushScreen({ id: 'success_cases', title: '名校录取案例' });
        } else {
            onNavigateToSelect();
        }
    };

    return (
        <div className="space-y-6 pb-12">
            {/* Banner Carousel */}
            <div className="relative w-full h-64 bg-gray-200 overflow-hidden">
                <div className="flex overflow-x-auto snap-x snap-mandatory h-full no-scrollbar">
                    {homeCarouselData.map((slide) => (
                        <div key={slide.id} className="w-full shrink-0 snap-center relative">
                            <img src={slide.image} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-purple-600 text-[10px] text-white font-black px-2 py-0.5 rounded uppercase tracking-wider">Featured</span>
                                    <span className="bg-white/20 backdrop-blur-md text-[10px] text-white font-bold px-2 py-0.5 rounded">2026 Fall</span>
                                </div>
                                <div className="font-black text-2xl text-white mb-1 drop-shadow-md leading-tight">{slide.title}</div>
                                <div className="text-sm text-gray-200 font-medium">{slide.subtitle}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Entries */}
            <div className="px-3">
                <div className="grid grid-cols-5 gap-2 bg-white p-4 rounded-3xl shadow-sm border border-gray-50">
                    {quickEntries.map((entry, idx) => (
                        <button key={idx} onClick={() => handleEntryClick(entry)} className="flex flex-col items-center gap-1.5">
                            <div className={`w-12 h-12 ${entry.color} rounded-2xl flex items-center justify-center shadow-inner transition-transform active:scale-90`}>
                                {React.cloneElement(entry.icon as any, { size: 24 })}
                            </div>
                            <span className="text-[10px] font-black text-gray-600 truncate w-full text-center scale-90">{entry.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* News Ticker - Renamed to Study Abroad News (Now Horizontal List) */}
            <div className="px-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-gray-900 text-lg flex items-center gap-2">
                        <Megaphone size={20} className="text-orange-600" /> 留学资讯
                    </h3>
                    <button className="text-[10px] font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">查看全部</button>
                </div>
                 <div className="flex overflow-x-auto gap-4 no-scrollbar pb-2">
                    {latestNewsData.map((news) => (
                        <div key={news.id} className="min-w-[240px] bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-50 transition-transform active:scale-95">
                            <div className="relative h-32">
                                <img src={news.image} className="w-full h-full object-cover" />
                                <div className="absolute top-3 left-3">
                                    <span className="bg-white/90 backdrop-blur-md text-[10px] text-gray-800 font-black px-2 py-1 rounded-lg shadow-sm">
                                        {news.tag}
                                    </span>
                                </div>
                            </div>
                            <div className="p-3">
                                <h4 className="font-black text-xs text-gray-800 line-clamp-2 mb-2 leading-relaxed">{news.title}</h4>
                                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                                   {news.date}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Admissions Activities - Moved Up */}
            <div className="px-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-gray-900 text-lg flex items-center gap-2">
                        <Calendar size={20} className="text-blue-600" /> 官方招生宣讲
                    </h3>
                    <button className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">查看全部</button>
                </div>
                <div className="flex overflow-x-auto gap-4 no-scrollbar pb-2">
                    {admissionsActivitiesData.map((activity) => (
                        <div key={activity.id} className="min-w-[260px] bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-50 transition-transform active:scale-95">
                            <div className="relative h-32">
                                <img src={activity.image} className="w-full h-full object-cover" />
                                <div className="absolute top-3 left-3 flex gap-2">
                                    <span className="bg-white/90 backdrop-blur-md text-[10px] text-gray-800 font-black px-2 py-1 rounded-lg shadow-sm">
                                        {activity.type}
                                    </span>
                                    <span className={`text-[10px] font-black px-2 py-1 rounded-lg shadow-sm ${activity.status === '预约中' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                                        {activity.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-3">
                                <div className="text-[10px] font-bold text-blue-600 mb-0.5">{activity.school}</div>
                                <h4 className="font-black text-xs text-gray-800 line-clamp-1 mb-2">{activity.title}</h4>
                                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold bg-gray-50 p-2 rounded-xl">
                                    <Video size={12} /> {activity.date}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Language Training Section - Moved Down */}
            <div className="px-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-gray-900 text-lg flex items-center gap-2">
                        <BookOpen size={20} className="text-purple-600" /> 语言培训项目
                    </h3>
                    <button className="text-[10px] font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">查看全部</button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    {ieltsCoursesData.slice(0, 3).map((course) => (
                        <div key={course.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-50 flex gap-3 active:scale-[0.99] transition-transform">
                            <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 relative">
                                <img src={course.image} className="w-full h-full object-cover" />
                                <div className="absolute top-0 left-0 bg-purple-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-br-lg">HOT</div>
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-0.5">
                                <div>
                                    <h4 className="font-black text-sm text-gray-800 mb-1">{course.title}</h4>
                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                        {course.tags.map((tag, i) => (
                                            <span key={i} className="text-[9px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-end justify-between">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-orange-500 font-black text-sm">{course.price}</span>
                                        {course.originalPrice && <span className="text-[9px] text-gray-300 line-through font-bold">{course.originalPrice}</span>}
                                    </div>
                                    <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-md">
                                        立即预约
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SuccessCaseListView: React.FC<{ pushScreen: any }> = ({ pushScreen }) => {
    const [selectedCountry, setSelectedCountry] = useState('全部');
    const [selectedUni, setSelectedUni] = useState('全部');
    const [selectedMajor, setSelectedMajor] = useState('全部');

    // Extract unique values for filters
    const countries = ['全部', ...Array.from(new Set(studentCases.map(c => c.admitCountry)))];
    
    // Filtered lists for dependent dropdowns
    const availableUnis = selectedCountry === '全部' 
        ? studentCases 
        : studentCases.filter(c => c.admitCountry === selectedCountry);
    const universities = ['全部', ...Array.from(new Set(availableUnis.map(c => c.admitUniversity)))];
    
    const availableMajors = selectedUni === '全部' 
        ? availableUnis 
        : availableUnis.filter(c => c.admitUniversity === selectedUni);
    const majors = ['全部', ...Array.from(new Set(availableMajors.map(c => c.admitMajor)))];

    const filteredCases = studentCases.filter(c => {
        const matchCountry = selectedCountry === '全部' || c.admitCountry === selectedCountry;
        const matchUni = selectedUni === '全部' || c.admitUniversity === selectedUni;
        const matchMajor = selectedMajor === '全部' || c.admitMajor === selectedMajor;
        return matchCountry && matchUni && matchMajor;
    });

    return (
        <div className="pt-16 pb-24 h-screen flex flex-col">
            {/* Header */}
            <div className="px-4 mb-4 shrink-0">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 rounded-3xl shadow-lg text-white relative overflow-hidden">
                     <FileCheck size={100} className="absolute -bottom-4 -right-4 opacity-10" />
                     <h2 className="text-xl font-black mb-1 flex items-center gap-2 relative z-10"><Award size={20} /> 名校录取案例</h2>
                     <p className="text-xs text-white/80 font-medium relative z-10">真实数据 · 深度解析 · 申请参考</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white sticky top-12 z-10 px-4 py-3 shadow-sm shrink-0 border-b border-gray-50 space-y-3">
                 {/* Country Filter */}
                 <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                    <span className="text-[10px] font-bold text-gray-400 shrink-0">国家</span>
                    {countries.map(c => (
                        <button 
                            key={c} 
                            onClick={() => { setSelectedCountry(c); setSelectedUni('全部'); setSelectedMajor('全部'); }} 
                            className={`text-[10px] px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors ${selectedCountry === c ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 text-gray-600'}`}
                        >
                            {c}
                        </button>
                    ))}
                 </div>

                 {/* University Filter */}
                 <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                    <span className="text-[10px] font-bold text-gray-400 shrink-0">院校</span>
                    {universities.map(u => (
                        <button 
                            key={u} 
                            onClick={() => { setSelectedUni(u); setSelectedMajor('全部'); }}
                            className={`text-[10px] px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors ${selectedUni === u ? 'bg-purple-100 text-purple-700' : 'bg-gray-50 text-gray-600'}`}
                        >
                            {u}
                        </button>
                    ))}
                 </div>

                 {/* Major Filter */}
                 <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                    <span className="text-[10px] font-bold text-gray-400 shrink-0">专业</span>
                    {majors.map(m => (
                        <button 
                            key={m} 
                            onClick={() => setSelectedMajor(m)} 
                            className={`text-[10px] px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors ${selectedMajor === m ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-600'}`}
                        >
                            {m}
                        </button>
                    ))}
                 </div>
            </div>

            {/* List */}
            <div className="px-4 pt-4 space-y-4 overflow-y-auto flex-1 pb-10">
                {filteredCases.length > 0 ? filteredCases.map(c => (
                    <div key={c.id} onClick={() => pushScreen({ id: 'case_detail', title: '学生档案', studentCase: c })} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-50 active:scale-[0.99] transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-blue-50 text-blue-600 text-[10px] font-black px-3 py-1 rounded-bl-xl">{c.admitYear} Offer</div>
                        
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl p-2 flex items-center justify-center shrink-0 shadow-inner">
                                <img src={c.admitUniversityLogo} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-lg font-black text-gray-900 truncate">{c.admitUniversity}</div>
                                <div className="text-xs text-gray-500 font-bold truncate">{c.admitMajor}</div>
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-xl p-3 mb-3 border border-gray-100">
                             <div className="flex justify-between items-center mb-1">
                                 <span className="text-[10px] text-gray-400 font-bold">申请背景</span>
                                 <span className="text-[10px] text-gray-800 font-black">{c.studentName}</span>
                             </div>
                             <div className="text-xs font-bold text-gray-700 truncate">
                                 {c.undergradUniversity} · {c.undergradMajor}
                             </div>
                             <div className="flex gap-2 mt-1">
                                 <span className="text-[10px] bg-white border border-gray-200 px-1.5 rounded text-gray-500">GPA {c.gpa}</span>
                                 <span className="text-[10px] bg-white border border-gray-200 px-1.5 rounded text-gray-500">{c.languageScore}</span>
                             </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                            {c.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <Filter size={32} className="mb-2 opacity-20" />
                        <p className="text-xs">没有找到符合条件的录取案例</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const SuccessCaseDetailView: React.FC<{ screen: any }> = ({ screen }) => {
    const c = screen.studentCase as StudentCase;
    
    return (
        <div className="pt-16 pb-24 px-4 space-y-4">
             {/* Offer Card */}
             <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full opacity-50"></div>
                 <div className="flex flex-col items-center text-center relative z-10">
                     <div className="w-20 h-20 bg-white border-2 border-blue-50 rounded-2xl p-2 flex items-center justify-center shadow-md mb-4">
                         <img src={c.admitUniversityLogo} className="w-full h-full object-contain" />
                     </div>
                     <div className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2">OFFER CONFIRMED</div>
                     <h2 className="text-xl font-black text-gray-900 leading-tight mb-1">{c.admitUniversity}</h2>
                     <p className="text-sm text-gray-500 font-bold mb-2">{c.admitMajor}</p>
                     <div className="flex items-center gap-2 text-[10px] text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">
                         <Calendar size={10} />
                         {c.admitYear} 入学
                     </div>
                 </div>
             </div>

             {/* Hard Background */}
             <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50">
                 <h3 className="text-sm font-black text-gray-800 mb-4 flex items-center gap-2">
                     <span className="w-1 h-4 bg-purple-600 rounded-full"></span>
                     硬性背景
                 </h3>
                 <div className="grid grid-cols-2 gap-3">
                     <div className="bg-gray-50 p-3 rounded-2xl">
                         <div className="text-[10px] text-gray-400 mb-0.5">本科院校</div>
                         <div className="text-xs font-black text-gray-800">{c.undergradUniversity}</div>
                     </div>
                     <div className="bg-gray-50 p-3 rounded-2xl">
                         <div className="text-[10px] text-gray-400 mb-0.5">本科专业</div>
                         <div className="text-xs font-black text-gray-800">{c.undergradMajor}</div>
                     </div>
                     <div className="bg-gray-50 p-3 rounded-2xl">
                         <div className="text-[10px] text-gray-400 mb-0.5">GPA/均分</div>
                         <div className="text-xs font-black text-gray-800">{c.gpa}</div>
                     </div>
                     <div className="bg-gray-50 p-3 rounded-2xl">
                         <div className="text-[10px] text-gray-400 mb-0.5">语言成绩</div>
                         <div className="text-xs font-black text-gray-800">{c.languageScore}</div>
                     </div>
                     {c.greGmat && (
                         <div className="bg-gray-50 p-3 rounded-2xl col-span-2">
                             <div className="text-[10px] text-gray-400 mb-0.5">GRE/GMAT</div>
                             <div className="text-xs font-black text-gray-800">{c.greGmat}</div>
                         </div>
                     )}
                 </div>
             </div>

             {/* Soft Background */}
             <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50">
                 <h3 className="text-sm font-black text-gray-800 mb-4 flex items-center gap-2">
                     <span className="w-1 h-4 bg-orange-500 rounded-full"></span>
                     软性背景
                 </h3>
                 
                 {c.research.length > 0 && (
                     <div className="mb-4">
                         <h4 className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1"><Microscope size={12}/> 科研经历</h4>
                         <ul className="space-y-2">
                             {c.research.map((item, i) => (
                                 <li key={i} className="text-xs text-gray-700 bg-orange-50/50 p-2.5 rounded-xl border border-orange-100/50 leading-relaxed">
                                     {item}
                                 </li>
                             ))}
                         </ul>
                     </div>
                 )}

                 {c.internship.length > 0 && (
                     <div>
                         <h4 className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1"><Briefcase size={12}/> 实习经历</h4>
                         <ul className="space-y-2">
                             {c.internship.map((item, i) => (
                                 <li key={i} className="text-xs text-gray-700 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100/50 leading-relaxed">
                                     {item}
                                 </li>
                             ))}
                         </ul>
                     </div>
                 )}
             </div>

             {/* Advisor Comment */}
             <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-5 shadow-lg text-white">
                 <h3 className="text-sm font-black mb-3 flex items-center gap-2 text-yellow-400">
                     <Sparkles size={14} /> 顾问点评
                 </h3>
                 <p className="text-xs leading-relaxed opacity-90 italic">
                     "{c.advisorComment}"
                 </p>
                 <div className="mt-4 flex justify-end">
                     <button className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md transition-colors">
                         咨询同款方案
                     </button>
                 </div>
             </div>
        </div>
    );
};

const UniversityListView: React.FC<{ pushScreen: any; planCount: number; unis: University[] }> = ({ pushScreen, planCount, unis }) => {
    const [selectedRegion, setSelectedRegion] = useState('不限');

    const filteredUnis = unis.filter(uni => {
        if (selectedRegion === '不限') return true;
        
        if (selectedRegion === '欧洲') {
            return ['瑞士', '法国', '德国', '荷兰', '爱尔兰', '意大利', '西班牙'].some(c => uni.location.includes(c));
        }
        if (selectedRegion === '亚洲') {
            return ['中国', '日本', '韩国'].some(c => uni.location === c || uni.country === c);
        }
        
        return uni.location.includes(selectedRegion);
    });

    return (
        <div className="">
            <MobileFilterBar activeRegion={selectedRegion} onRegionChange={setSelectedRegion} />
            <div className="px-3 py-2">
                <div onClick={() => pushScreen({ id: 'plan', title: '我的申请计划' })} className="bg-gradient-to-r from-purple-600 to-indigo-600 p-5 rounded-3xl shadow-lg flex items-center justify-between mb-4 overflow-hidden relative">
                    <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4"><Heart size={120} /></div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md"><Heart size={24} className="text-white fill-white" /></div>
                        <div><h3 className="text-white font-black text-base">我的申请计划</h3><p className="text-white/70 text-[10px] mt-0.5 font-medium">已加入 {planCount} 个项目</p></div>
                    </div>
                    <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-md relative z-10"><ChevronRight size={20} className="text-white" /></div>
                </div>
                <div className="space-y-3">
                  {filteredUnis.length > 0 ? filteredUnis.map(uni => (
                    <div key={uni.id} onClick={() => pushScreen({ id: 'depts', title: uni.nameCN, university: uni })} className="bg-white p-4 rounded-3xl flex items-center justify-between shadow-sm border border-gray-50 active:scale-[0.98] transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl p-2 flex items-center justify-center shrink-0 shadow-inner"><img src={uni.logo} alt={uni.nameCN} className="max-w-full max-h-full object-contain" /></div>
                        <div>
                          <div className="flex items-center gap-2"><h3 className="font-bold text-gray-800 text-sm">{uni.nameCN}</h3>{uni.id.startsWith('custom') && <span className="bg-green-100 text-green-600 text-[8px] px-1 rounded font-bold tracking-tight">自定义导入</span>}</div>
                          <p className="text-[10px] text-gray-400 mt-0.5 font-medium">{uni.nameEN}</p>
                          <div className="flex items-center gap-3 mt-2"><span className="bg-yellow-50 text-yellow-700 text-[10px] font-black px-2 py-0.5 rounded-lg border border-yellow-100">QS #{uni.qsRanking}</span><span className="flex items-center text-[10px] text-gray-500 font-bold"><MapPin size={10} className="mr-0.5" /> {uni.country}</span></div>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-gray-200" />
                    </div>
                  )) : (
                      <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                          <School size={48} className="mb-3 opacity-20" />
                          <p className="text-xs font-bold">暂无该地区院校数据</p>
                      </div>
                  )}
                </div>
            </div>
        </div>
    );
};

const ApplyView: React.FC<{ applyTab: 'form' | 'status', setApplyTab: any }> = ({ applyTab, setApplyTab }) => {
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

    const handleFileUpload = () => {
        // Simulation only
        const mockFiles = ["成绩单_中文.pdf", "Personal_Statement_v1.docx", "IELTS_Score.pdf"];
        const randomFile = mockFiles[Math.floor(Math.random() * mockFiles.length)];
        setUploadedFiles(prev => [...prev, randomFile]);
    };

    const removeFile = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const getStatusStyle = (status: string) => {
        switch(status) {
            case 'success': return 'bg-green-50 text-green-600';
            case 'action_required': return 'bg-orange-50 text-orange-600';
            default: return 'bg-blue-50 text-blue-600';
        }
    };

    return (
        <div className="px-3 pb-24">
            <div className="flex bg-gray-200 p-1 rounded-2xl mb-4">
                <button onClick={() => setApplyTab('form')} className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${applyTab === 'form' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500'}`}>我要申请</button>
                <button onClick={() => setApplyTab('status')} className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${applyTab === 'status' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500'}`}>申请进度</button>
            </div>
            
            {applyTab === 'form' ? (
                <div className="space-y-4">
                    {/* Basic Info */}
                    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50 space-y-4">
                        <h3 className="text-sm font-black text-gray-800 flex items-center gap-2">
                            <span className="w-1 h-4 bg-purple-600 rounded-full"></span>
                            基本信息
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                            <input type="text" placeholder="您的姓名" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all" />
                            <input type="tel" placeholder="联系电话" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all" />
                        </div>
                    </div>

                    {/* Academic Background */}
                    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50 space-y-4">
                         <h3 className="text-sm font-black text-gray-800 flex items-center gap-2">
                            <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                            学术背景
                        </h3>
                        <div className="space-y-3">
                            <input type="text" placeholder="本科院校 (中文)" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all" />
                            <input type="text" placeholder="所学专业" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all" />
                            <input type="text" placeholder="均分 / GPA (例如 85% 或 3.6/4.0)" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all" />
                        </div>
                    </div>

                    {/* Application Intent */}
                    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50 space-y-4">
                        <h3 className="text-sm font-black text-gray-800 flex items-center gap-2">
                            <span className="w-1 h-4 bg-orange-500 rounded-full"></span>
                            申请意向
                        </h3>
                        <div className="space-y-3">
                             <div className="grid grid-cols-2 gap-3">
                                 <input type="text" placeholder="目标国家" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all" />
                                 <input type="text" placeholder="入学年份 (如2026)" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all" />
                             </div>
                            <textarea placeholder="目标院校 / 意向专业 (如有特定要求请备注)" rows={3} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all resize-none"></textarea>
                        </div>
                    </div>

                    {/* File Upload */}
                    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50 space-y-4">
                        <h3 className="text-sm font-black text-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-1 h-4 bg-green-500 rounded-full"></span>
                                材料上传
                            </div>
                            <span className="text-[10px] text-gray-400 font-normal">支持 PDF, Word, JPG</span>
                        </h3>
                        
                        <div onClick={handleFileUpload} className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 hover:bg-gray-100 transition-colors cursor-pointer active:scale-[0.99]">
                            <CloudUpload size={32} className="mb-2 text-gray-300" />
                            <span className="text-xs font-bold">点击上传成绩单 / CV / PS 等文件</span>
                        </div>

                        {uploadedFiles.length > 0 && (
                            <div className="space-y-2">
                                {uploadedFiles.map((file, idx) => (
                                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                                                <Paperclip size={14} className="text-purple-600" />
                                            </div>
                                            <span className="text-xs font-bold text-gray-700 truncate">{file}</span>
                                        </div>
                                        <button onClick={() => removeFile(idx)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl transition-transform active:scale-95 flex items-center justify-center gap-2 mt-4">
                        <Send size={18} />
                        提交申请评估
                    </button>
                    <p className="text-center text-[10px] text-gray-400">我们将于24小时内安排专业顾问与您联系</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {applicationStatusData.map((app) => (
                        <div key={app.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-50 transition-all active:scale-[0.99]">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl p-1 flex items-center justify-center shrink-0">
                                    <img src={app.uniLogo} className="max-w-full max-h-full object-contain"/>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-black text-sm text-gray-800 truncate">{app.uniName}</div>
                                    <div className="text-[10px] text-gray-400 font-bold truncate mt-0.5">{app.major}</div>
                                </div>
                                <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg shrink-0 ${getStatusStyle(app.status)}`}>
                                    {app.statusText}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className="text-[10px] font-bold text-gray-400">当前进度</span>
                                    <span className="text-[10px] font-bold text-gray-800">{app.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                     <div 
                                        className={`h-full rounded-full transition-all duration-1000 ease-out ${app.status === 'success' ? 'bg-green-500' : 'bg-gradient-to-r from-purple-500 to-indigo-600'}`} 
                                        style={{ width: `${app.progress}%` }}
                                     ></div>
                                </div>
                            </div>

                            {/* Latest Message */}
                            <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 flex gap-3 items-start">
                                <MessageSquare size={14} className="text-purple-600 mt-0.5 shrink-0" />
                                <div>
                                    <div className="text-[10px] font-bold text-gray-400 mb-0.5">校方最新回复</div>
                                    <p className="text-xs text-gray-700 font-medium leading-relaxed">
                                        {app.latestMessage}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const LanguageInstitutionListView: React.FC<{ pushScreen: any }> = ({ pushScreen }) => (
    <div className="pt-16 px-4 pb-24">
        <div className="mb-4 bg-gradient-to-r from-orange-400 to-red-500 p-6 rounded-3xl shadow-lg text-white">
            <h2 className="text-xl font-black mb-1 flex items-center gap-2"><Trophy size={20} /> 金牌语培机构</h2>
            <p className="text-xs text-white/80 font-medium">官方认证 · 提分保障 · 名师授课</p>
        </div>
        <div className="space-y-4">
            {languageInstitutions.map(inst => (
                <div key={inst.id} onClick={() => pushScreen({ id: 'language_institution_detail', title: inst.name, institution: inst })} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-50 active:scale-[0.98] transition-all">
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-2xl border border-gray-100 overflow-hidden shrink-0 bg-white p-1">
                            <img src={inst.logo} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-800 text-base">{inst.name}</h3>
                                <span className="text-[10px] bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-bold flex items-center"><User size={10} className="mr-1" /> {inst.studentCount}学员</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-2 mb-2">
                                {inst.tags.map(tag => (
                                    <span key={tag} className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{tag}</span>
                                ))}
                            </div>
                            <div className="text-[10px] text-gray-400 line-clamp-1">{inst.description}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const LanguageInstitutionDetailView: React.FC<{ screen: any }> = ({ screen }) => {
    const inst = screen.institution as LanguageInstitution;
    const courses = ieltsCoursesData.filter(c => c.institutionId === inst.id);

    return (
        <div className="pt-16 pb-24">
            {/* Header */}
            <div className="px-4 mb-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 text-center">
                    <div className="w-20 h-20 mx-auto bg-white rounded-2xl p-2 border border-gray-100 mb-4 shadow-sm">
                        <img src={inst.logo} className="w-full h-full object-contain" />
                    </div>
                    <h2 className="text-xl font-black text-gray-800 mb-2">{inst.name}</h2>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">{inst.description}</p>
                    <div className="flex justify-center gap-4 text-center">
                        <div><div className="text-lg font-black text-orange-500">{inst.rating}</div><div className="text-[10px] text-gray-400">综合评分</div></div>
                        <div><div className="text-lg font-black text-purple-600">{inst.studentCount}</div><div className="text-[10px] text-gray-400">累计学员</div></div>
                        <div><div className="text-lg font-black text-blue-600">{courses.length}</div><div className="text-[10px] text-gray-400">在售课程</div></div>
                    </div>
                </div>
            </div>

            {/* Courses List */}
            <div className="px-4">
                <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2"><BookOpen size={18} className="text-purple-600" /> 精品课程</h3>
                <div className="space-y-3">
                    {courses.length > 0 ? courses.map(course => (
                        <div key={course.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-50 flex gap-3">
                            <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 relative bg-gray-100">
                                <img src={course.image} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-0.5">
                                <div>
                                    <h4 className="font-bold text-sm text-gray-800 mb-1">{course.title}</h4>
                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                        {course.tags.map((tag, i) => (
                                            <span key={i} className="text-[9px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-end justify-between">
                                    <span className="text-orange-500 font-black text-sm">{course.price}</span>
                                    <button className="bg-gray-900 text-white text-[10px] font-black px-3 py-1.5 rounded-full">咨询</button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-10 text-gray-400 text-xs">该机构暂无课程上架</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const SinoForeignProgramListView: React.FC = () => {
    const [degreeFilter, setDegreeFilter] = useState<'本科' | '硕士'>('本科');
    const [regionFilter, setRegionFilter] = useState('全部');
    const [modeFilter, setModeFilter] = useState('全部');

    // Dynamic Filter Options Logic
    const isMaster = degreeFilter === '硕士';

    // If Master: Region defaults to '全部' (All) and only allows '全部'.
    // If Bachelor: Standard regions.
    const currentRegions = isMaster 
        ? ['全部'] 
        : ['全部', '英澳', '港新', '北美', '欧洲'];

    // If Master: Mode defaults to '硕士' and only allows '硕士'.
    // If Bachelor: Standard modes (1+3, 2+2 etc.), hide '硕士'.
    const currentModes = isMaster
        ? ['硕士']
        : ['全部', '1+3', '2+2', '3+1', '4+0', '4+1'];

    const handleDegreeChange = (degree: '本科' | '硕士') => {
        setDegreeFilter(degree);
        setRegionFilter('全部');
        if (degree === '硕士') {
            setModeFilter('硕士');
        } else {
            setModeFilter('全部');
        }
    };

    const filteredPrograms = sinoForeignPrograms.filter(prog => {
        const matchDegree = prog.degree === degreeFilter;
        const matchRegion = regionFilter === '全部' || prog.targetRegion === regionFilter;
        const matchMode = modeFilter === '全部' || prog.mode === modeFilter;
        return matchDegree && matchRegion && matchMode;
    });

    return (
        <div className="pt-16 pb-24 h-screen flex flex-col">
            {/* Header */}
            <div className="px-4 mb-4 shrink-0">
                <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-3xl shadow-lg text-white">
                     <h2 className="text-xl font-black mb-1 flex items-center gap-2"><Handshake size={20} /> 中外合办项目库</h2>
                     <p className="text-xs text-white/80 font-medium">教育部认证 · 低分高录 · 黄金跳板</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white sticky top-12 z-10 px-4 py-3 shadow-sm shrink-0 border-b border-gray-50">
                 {/* Degree Toggle */}
                 <div className="bg-gray-100 p-1 rounded-xl mb-3 flex">
                    <button 
                        onClick={() => handleDegreeChange('本科')}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${degreeFilter === '本科' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500'}`}
                    >
                        本科项目 (Bachelor)
                    </button>
                    <button 
                        onClick={() => handleDegreeChange('硕士')}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${degreeFilter === '硕士' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500'}`}
                    >
                        硕士项目 (Master)
                    </button>
                 </div>

                <div className="space-y-3">
                    {/* Region Filter */}
                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                        <span className="text-[10px] font-bold text-gray-400 shrink-0">方向</span>
                        {currentRegions.map(r => (
                            <button 
                                key={r} 
                                onClick={() => setRegionFilter(r)} 
                                disabled={isMaster} // Visually disable interaction if Master
                                className={`text-[10px] px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors ${
                                    regionFilter === r 
                                        ? 'bg-green-100 text-green-700' 
                                        : isMaster ? 'bg-gray-50 text-gray-300 cursor-not-allowed' : 'bg-gray-50 text-gray-600'
                                }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    {/* Mode Filter */}
                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                        <span className="text-[10px] font-bold text-gray-400 shrink-0">模式</span>
                        {currentModes.map(m => (
                            <button 
                                key={m} 
                                onClick={() => setModeFilter(m)} 
                                disabled={isMaster} // Visually disable interaction if Master
                                className={`text-[10px] px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors ${
                                    modeFilter === m 
                                        ? 'bg-blue-100 text-blue-700' 
                                        : isMaster ? 'bg-gray-50 text-gray-300 cursor-not-allowed' : 'bg-gray-50 text-gray-600'
                                }`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="px-4 pt-4 space-y-4 overflow-y-auto flex-1 pb-10">
                {filteredPrograms.length > 0 ? filteredPrograms.map(prog => (
                    <div key={prog.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-50 active:scale-[0.99] transition-all">
                        {/* Schools Row - BIGGER */}
                        <div className="flex flex-col gap-2 mb-4">
                             <div className="flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-purple-600 rounded-full"></span>
                                <div className="text-lg font-black text-gray-900">{prog.domesticUni}</div>
                             </div>
                             <div className="flex items-center gap-2 pl-3.5">
                                <div className="border-l-2 border-gray-100 pl-3 py-1 flex items-center gap-2">
                                    <span className="text-gray-300 text-xs">对接</span>
                                    <div className="flex items-center gap-2 bg-blue-50 px-2.5 py-1 rounded-lg">
                                        <img src={prog.foreignUniLogo} className="w-4 h-4 object-contain" />
                                        <div className="text-base font-bold text-blue-800">{prog.foreignUni}</div>
                                    </div>
                                </div>
                             </div>
                        </div>
                        
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold text-sm text-gray-600 mb-2 flex items-center gap-2">
                                    <GraduationCap size={16} className="text-gray-400" />
                                    {prog.major}
                                </h3>
                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5">
                                     <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded border border-green-100">{prog.mode}模式</span>
                                     <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded border border-purple-100">{prog.degree}</span>
                                     {prog.tags.map((tag, i) => (
                                         <span key={i} className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded">{tag}</span>
                                     ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-2">
                            <div className="text-xs text-gray-500 font-medium bg-orange-50 px-2 py-1 rounded text-orange-600 font-bold">学费: {prog.tuition}</div>
                            <button className="text-xs font-black bg-gray-900 text-white px-4 py-2 rounded-full shadow-md flex items-center gap-1">
                                查看简章 <ChevronRight size={12} />
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <Filter size={32} className="mb-2 opacity-20" />
                        <p className="text-xs">没有找到符合条件的{degreeFilter}项目</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const DepartmentListView: React.FC<{ screen: any, pushScreen: any }> = ({ screen, pushScreen }) => (
    <div className="pb-20 pt-16 px-4">
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-6 rounded-3xl mb-6 shadow-xl flex items-center gap-5"><div className="w-16 h-16 bg-white rounded-2xl p-2 flex items-center justify-center shrink-0 shadow-lg"><img src={screen.university.logo} className="w-full h-full object-contain" /></div><div><h2 className="font-black text-xl leading-tight">{screen.university.nameCN}</h2><p className="text-xs opacity-70 mt-1 font-medium">{screen.university.nameEN}</p></div></div>
        <div className="space-y-3">{screen.university.departments?.map((dept: any) => (<div key={dept.id} onClick={() => pushScreen({ id: 'progs', title: dept.name, university: screen.university, department: dept })} className="bg-white p-5 rounded-3xl flex items-center justify-between active:bg-gray-50 shadow-sm border border-gray-50 transition-all active:scale-[0.98]"><div><div className="font-bold text-sm text-gray-800">{dept.name}</div><div className="text-[10px] text-gray-400 mt-1.5 font-medium">{dept.programCount} 个专业方向</div></div><ChevronRight size={16} className="text-gray-300" /></div>))}</div>
    </div>
);

const ProgramListView: React.FC<{ screen: any, pushScreen: any, addToPlan: any, plan: PlanItem[] }> = ({ screen, pushScreen, addToPlan, plan }) => (
    <div className="pb-20 pt-16 px-4">
        <div className="mb-6"><h2 className="text-xl font-black text-gray-800 leading-tight">{screen.department.name}</h2><p className="text-xs text-gray-400 mt-2 font-medium">发现 {screen.department.programs?.length || 0} 个项目</p></div>
        <div className="space-y-4">{screen.department.programs?.map((prog: Program) => { const isInPlan = plan.some(p => p.program.id === prog.id); return (<div key={prog.id} onClick={() => pushScreen({ id: 'detail', title: '专业详情', university: screen.university, program: prog })} className="bg-white p-5 rounded-3xl active:bg-gray-50 shadow-sm border border-transparent hover:border-purple-200 transition-all active:scale-[0.98]"><div className="flex justify-between items-start mb-2"><h3 className="font-bold text-sm text-gray-800 flex-1 mr-3 leading-snug">{prog.nameCN}</h3><span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg font-black">{prog.degreeType}</span></div><p className="text-[10px] text-gray-400 mb-4 line-clamp-1 italic">{prog.nameEN}</p><div className="flex items-center gap-2"><div className="text-[10px] text-gray-500 bg-gray-50/80 p-3 rounded-2xl font-bold flex-1">学制: {prog.duration} | 学费: {prog.tuition.split(' ')[0]}</div><button onClick={(e) => { e.stopPropagation(); addToPlan(screen.university, prog); }} className={`px-4 py-3 rounded-xl text-[10px] font-black ${isInPlan ? 'bg-gray-100 text-gray-400' : 'bg-purple-600 text-white shadow-lg'}`}>{isInPlan ? '已加入' : '加入计划'}</button></div></div>); })}</div>
    </div>
);

const ApplicationPlanView: React.FC<{ plan: PlanItem[]; removeFromPlan: any; pushScreen: any; onStartApply: () => void; }> = ({ plan, removeFromPlan, pushScreen, onStartApply }) => (
    <div className="pb-32 pt-16 px-4"><div className="mb-6 bg-white p-5 rounded-3xl shadow-sm border border-purple-50 flex items-center justify-between"><div><h2 className="text-lg font-black text-gray-800">定校计划</h2><p className="text-[10px] text-gray-400 mt-1 font-medium">共 {plan.length} 个意向专业</p></div><LayoutList className="text-purple-600 opacity-20" size={32} /></div><div className="space-y-4">{plan.map((item) => (<div key={item.program.id} onClick={() => pushScreen({ id: 'detail', title: '详情', university: item.university, program: item.program })} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 active:scale-[0.98]"><div className="flex gap-4"><div className="w-12 h-12 bg-white rounded-2xl p-1 shrink-0 flex items-center justify-center border border-gray-50 shadow-inner"><img src={item.university.logo} className="w-full h-full object-contain" /></div><div className="flex-1 min-w-0"><div className="text-[10px] font-black text-purple-600 mb-1">{item.university.nameCN}</div><h4 className="font-bold text-sm text-gray-800 truncate">{item.program.nameCN}</h4></div><button onClick={(e) => { e.stopPropagation(); removeFromPlan(item.program.id); }} className="p-2 text-red-400"><Trash2 size={18} /></button></div></div>))}</div><div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t z-50"><button onClick={onStartApply} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2"><Send size={20} />提交定校申请</button></div></div>
);

const ProgramDetailView: React.FC<{ screen: any }> = ({ screen }) => (<div className="pt-12"><ProgramDetail program={screen.program} university={screen.university} /></div>);

export default App;