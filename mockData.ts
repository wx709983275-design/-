
import { University, Department, Program } from './types';

// ==========================================
// 1. Data Generators & Helpers
// ==========================================

const createDetailedProgram = (
    id: string,
    uniName: string,
    majorName: string,
    faculty: string
): Program => {
    return {
        id: id,
        nameCN: `${majorName}硕士`,
        nameEN: `MSc ${majorName}`,
        degreeType: 'Master',
        faculty: faculty,
        school: `${faculty} School`,
        duration: '1-2年',
        tuition: '£32,000 - £45,000 / Year',
        applicationFee: '£90',
        description: `The MSc in ${majorName} at ${uniName} is a world-leading program designed to equip students with advanced theoretical knowledge and practical skills. Students will engage with cutting-edge research and industry projects.`,
        rounds: [
            { name: 'Round 1', date: '2025-11-15', status: 'closed' },
            { name: 'Round 2', date: '2026-01-30', status: 'open' },
            { name: 'Round 3', date: '2026-03-30', status: 'upcoming' },
        ],
        requirements: {
            ielts: { total: '7.0', listening: '6.5', reading: '6.5', writing: '6.5', speaking: '6.5' },
            toefl: { total: '100', listening: '22', reading: '22', writing: '22', speaking: '22' },
            gpa: 'UK 2:1 or equivalent (85%+)',
            background: `Bachelor degree in ${faculty} or related quantitative discipline.`,
            other: 'Strong mathematical background required.',
            documents: [
                "Personal Statement (500 words)",
                "Two Academic References",
                "CV / Resume",
                "Official Transcripts"
            ]
        },
        curriculum: [
            { nameCN: '高级核心课程', nameEN: `Advanced ${majorName} Core`, type: '必修' },
            { nameCN: '研究方法论', nameEN: 'Research Methods', type: '必修' },
            { nameCN: '毕业论文', nameEN: 'Dissertation', type: '核心' },
            { nameCN: '选修课 A', nameEN: 'Elective Module A', type: '选修' },
            { nameCN: '选修课 B', nameEN: 'Elective Module B', type: '选修' }
        ],
        career: `Graduates from the ${majorName} program are highly sought after by top firms in the industry, consultancy, and academia.`,
        highlights: `${uniName} is consistently ranked among the top universities globally for ${faculty}.`
    };
};

const generateDepartments = (uniId: string, uniNameEN: string): Department[] => [
    {
        id: `d-${uniId}-eng`,
        name: '工程学院',
        programCount: 6,
        programs: [
            createDetailedProgram(`p-${uniId}-cs`, uniNameEN, 'Computer Science', 'Engineering'),
            createDetailedProgram(`p-${uniId}-ee`, uniNameEN, 'Electrical Engineering', 'Engineering'),
            createDetailedProgram(`p-${uniId}-me`, uniNameEN, 'Mechanical Engineering', 'Engineering'),
            createDetailedProgram(`p-${uniId}-ce`, uniNameEN, 'Civil Engineering', 'Engineering'),
        ]
    },
    {
        id: `d-${uniId}-bus`,
        name: '商学院',
        programCount: 5,
        programs: [
            createDetailedProgram(`p-${uniId}-fin`, uniNameEN, 'Finance', 'Business'),
            createDetailedProgram(`p-${uniId}-mgt`, uniNameEN, 'Management', 'Business'),
            createDetailedProgram(`p-${uniId}-ba`, uniNameEN, 'Business Analytics', 'Business'),
        ]
    },
    {
        id: `d-${uniId}-sci`,
        name: '理学院',
        programCount: 4,
        programs: [
            createDetailedProgram(`p-${uniId}-ds`, uniNameEN, 'Data Science', 'Science'),
            createDetailedProgram(`p-${uniId}-phy`, uniNameEN, 'Physics', 'Science'),
        ]
    }
];

// ==========================================
// 2. Specific Data (Imperial College)
// ==========================================

