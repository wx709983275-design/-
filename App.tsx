
import React, { useState, useRef, useEffect } from 'react';
import MobileNavBar from './components/MobileNavBar';
import MobileTabBar from './components/MobileTabBar';
import MobileFilterBar from './components/FilterPanel';
import ProgramDetail from './components/ProgramDetail';
import { universities, homeCarouselData, latestNewsData, admissionsActivitiesData, ieltsCoursesData, applicationStatusData } from './mockData';
import { University, Department, Program } from './types';
import { 
    ChevronRight, 
    MapPin, 
    Building2, 
    GraduationCap, 
    Bell, 
    Upload, 
    FileCheck, 
    AlertCircle, 
    CheckCircle2, 
    Users, 
    Calendar, 
    Video, 
    ArrowRight, 
    Plus, 
    Heart, 
    Trash2,
    LayoutList,
    Check,
    Send
} from 'lucide-react';

// ==========================================
// Custom Hook: Mouse Drag to Scroll
// ==========================================
const useDraggableScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    setIsDown(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDown(false);
  };

  const onMouseUp = () => {
    setIsDown(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2; 
    ref.current.scrollLeft = scrollLeft - walk;
  };

  return {
    ref,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
    className: `cursor-grab active:cursor-grabbing select-none`
  };
};

// Application Plan Item Type
interface PlanItem {
    university: University;
    program: Program;
}

// Navigation State Types
type Screen = 
  | { id: 'root', title: string }
  | { id: 'depts', title: string, university: University }
  | { id: 'progs', title: string, university: University, department: Department }
  | { id: 'detail', title: '专业详情', university: University, program: Program }
  | { id: 'plan', title: '我的申请计划' };

