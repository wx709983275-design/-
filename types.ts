
export enum DegreeType {
    MASTER = '硕士',
    BACHELOR = '本科'
}

export interface University {
    id: string;
    nameCN: string;
    nameEN: string;
    location: string;
    country: string;
    logo: string;
    qsRanking: number;
    departments: Department[];
}

export interface Department {
    id: string;
    name: string;
    programCount: number;
    programs: Program[];
}

export interface LanguageScore {
    total: string;
    listening?: string;
    reading?: string;
    writing?: string;
    speaking?: string;
}

export interface Program {
    id: string;
    nameCN: string;
    nameEN: string;
    degreeType: string;
    faculty: string; // e.g. Civil Engineering
    school: string; // e.g. Faculty of Engineering
    duration: string;
    tuition: string;
    applicationFee: string;
    description: string;
    rounds: { name: string; date: string; status: 'open' | 'closed' | 'upcoming' }[];
    requirements: {
        ielts?: LanguageScore;
        toefl?: LanguageScore;
        pte?: LanguageScore;
        gpa: string;
        background: string;
        other?: string;
        documents?: string[];
    };
    curriculum: { nameCN: string; nameEN: string; type: string }[];
    career: string;
    highlights: string;
}

export interface LanguageInstitution {
    id: string;
    name: string;
    logo: string;
    tags: string[];
    rating: number;
    studentCount: string;
    description: string;
}

export interface LanguageCourse {
    id: number;
    institutionId: string; // Link to Institution
    title: string;
    image: string;
    tags: string[];
    price: string;
    originalPrice?: string;
}

export interface SinoForeignProgram {
    id: string;
    domesticUni: string; // 国内院校
    foreignUni: string; // 国外对接院校
    foreignUniLogo: string;
    major: string;
    mode: '1+3' | '2+2' | '3+1' | '4+0' | '硕士'; // 办学模式 updated
    targetRegion: '英澳' | '港新' | '北美' | '欧洲'; // 目标方向
    tuition: string;
    tags: string[];
    degree: '本科' | '硕士'; // 新增学位类型
}

export interface StudentCase {
    id: string;
    studentName: string; // 匿名处理，如 "张同学"
    admitCountry: string;
    admitUniversity: string;
    admitUniversityLogo: string;
    admitMajor: string;
    admitYear: string;
    
    // Hard Background
    undergradUniversity: string;
    undergradMajor: string;
    gpa: string;
    languageScore: string; // e.g. "IELTS 7.5"
    greGmat?: string;
    
    // Soft Background
    research: string[];
    internship: string[];
    
    tags: string[]; // e.g. "低分逆袭", "跨专业"
    advisorComment: string;
}