const imperialCollege: University = {
    id: 'u2',
    nameCN: '帝国理工学院',
    nameEN: 'Imperial College London',
    location: '英国',
    country: 'UK',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Imperial_College_London_new_logo.png',
    qsRanking: 2,
    departments: [
        {
            id: 'd1',
            name: '土木与环境工程学院',
            programCount: 18,
            programs: [
                {
                    id: 'p1',
                    nameCN: '地震工程理学硕士',
                    nameEN: 'MSc Earthquake Engineering',
                    degreeType: 'MSc',
                    faculty: '土木工程',
                    school: '土木与环境工程学院',
                    duration: '1年',
                    tuition: '42900英镑/年',
                    applicationFee: '90英镑',
                    description: '帝国理工学院地震工程理学硕士项目课程是一个综合型的课程，提供了在地震作用和其他极端负荷条件下的结构分析、设计和评估的培训。课程大纲涵盖了结构工程、地震工程、土动力学和高级数值技术相关的一整套主题。帝国理工学院地震工程理学硕士项目课程以职业为导向，涵盖理论背景和实际设计考虑。',
                    rounds: [
                        { name: '开放申请', date: '2025-09-29', status: 'open' },
                        { name: 'Round 1', date: '2026-01-07', status: 'upcoming' },
                        { name: 'Round 2', date: '2026-03-11', status: 'upcoming' },
                        { name: 'Round 3', date: '2026-04-29', status: 'upcoming' }
                    ],
                    requirements: {
                        ielts: { total: '6.5', listening: '6', reading: '6', writing: '6', speaking: '6' },
                        toefl: { total: '92', listening: '20', reading: '20', writing: '20', speaking: '20' },
                        pte: { total: '62', listening: '56', reading: '56', writing: '56', speaking: '56' },
                        gpa: '211/985 85%+',
                        background: '土木工程或相关专业背景',
                        other: '具有2:1学位，需要土木工程、自然科学、地球科学或其他数学学科背景',
                        documents: [
                            "Section 1: Explain why you're interested in studying this course.",
                            "Section 2: Show how your experience is useful or relevant to meeting the course requirements.",
                            "Section 3: Show how the course will help you shape your academic or professional career."
                        ]
                    },
                    curriculum: [
                        { nameCN: '有限元分析', nameEN: 'Finite Element Analysis', type: '其他课程' },
                        { nameCN: '岩土灾害', nameEN: 'Geotechnical Hazards', type: '其他课程' },
                        { nameCN: '钢筋混凝土 I', nameEN: 'Reinforced Concrete I', type: '其他课程' },
                        { nameCN: '钢构件', nameEN: 'Steel Components', type: '其他课程' },
                        { nameCN: '结构分析', nameEN: 'Structural Analysis', type: '其他课程' },
                        { nameCN: '结构动力学', nameEN: 'Structural Dynamics', type: '其他课程' },
                        { nameCN: '桥梁设计', nameEN: 'Design of Bridges', type: '其他课程' },
                        { nameCN: '结构可靠性理论', nameEN: 'Structural Reliability Theory', type: '其他课程' },
                        { nameCN: '岩土地震工程', nameEN: 'Geotechnical Earthquake Engineering', type: '其他课程' },
                        { nameCN: '结构消防工程', nameEN: 'Structural Fire Engineering', type: '其他课程' }
                    ],
                    career: '就业服务：毕业生可广泛进入工程建设及相关领域，从事施工工程师、建筑工程师、结构工程师、技术经理等工作。',
                    highlights: '帝国理工学院土木与环境工程系是英国规模最大、学术评价最高的土木工程系之一。'
                }
            ]
        },
        ...generateDepartments('u2', 'Imperial College London')
    ]
};

// ==========================================
// 3. Main University List Construction
// ==========================================