function App() {
  const [navStack, setNavStack] = useState<Screen[]>([{ id: 'root', title: '大道教育' }]);
  const [activeTab, setActiveTab] = useState('home');
  const [applyTab, setApplyTab] = useState<'form' | 'status'>('form');
  
  // ==========================================
  // 全局申请计划状态
  // ==========================================
  const [applicationPlan, setApplicationPlan] = useState<PlanItem[]>([]);

  // Helper to get current screen
  const currentScreen = navStack[navStack.length - 1];

  // Navigation Actions
  const pushScreen = (screen: Screen) => {
    setNavStack(prev => [...prev, screen]);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const popScreen = () => {
    if (navStack.length > 1) {
      setNavStack(prev => prev.slice(0, -1));
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    let title = '大道教育';
    if(tab === 'select') title = '选校中心';
    if(tab === 'apply') title = '申请管理';
    if(tab === 'profile') title = '个人中心';
    
    setNavStack([{ id: 'root', title }]);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  // 加入/移除计划逻辑
  const addToPlan = (uni: University, prog: Program) => {
      const exists = applicationPlan.some(p => p.program.id === prog.id);
      if (exists) return; // 已存在不处理
      setApplicationPlan(prev => [...prev, { university: uni, program: prog }]);
  }

  const removeFromPlan = (progId: string) => {
      setApplicationPlan(prev => prev.filter(p => p.program.id !== progId));
  }

  const renderRootContent = () => {
      switch(activeTab) {
          case 'home':
              return <HomeView pushScreen={pushScreen} />;
          case 'select':
              return <UniversityListView pushScreen={pushScreen} planCount={applicationPlan.length} />;
          case 'apply':
              return <ApplyView applyTab={applyTab} setApplyTab={setApplyTab} />;
          case 'profile':
              return <div className="p-10 text-center text-gray-400 font-bold uppercase tracking-widest opacity-20">Profile Under Development</div>;
          default:
              return null;
      }
  }

  const renderContent = () => {
    if (currentScreen.id !== 'root') {
        switch (currentScreen.id) {
            case 'depts':
                return <DepartmentListView screen={currentScreen} pushScreen={pushScreen} />;
            case 'progs':
                return (
                    <ProgramListView 
                        screen={currentScreen} 
                        pushScreen={pushScreen} 
                        addToPlan={addToPlan} 
                        plan={applicationPlan}
                    />
                );
            case 'detail':
                return <ProgramDetailView screen={currentScreen} />;
            case 'plan':
                return (
                    <ApplicationPlanView 
                        plan={applicationPlan} 
                        removeFromPlan={removeFromPlan} 
                        pushScreen={pushScreen} 
                        onStartApply={() => handleTabChange('apply')}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <div className="pb-20 pt-12">
            {renderRootContent()}
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <MobileNavBar 
        title={currentScreen.title} 
        showBack={navStack.length > 1} 
        onBack={popScreen}
      />

      <main className="animate-in fade-in duration-200">
        {renderContent()}
      </main>

      {navStack.length === 1 && (
        <MobileTabBar activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
}

// ==========================================
// Views Components
// ==========================================

const HomeView: React.FC<{ pushScreen: any }> = ({ pushScreen }) => {
    const carouselDrag = useDraggableScroll();
    const newsDrag = useDraggableScroll();
    const admissionsDrag = useDraggableScroll();
    const coursesDrag = useDraggableScroll();

    return (
        <div className="space-y-6">
            <div className="relative w-full h-52 bg-gray-200 overflow-hidden">
                <div {...carouselDrag} className={`flex overflow-x-auto snap-x snap-mandatory h-full no-scrollbar scroll-smooth ${carouselDrag.className}`}>
                    {homeCarouselData.map((slide) => (
                        <div key={slide.id} className="w-full shrink-0 snap-center relative">
                            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover pointer-events-none" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-white pointer-events-none">
                                <div className="font-bold text-xl mb-1">{slide.title}</div>
                                <div className="text-sm opacity-90">{slide.subtitle}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-4 right-6 flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                    <div className="w-2 h-2 rounded-full bg-white/40"></div>
                    <div className="w-2 h-2 rounded-full bg-white/40"></div>
                </div>
            </div>

            {/* News Section */}
            <div className="space-y-3">
                <div className="flex justify-between items-center px-4">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2"><Bell size={18} className="text-red-500" />最新资讯</h3>
                    <span className="text-xs text-gray-400">更多</span>
                </div>
                <div {...newsDrag} className={`flex overflow-x-auto gap-3 px-4 no-scrollbar pb-1 snap-x ${newsDrag.className}`}>
                    {latestNewsData.map((news) => (
                        <div key={news.id} className="bg-white rounded-xl p-4 shadow-sm shrink-0 w-[240px] border border-gray-100/50 flex flex-col justify-between h-24 snap-start">
                             <div className="flex items-start gap-2">
                                <span className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 ${news.tag === '重磅' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>{news.tag}</span>
                                <div className="text-sm font-medium text-gray-700 line-clamp-2 leading-snug">{news.title}</div>
                             </div>
                             <div className="text-[10px] text-gray-400 flex items-center justify-between"><span>{news.date}</span><ArrowRight size={10} /></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Admissions Officers */}
            <div className="space-y-3">
                <div className="flex justify-between items-center px-4">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2"><Users size={18} className="text-blue-600" />招生官面对面</h3>
                    <span className="text-xs text-gray-400">全部</span>
                </div>
                <div {...admissionsDrag} className={`flex overflow-x-auto gap-4 px-4 pb-2 no-scrollbar snap-x ${admissionsDrag.className}`}>
                    {admissionsActivitiesData.map((act) => (
                        <div key={act.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 shrink-0 w-[280px] overflow-hidden flex flex-col snap-start">
                            <div className="h-32 relative">
                                <img src={act.image} className="w-full h-full object-cover pointer-events-none" />
                                <div className="absolute top-3 left-3 px-2 py-1 bg-black/40 backdrop-blur-md rounded-lg text-white text-[10px] flex items-center gap-1.5 font-bold">
                                    {act.type.includes('线上') ? <Video size={12} /> : <MapPin size={12} />} {act.type}
                                </div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <div className="font-bold text-sm text-gray-800 line-clamp-1 mb-1">{act.title}</div>
                                <div className="text-xs text-gray-500 mb-3">{act.school}</div>
                                <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-50">
                                    <div className="flex items-center gap-1.5 text-xs text-purple-600 font-bold"><Calendar size={14} />{act.date}</div>
                                    <button className="bg-purple-600 text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-md active:scale-95 transition-transform">{act.status}</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* IELTS Section */}
            <div className="space-y-3">
                 <div className="flex justify-between items-center px-4">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2"><GraduationCap size={18} className="text-purple-600" />雅思辅导推荐</h3>
                    <span className="text-xs text-gray-400">选课</span>
                 </div>
                 <div {...coursesDrag} className={`flex overflow-x-auto gap-4 px-4 pb-4 no-scrollbar snap-x ${coursesDrag.className}`}>
                     {ieltsCoursesData.map((course) => (
                         <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-50 shrink-0 w-44 snap-start">
                             <div className="h-28 bg-gray-200"><img src={course.image} className="w-full h-full object-cover pointer-events-none" /></div>
                             <div className="p-3">
                                 <div className="font-bold text-sm text-gray-800 line-clamp-1 mb-2">{course.title}</div>
                                 <div className="flex flex-wrap gap-1.5 mb-3">{course.tags.map((t,i) => (<span key={i} className="text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full border border-purple-100/50">{t}</span>))}</div>
                                 <div className="text-red-500 font-black text-sm">{course.price}</div>
                             </div>
                         </div>
                     ))}
                 </div>
            </div>
            <div className="h-4"></div>
        </div>
    )
}

const ApplyView: React.FC<{ applyTab: 'form' | 'status', setApplyTab: any }> = ({ applyTab, setApplyTab }) => {
    return (
        <div className="px-3">
            <div className="flex bg-gray-200 p-1 rounded-xl mb-4">
                <button onClick={() => setApplyTab('form')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${applyTab === 'form' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500'}`}>我要申请</button>
                <button onClick={() => setApplyTab('status')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${applyTab === 'status' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500'}`}>申请进度</button>
            </div>
            {applyTab === 'form' ? (
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6 animate-in slide-in-from-left-4 duration-300">
                    <div>
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><FileCheck size={20} className="text-purple-600"/>基本信息</h3>
                        <div className="space-y-4">
                            <div className="space-y-1"><label className="text-[10px] text-gray-400 ml-1">学生姓名</label><input type="text" placeholder="请输入真实姓名" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-300 transition-colors" /></div>
                            <div className="space-y-1"><label className="text-[10px] text-gray-400 ml-1">联系电话</label><input type="tel" placeholder="请输入手机号" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-300 transition-colors" /></div>
                            <div className="space-y-1"><label className="text-[10px] text-gray-400 ml-1">目标院校</label><input type="text" placeholder="例如: 帝国理工学院" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-300 transition-colors" /></div>
                        </div>
                    </div>
                    <div className="pt-2">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Upload size={20} className="text-purple-600"/>材料上传</h3>
                        <div className="border-2 border-dashed border-purple-200 bg-purple-50/50 rounded-2xl h-40 flex flex-col items-center justify-center text-purple-400 active:bg-purple-50 transition-colors">
                            <div className="bg-white p-3 rounded-full shadow-sm mb-3"><Upload size={24} className="text-purple-500"/></div>
                            <span className="text-xs font-bold">点击上传申请材料</span>
                        </div>
                    </div>
                    <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl hover:opacity-90 active:scale-[0.98] transition-all mt-4 text-base">提交申请</button>
                </div>
            ) : (
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300 pb-4">
                    {applicationStatusData.map((app) => (
                        <div key={app.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-4 border-b border-gray-50 pb-4">
                                <div className="w-12 h-12 border border-gray-100 rounded-xl p-1.5 flex items-center justify-center shrink-0 shadow-sm bg-white"><img src={app.uniLogo} className="w-full h-full object-contain" /></div>
                                <div className="flex-1"><div className="font-bold text-sm text-gray-800">{app.uniName}</div><div className="text-[10px] text-gray-500 mt-0.5">{app.major}</div></div>
                                <span className={`text-[10px] px-2.5 py-1 rounded-full font-black ${app.status === 'success' ? 'bg-green-100 text-green-700' : app.status === 'action_required' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800'}`}>{app.statusText}</span>
                            </div>
                            <div className="mb-5 px-1"><div className="flex justify-between text-[10px] text-gray-400 mb-2 font-bold uppercase"><span>进度</span><span>{app.progress}%</span></div><div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all duration-1000 ${app.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${app.progress}%` }}></div></div></div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100"><div className="flex gap-3"><Bell size={18} className="text-blue-500 shrink-0 mt-0.5" /><div><div className="text-xs font-black text-gray-800 mb-1">大学最新回复</div><div className="text-[11px] text-gray-600 leading-relaxed font-medium">{app.latestMessage}</div></div></div></div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

const UniversityListView: React.FC<{ pushScreen: any; planCount: number }> = ({ pushScreen, planCount }) => {
    return (
        <div className="">
            <MobileFilterBar />
            <div className="px-3 py-2">
                {/* 申请计划入口 */}
                <div 
                    onClick={() => pushScreen({ id: 'plan', title: '我的申请计划' })}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 p-5 rounded-2xl shadow-lg flex items-center justify-between active:scale-[0.98] transition-all mb-4 overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4"><Heart size={120} /></div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md"><Heart size={24} className="text-white fill-white" /></div>
                        <div>
                            <h3 className="text-white font-black text-base">我的申请计划</h3>
                            <p className="text-white/70 text-[10px] mt-0.5 font-medium">已加入 {planCount} 个心仪专业</p>
                        </div>
                    </div>
                    <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-md relative z-10"><ChevronRight size={20} className="text-white" /></div>
                </div>

                <div className="text-[10px] font-bold text-gray-400 px-2 tracking-widest uppercase mb-2">全球顶尖院校库</div>
                <div className="space-y-3">
                  {universities.map(uni => (
                    <div key={uni.id} onClick={() => pushScreen({ id: 'depts', title: uni.nameCN, university: uni })} className="bg-white p-4 rounded-2xl flex items-center justify-between active:bg-gray-50 active:scale-[0.98] transition-all shadow-sm border border-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white border border-gray-100 rounded-xl p-2 flex items-center justify-center shrink-0 shadow-inner"><img src={uni.logo} alt={uni.nameCN} className="max-w-full max-h-full object-contain" /></div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-sm">{uni.nameCN}</h3>
                          <p className="text-[10px] text-gray-400 mt-0.5 font-medium">{uni.nameEN}</p>
                          <div className="flex items-center gap-3 mt-2">
                             <span className="bg-yellow-50 text-yellow-700 text-[10px] font-black px-2 py-0.5 rounded-lg border border-yellow-100">QS #{uni.qsRanking}</span>
                            <span className="flex items-center text-[10px] text-gray-500 font-bold"><MapPin size={10} className="mr-0.5 text-gray-400" /> {uni.country}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
        </div>
    );
};

const DepartmentListView: React.FC<{ screen: any, pushScreen: any }> = ({ screen, pushScreen }) => {
    const uni = screen.university;
    return (
        <div className="pb-20 pt-16 px-4">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-6 rounded-3xl mb-6 shadow-xl flex items-center gap-5">
                 <div className="w-16 h-16 bg-white rounded-2xl p-2 flex items-center justify-center shrink-0 shadow-lg"><img src={uni.logo} className="w-full h-full object-contain" /></div>
                 <div><h2 className="font-black text-xl leading-tight">{uni.nameCN}</h2><p className="text-xs opacity-70 mt-1 font-medium">{uni.nameEN}</p></div>
            </div>
            <h3 className="text-sm font-black text-gray-800 mb-4 px-1 tracking-wide">所有院系 ({uni.departments.length})</h3>
            <div className="space-y-3">
              {uni.departments.map((dept: any) => (
                <div key={dept.id} onClick={() => pushScreen({ id: 'progs', title: dept.name, university: uni, department: dept })} className="bg-white p-5 rounded-2xl flex items-center justify-between active:bg-gray-50 shadow-sm border border-gray-50 transition-all active:scale-[0.98]">
                   <div><div className="font-bold text-sm text-gray-800">{dept.name}</div><div className="text-[10px] text-gray-400 mt-1.5 font-medium">{dept.programCount} 个硕士申请方向</div></div>
                   <div className="bg-gray-50 p-1.5 rounded-full"><ChevronRight size={16} className="text-gray-400" /></div>
                </div>
              ))}
            </div>
        </div>
    );
};

const ProgramListView: React.FC<{ screen: any, pushScreen: any, addToPlan: any, plan: PlanItem[] }> = ({ screen, pushScreen, addToPlan, plan }) => {
    const dept = screen.department;
    const u = screen.university;

    return (
        <div className="pb-20 pt-16 px-4">
            <div className="mb-6">
                <h2 className="text-xl font-black text-gray-800 leading-tight">{dept.name}</h2>
                <p className="text-xs text-gray-400 mt-2 font-medium">共发现 {dept.programs.length} 个项目</p>
            </div>
            <div className="space-y-4">
              {dept.programs.map((prog: Program) => {
                const isInPlan = plan.some(p => p.program.id === prog.id);
                return (
                  <div key={prog.id} onClick={() => pushScreen({ id: 'detail', title: '专业详情', university: u, program: prog })} className="bg-white p-5 rounded-2xl active:bg-gray-50 shadow-sm border border-transparent hover:border-purple-200 transition-all active:scale-[0.98]">
                      <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-sm text-gray-800 flex-1 mr-3 leading-snug">{prog.nameCN}</h3>
                          <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg font-black">{prog.degreeType}</span>
                      </div>
                      <p className="text-[10px] text-gray-400 mb-4 line-clamp-1 italic">{prog.nameEN}</p>
                      <div className="flex items-center gap-2">
                          <div className="flex items-center gap-4 text-[10px] text-gray-500 bg-gray-50/80 p-3 rounded-xl font-bold flex-1">
                              <span className="flex items-center"><GraduationCap size={12} className="mr-1.5 text-purple-500"/> {prog.duration}</span>
                              <div className="w-[1.5px] h-3 bg-gray-200"></div>
                              <span className="flex items-center text-indigo-600">{prog.tuition.split(' ')[0]}</span>
                          </div>
                          <button 
                              onClick={(e) => {
                                  e.stopPropagation();
                                  addToPlan(u, prog);
                              }}
                              disabled={isInPlan}
                              className={`flex items-center gap-1.5 text-[10px] font-black px-4 py-3 rounded-xl shadow-lg transition-all active:scale-90 shrink-0 ${
                                  isInPlan 
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' 
                                  : 'bg-purple-600 text-white hover:bg-purple-700'
                              }`}
                          >
                              {isInPlan ? <Check size={14} /> : <Plus size={14} />}
                              {isInPlan ? '已加入' : '加入计划'}
                          </button>
                      </div>
                  </div>
                );
              })}
            </div>
        </div>
    );
};

const ApplicationPlanView: React.FC<{ 
    plan: PlanItem[]; 
    removeFromPlan: any; 
    pushScreen: any;
    onStartApply: () => void;
}> = ({ plan, removeFromPlan, pushScreen, onStartApply }) => {
    if (plan.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-10 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6"><Heart size={40} className="text-gray-300" /></div>
                <h3 className="font-bold text-gray-800 mb-2">计划清单还是空的</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-8">去选校中心挑选心仪的大学和专业吧！</p>
            </div>
        );
    }

    return (
        <div className="pb-32 pt-16 px-4">
            <div className="mb-6 bg-white p-4 rounded-2xl shadow-sm border border-purple-50 flex items-center justify-between">
                <div><h2 className="text-lg font-black text-gray-800">您的定校计划</h2><p className="text-[10px] text-gray-400 mt-1 font-medium">共保存了 {plan.length} 个项目</p></div>
                <LayoutList className="text-purple-600 opacity-20" size={32} />
            </div>
            <div className="space-y-4">
                {plan.map((item) => (
                    <div key={item.program.id} onClick={() => pushScreen({ id: 'detail', title: '专业详情', university: item.university, program: item.program })} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 active:scale-[0.98] transition-all">
                        <div className="flex gap-4">
                            <div className="w-14 h-14 bg-white border border-gray-100 rounded-xl p-2 shrink-0 flex items-center justify-center shadow-inner"><img src={item.university.logo} className="w-full h-full object-contain" /></div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[10px] font-black text-purple-600 mb-1 uppercase truncate">{item.university.nameCN}</div>
                                <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{item.program.nameCN}</h4>
                                <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-400 font-bold"><span className="flex items-center gap-1"><MapPin size={10}/> {item.university.country}</span><span className="flex items-center gap-1"><GraduationCap size={10}/> {item.program.duration}</span></div>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); removeFromPlan(item.program.id); }} className="w-10 h-10 bg-red-50 text-red-400 flex items-center justify-center rounded-xl active:bg-red-100 transition-colors shrink-0 self-center"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 吸底动作按钮 */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 z-50">
                <button 
                    onClick={onStartApply}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl active:scale-[0.98] transition-all text-base flex items-center justify-center gap-2"
                >
                    <Send size={20} />
                    立即开始申请
                </button>
            </div>
        </div>
    );
};

const ProgramDetailView: React.FC<{ screen: any }> = ({ screen }) => {
    return (
        <div className="pt-12">
            <ProgramDetail program={screen.program} university={screen.university} />
        </div>
    );
};

export default App;
