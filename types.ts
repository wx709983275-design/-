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