const topUnisList = [
    { id: 'u1', qs: 1, nameCN: '麻省理工学院', nameEN: 'MIT', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1200px-MIT_logo.svg.png' },
    // u2 is Imperial
    { id: 'u3', qs: 3, nameCN: '牛津大学', nameEN: 'University of Oxford', loc: '英国', country: 'UK', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Oxford_University_Coat_of_Arms.svg/1200px-Oxford_University_Coat_of_Arms.svg.png' },
    { id: 'u4', qs: 4, nameCN: '哈佛大学', nameEN: 'Harvard University', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/en/2/29/Harvard_shield_wreath.svg' },
    { id: 'u5', qs: 5, nameCN: '剑桥大学', nameEN: 'University of Cambridge', loc: '英国', country: 'UK', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Coat_of_Arms_of_the_University_of_Cambridge.svg/1200px-Coat_of_Arms_of_the_University_of_Cambridge.svg.png' },
    { id: 'u6', qs: 6, nameCN: '斯坦福大学', nameEN: 'Stanford University', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/1200px-Seal_of_Leland_Stanford_Junior_University.svg.png' },
    { id: 'u7', qs: 7, nameCN: '苏黎世联邦理工学院', nameEN: 'ETH Zurich', loc: '瑞士', country: 'Switzerland', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/ETH_Z%C3%BCrich_Logo_black.svg/1200px-ETH_Z%C3%BCrich_Logo_black.svg.png' },
    { id: 'u8', qs: 8, nameCN: '新加坡国立大学', nameEN: 'National University of Singapore', loc: '新加坡', country: 'Singapore', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/NUS_coat_of_arms.svg/1200px-NUS_coat_of_arms.svg.png' },
    { id: 'u9', qs: 9, nameCN: '伦敦大学学院', nameEN: 'UCL', loc: '英国', country: 'UK', logo: 'https://upload.wikimedia.org/wikipedia/en/d/d1/University_College_London_logo.svg' },
    { id: 'u10', qs: 10, nameCN: '加州理工学院', nameEN: 'Caltech', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a4/California_Institute_of_Technology_seal.svg' },
    { id: 'u11', qs: 11, nameCN: '宾夕法尼亚大学', nameEN: 'University of Pennsylvania', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UPenn_shield_with_banner.svg/1200px-UPenn_shield_with_banner.svg.png' },
    { id: 'u12', qs: 12, nameCN: '加州大学伯克利分校', nameEN: 'UC Berkeley', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/1200px-Seal_of_University_of_California%2C_Berkeley.svg.png' },
    { id: 'u13', qs: 13, nameCN: '墨尔本大学', nameEN: 'The University of Melbourne', loc: '澳大利亚', country: 'Australia', logo: 'https://upload.wikimedia.org/wikipedia/en/1/1b/University_of_Melbourne_Coat_of_Arms.svg' },
    { id: 'u14', qs: 14, nameCN: '南洋理工大学', nameEN: 'Nanyang Technological University', loc: '新加坡', country: 'Singapore', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Nanyang_Technological_University_coat_of_arms.svg/1200px-Nanyang_Technological_University_coat_of_arms.svg.png' },
    { id: 'u15', qs: 15, nameCN: '康奈尔大学', nameEN: 'Cornell University', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/1200px-Cornell_University_seal.svg.png' },
    { id: 'u16', qs: 16, nameCN: '香港大学', nameEN: 'The University of Hong Kong', loc: '中国香港', country: 'Hong Kong', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/University_of_Hong_Kong_coat_of_arms.svg/1200px-University_of_Hong_Kong_coat_of_arms.svg.png' },
    { id: 'u17', qs: 17, nameCN: '悉尼大学', nameEN: 'The University of Sydney', loc: '澳大利亚', country: 'Australia', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/University_of_Sydney_Coat_of_Arms.svg/1200px-University_of_Sydney_Coat_of_Arms.svg.png' },
    { id: 'u18', qs: 18, nameCN: '新南威尔士大学', nameEN: 'UNSW Sydney', loc: '澳大利亚', country: 'Australia', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/UNSW_Coat_of_Arms.svg/1200px-UNSW_Coat_of_Arms.svg.png' },
    { id: 'u19', qs: 19, nameCN: '芝加哥大学', nameEN: 'University of Chicago', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/79/University_of_Chicago_shield.svg/1200px-University_of_Chicago_shield.svg.png' },
    { id: 'u20', qs: 20, nameCN: '普林斯顿大学', nameEN: 'Princeton University', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/1200px-Princeton_seal.svg.png' },
    { id: 'u21', qs: 21, nameCN: '多伦多大学', nameEN: 'University of Toronto', loc: '加拿大', country: 'Canada', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/University_of_Toronto_Coat_of_Arms.svg/1200px-University_of_Toronto_Coat_of_Arms.svg.png' },
    { id: 'u22', qs: 22, nameCN: '耶鲁大学', nameEN: 'Yale University', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/1200px-Yale_University_Shield_1.svg.png' },
    { id: 'u23', qs: 23, nameCN: '爱丁堡大学', nameEN: 'The University of Edinburgh', loc: '英国', country: 'UK', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/University_of_Edinburgh_Ceremonial_Coat_of_Arms.svg/1200px-University_of_Edinburgh_Ceremonial_Coat_of_Arms.svg.png' },
    { id: 'u24', qs: 24, nameCN: '清华大学', nameEN: 'Tsinghua University', loc: '中国', country: 'China', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Tsinghua_University_Logo.svg/1200px-Tsinghua_University_Logo.svg.png' },
    { id: 'u25', qs: 25, nameCN: '北京大学', nameEN: 'Peking University', loc: '中国', country: 'China', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Peking_University_seal.svg/1200px-Peking_University_seal.svg.png' },
    { id: 'u26', qs: 26, nameCN: '曼彻斯特大学', nameEN: 'The University of Manchester', loc: '英国', country: 'UK', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/The_University_of_Manchester_Coat_of_Arms.svg/1200px-The_University_of_Manchester_Coat_of_Arms.svg.png' },
    { id: 'u27', qs: 27, nameCN: '哥伦比亚大学', nameEN: 'Columbia University', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1a/Columbia_University_Shield.svg/1200px-Columbia_University_Shield.svg.png' },
    { id: 'u28', qs: 28, nameCN: '巴黎文理研究大学', nameEN: 'PSL University', loc: '法国', country: 'France', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/PSL_Research_University_logo.svg/1200px-PSL_Research_University_logo.svg.png' },
    { id: 'u29', qs: 29, nameCN: '东京大学', nameEN: 'The University of Tokyo', loc: '日本', country: 'Japan', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/University_of_Tokyo_Logo.svg/1200px-University_of_Tokyo_Logo.svg.png' },
    { id: 'u30', qs: 30, nameCN: '加州大学洛杉矶分校', nameEN: 'UCLA', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/UCLA_Seal_2024.svg/1200px-UCLA_Seal_2024.svg.png' },
    { id: 'u31', qs: 31, nameCN: '麦吉尔大学', nameEN: 'McGill University', loc: '加拿大', country: 'Canada', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/McGill_University_Coat_of_Arms.svg/1200px-McGill_University_Coat_of_Arms.svg.png' },
    { id: 'u32', qs: 32, nameCN: '澳大利亚国立大学', nameEN: 'Australian National University', loc: '澳大利亚', country: 'Australia', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Australian_National_University_Coat_of_Arms.svg/1200px-Australian_National_University_Coat_of_Arms.svg.png' },
    { id: 'u33', qs: 33, nameCN: '伦敦国王学院', nameEN: 'King\'s College London', loc: '英国', country: 'UK', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/King%27s_College_London_Coat_of_Arms.svg/1200px-King%27s_College_London_Coat_of_Arms.svg.png' },
    { id: 'u34', qs: 34, nameCN: '复旦大学', nameEN: 'Fudan University', loc: '中国', country: 'China', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Fudan_University_Logo.svg/1200px-Fudan_University_Logo.svg.png' },
    { id: 'u35', qs: 35, nameCN: '伦敦政治经济学院', nameEN: 'LSE', loc: '英国', country: 'UK', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/01/LSE_Coat_of_Arms.svg/1200px-LSE_Coat_of_Arms.svg.png' },
    { id: 'u36', qs: 36, nameCN: '香港中文大学', nameEN: 'CUHK', loc: '中国香港', country: 'Hong Kong', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/CUHK_Coat_of_Arms.svg/1200px-CUHK_Coat_of_Arms.svg.png' },
    { id: 'u37', qs: 37, nameCN: '代尔夫特理工大学', nameEN: 'TU Delft', loc: '荷兰', country: 'Netherlands', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/TU_Delft_Logo.svg/1200px-TU_Delft_Logo.svg.png' },
    { id: 'u38', qs: 38, nameCN: '布里斯托大学', nameEN: 'University of Bristol', loc: '英国', country: 'UK', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/University_of_Bristol_coat_of_arms.svg/1200px-University_of_Bristol_coat_of_arms.svg.png' },
    { id: 'u39', qs: 39, nameCN: '慕尼黑工业大学', nameEN: 'Technical University of Munich', loc: '德国', country: 'Germany', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Logo_Technical_University_of_Munich.svg/1200px-Logo_Technical_University_of_Munich.svg.png' },
    { id: 'u40', qs: 40, nameCN: '阿姆斯特丹大学', nameEN: 'University of Amsterdam', loc: '荷兰', country: 'Netherlands', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/University_of_Amsterdam_coat_of_arms.svg/1200px-University_of_Amsterdam_coat_of_arms.svg.png' },
];

const allUniversities: University[] = topUnisList.map(uni => {
    // If it's Imperial, use our custom object
    if (uni.id === 'u2') return imperialCollege;
    
    return {
        id: uni.id,
        nameCN: uni.nameCN,
        nameEN: uni.nameEN,
        location: uni.loc,
        country: uni.country,
        logo: uni.logo,
        qsRanking: uni.qs,
        departments: generateDepartments(uni.id, uni.nameEN)
    };
});

// Add Imperial back into the sorted position (Index 1)
const imperialIndex = allUniversities.findIndex(u => u.qsRanking > 2);
if (imperialIndex !== -1) {
    allUniversities.splice(imperialIndex, 0, imperialCollege);
} else {
    allUniversities.splice(1, 0, imperialCollege);
}

// Ensure unique IDs just in case
const seenIds = new Set();
export const finalUniversities = allUniversities.filter(u => {
    if (seenIds.has(u.id)) return false;
    seenIds.add(u.id);
    return true;
}).sort((a,b) => a.qsRanking - b.qsRanking);

// Re-export as standard name
export { finalUniversities as universities };

// ==========================================
// 4. Home Page & Application Data
// ==========================================

export const homeCarouselData = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "2026年秋季留学申请全攻略",
        subtitle: "早规划，早录取"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "名校学长面对面",
        subtitle: "分享真实的留学生活"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1544531696-9342a533af63?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "背景提升科研营",
        subtitle: "助力冲击顶尖名校"
    }
];

export const latestNewsData = [
    { id: 1, tag: "重磅", title: "英国G5院校26Fall申请时间线汇总", date: "10分钟前" },
    { id: 2, tag: "政策", title: "澳洲留学签证新政解读：利好留学生", date: "1小时前" },
    { id: 3, tag: "排名", title: "2026 QS世界大学排名发布", date: "3小时前" },
    { id: 4, tag: "干货", title: "如何撰写一份高质量的PS文书？", date: "昨天" }
];

export const admissionsActivitiesData = [
    {
        id: 1,
        title: "2026秋季硕士申请政策解读",
        school: "帝国理工学院",
        type: "线上直播",
        date: "11月20日 19:30",
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        status: "预约中"
    },
    {
        id: 2,
        title: "商学院1对1面试模拟暨招生会",
        school: "新加坡国立大学",
        type: "线下活动",
        date: "12月05日 上海",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        status: "火热报名"
    },
    {
        id: 3,
        title: "工学院前沿科技分享与招生讲座",
        school: "南洋理工大学",
        type: "线上宣讲",
        date: "11月25日 20:00",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        status: "即将开始"
    }
];

export const ieltsCoursesData = [
    { 
        id: 1, 
        title: "雅思7分冲刺班", 
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", 
        tags: ["名师授课", "保分协议"],
        price: "¥3999"
    },
    { 
        id: 2, 
        title: "口语1对1陪练", 
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", 
        tags: ["外教", "实时反馈"],
        price: "¥299/课时"
    },
    { 
        id: 3, 
        title: "写作精批服务", 
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", 
        tags: ["前考官", "24h出分"],
        price: "¥199/篇"
    }
];

export const applicationStatusData = [
    {
        id: 'app-u2',
        uniName: '帝国理工学院',
        uniLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Imperial_College_London_new_logo.png',
        major: 'MSc Earthquake Engineering',
        status: 'pending',
        statusText: '审核中',
        progress: 40,
        timeline: [
            { date: '2025-10-01', text: '申请已提交', active: true },
            { date: '2025-10-05', text: '材料初审通过', active: true },
            { date: '2025-10-15', text: '进入学院审核阶段', active: true },
        ],
        latestMessage: '您的申请已进入系审核阶段，预计需4-6周出结果，请耐心等待。'
    },
    {
        id: 'app-u9',
        uniName: '伦敦大学学院 (UCL)',
        uniLogo: 'https://upload.wikimedia.org/wikipedia/en/d/d1/University_College_London_logo.svg',
        major: 'MSc Computer Science',
        status: 'action_required',
        statusText: '需补充材料',
        progress: 20,
        timeline: [
            { date: '2025-09-28', text: '申请已提交', active: true },
        ],
        latestMessage: '请补充您的本科完整成绩单（中英文盖章版），请在11月1日前上传系统。'
    },
    {
        id: 'app-u26',
        uniName: '曼彻斯特大学',
        uniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/The_University_of_Manchester_Coat_of_Arms.svg/1200px-The_University_of_Manchester_Coat_of_Arms.svg.png',
        major: 'MSc Management',
        status: 'success',
        statusText: '已录取',
        progress: 100,
        timeline: [
            { date: '2025-09-20', text: '申请已提交', active: true },
            { date: '2025-10-10', text: '收到有条件录取通知书 (Conditional Offer)', active: true },
        ],
        latestMessage: '恭喜！您已获得曼彻斯特大学的录取通知书，请在12月1日前确认接受并缴纳押金。'
    }
];
