
import { University, Department, Program, LanguageInstitution, LanguageCourse, SinoForeignProgram, StudentCase } from './types';

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
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Imperial_College_London_new_logo.png/600px-Imperial_College_London_new_logo.png',
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
    { id: 'u1', qs: 1, nameCN: '麻省理工学院', nameEN: 'MIT', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/500px-MIT_logo.svg.png' },
    // u2 is Imperial
    { id: 'u3', qs: 3, nameCN: '牛津大学', nameEN: 'University of Oxford', loc: '英国', country: 'UK', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Oxford_University_Coat_of_Arms.svg/500px-Oxford_University_Coat_of_Arms.svg.png' },
    { id: 'u4', qs: 4, nameCN: '哈佛大学', nameEN: 'Harvard University', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/500px-Harvard_University_coat_of_arms.svg.png' },
    { id: 'u5', qs: 5, nameCN: '剑桥大学', nameEN: 'University of Cambridge', loc: '英国', country: 'UK', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Coat_of_Arms_of_the_University_of_Cambridge.svg/500px-Coat_of_Arms_of_the_University_of_Cambridge.svg.png' },
    { id: 'u6', qs: 6, nameCN: '斯坦福大学', nameEN: 'Stanford University', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/500px-Seal_of_Leland_Stanford_Junior_University.svg.png' },
    { id: 'u7', qs: 7, nameCN: '苏黎世联邦理工学院', nameEN: 'ETH Zurich', loc: '瑞士', country: 'Switzerland', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/ETH_Z%C3%BCrich_Logo_black.svg/500px-ETH_Z%C3%BCrich_Logo_black.svg.png' },
    { id: 'u8', qs: 8, nameCN: '新加坡国立大学', nameEN: 'National University of Singapore', loc: '新加坡', country: 'Singapore', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/NUS_coat_of_arms.svg/500px-NUS_coat_of_arms.svg.png' },
    { id: 'u9', qs: 9, nameCN: '伦敦大学学院', nameEN: 'UCL', loc: '英国', country: 'UK', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/University_College_London_logo.svg/500px-University_College_London_logo.svg.png' },
    { id: 'u10', qs: 10, nameCN: '加州理工学院', nameEN: 'Caltech', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/California_Institute_of_Technology_seal.svg/500px-California_Institute_of_Technology_seal.svg.png' },
    { id: 'u11', qs: 11, nameCN: '宾夕法尼亚大学', nameEN: 'University of Pennsylvania', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UPenn_shield_with_banner.svg/500px-UPenn_shield_with_banner.svg.png' },
    { id: 'u12', qs: 12, nameCN: '加州大学伯克利分校', nameEN: 'UC Berkeley', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/500px-Seal_of_University_of_California%2C_Berkeley.svg.png' },
    { id: 'u13', qs: 13, nameCN: '墨尔本大学', nameEN: 'The University of Melbourne', loc: '澳大利亚', country: 'Australia', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/University_of_Melbourne_Coat_of_Arms.svg/500px-University_of_Melbourne_Coat_of_Arms.svg.png' },
    { id: 'u14', qs: 14, nameCN: '南洋理工大学', nameEN: 'Nanyang Technological University', loc: '新加坡', country: 'Singapore', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Nanyang_Technological_University_coat_of_arms.svg/500px-Nanyang_Technological_University_coat_of_arms.svg.png' },
    { id: 'u15', qs: 15, nameCN: '康奈尔大学', nameEN: 'Cornell University', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/500px-Cornell_University_seal.svg.png' },
    { id: 'u16', qs: 16, nameCN: '香港大学', nameEN: 'The University of Hong Kong', loc: '中国香港', country: 'Hong Kong', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/University_of_Hong_Kong_coat_of_arms.svg/500px-University_of_Hong_Kong_coat_of_arms.svg.png' },
    { id: 'u17', qs: 17, nameCN: '悉尼大学', nameEN: 'The University of Sydney', loc: '澳大利亚', country: 'Australia', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/University_of_Sydney_Coat_of_Arms.svg/500px-University_of_Sydney_Coat_of_Arms.svg.png' },
    { id: 'u18', qs: 18, nameCN: '新南威尔士大学', nameEN: 'UNSW Sydney', loc: '澳大利亚', country: 'Australia', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/UNSW_Coat_of_Arms.svg/500px-UNSW_Coat_of_Arms.svg.png' },
    { id: 'u19', qs: 19, nameCN: '芝加哥大学', nameEN: 'University of Chicago', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/79/University_of_Chicago_shield.svg/500px-University_of_Chicago_shield.svg.png' },
    { id: 'u20', qs: 20, nameCN: '普林斯顿大学', nameEN: 'Princeton University', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/500px-Princeton_seal.svg.png' },
    { id: 'u21', qs: 21, nameCN: '多伦多大学', nameEN: 'University of Toronto', loc: '加拿大', country: 'Canada', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/University_of_Toronto_Coat_of_Arms.svg/500px-University_of_Toronto_Coat_of_Arms.svg.png' },
    { id: 'u22', qs: 22, nameCN: '耶鲁大学', nameEN: 'Yale University', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/500px-Yale_University_Shield_1.svg.png' },
    { id: 'u23', qs: 23, nameCN: '爱丁堡大学', nameEN: 'The University of Edinburgh', loc: '英国', country: 'UK', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/University_of_Edinburgh_Ceremonial_Coat_of_Arms.svg/500px-University_of_Edinburgh_Ceremonial_Coat_of_Arms.svg.png' },
    { id: 'u24', qs: 24, nameCN: '清华大学', nameEN: 'Tsinghua University', loc: '中国', country: 'China', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Tsinghua_University_Logo.svg/500px-Tsinghua_University_Logo.svg.png' },
    { id: 'u25', qs: 25, nameCN: '北京大学', nameEN: 'Peking University', loc: '中国', country: 'China', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Peking_University_seal.svg/500px-Peking_University_seal.svg.png' },
    { id: 'u26', qs: 26, nameCN: '曼彻斯特大学', nameEN: 'The University of Manchester', loc: '英国', country: 'UK', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/The_University_of_Manchester_Coat_of_Arms.svg/500px-The_University_of_Manchester_Coat_of_Arms.svg.png' },
    { id: 'u27', qs: 27, nameCN: '哥伦比亚大学', nameEN: 'Columbia University', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1a/Columbia_University_Shield.svg/500px-Columbia_University_Shield.svg.png' },
    { id: 'u28', qs: 28, nameCN: '巴黎文理研究大学', nameEN: 'PSL University', loc: '法国', country: 'France', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/PSL_Research_University_logo.svg/500px-PSL_Research_University_logo.svg.png' },
    { id: 'u29', qs: 29, nameCN: '东京大学', nameEN: 'The University of Tokyo', loc: '日本', country: 'Japan', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/University_of_Tokyo_Logo.svg/500px-University_of_Tokyo_Logo.svg.png' },
    { id: 'u30', qs: 30, nameCN: '加州大学洛杉矶分校', nameEN: 'UCLA', loc: '美国', country: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/UCLA_Seal_2024.svg/500px-UCLA_Seal_2024.svg.png' },
    { id: 'u31', qs: 31, nameCN: '麦吉尔大学', nameEN: 'McGill University', loc: '加拿大', country: 'Canada', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/McGill_University_Coat_of_Arms.svg/500px-McGill_University_Coat_of_Arms.svg.png' },
    { id: 'u32', qs: 32, nameCN: '澳大利亚国立大学', nameEN: 'Australian National University', loc: '澳大利亚', country: 'Australia', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Australian_National_University_Coat_of_Arms.svg/500px-Australian_National_University_Coat_of_Arms.svg.png' },
    { id: 'u33', qs: 33, nameCN: '伦敦国王学院', nameEN: 'King\'s College London', loc: '英国', country: 'UK', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/King%27s_College_London_Coat_of_Arms.svg/500px-King%27s_College_London_Coat_of_Arms.svg.png' },
    { id: 'u34', qs: 34, nameCN: '复旦大学', nameEN: 'Fudan University', loc: '中国', country: 'China', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Fudan_University_Logo.svg/500px-Fudan_University_Logo.svg.png' },
    { id: 'u35', qs: 35, nameCN: '伦敦政治经济学院', nameEN: 'LSE', loc: '英国', country: 'UK', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/01/LSE_Coat_of_Arms.svg/500px-LSE_Coat_of_Arms.svg.png' },
    { id: 'u36', qs: 36, nameCN: '香港中文大学', nameEN: 'CUHK', loc: '中国香港', country: 'Hong Kong', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/CUHK_Coat_of_Arms.svg/500px-CUHK_Coat_of_Arms.svg.png' },
    { id: 'u37', qs: 37, nameCN: '代尔夫特理工大学', nameEN: 'TU Delft', loc: '荷兰', country: 'Netherlands', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/TU_Delft_Logo.svg/500px-TU_Delft_Logo.svg.png' },
    { id: 'u38', qs: 38, nameCN: '布里斯托大学', nameEN: 'University of Bristol', loc: '英国', country: 'UK', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/University_of_Bristol_coat_of_arms.svg/500px-University_of_Bristol_coat_of_arms.svg.png' },
    { id: 'u39', qs: 39, nameCN: '慕尼黑工业大学', nameEN: 'Technical University of Munich', loc: '德国', country: 'Germany', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Logo_Technical_University_of_Munich.svg/500px-Logo_Technical_University_of_Munich.svg.png' },
    { id: 'u40', qs: 40, nameCN: '阿姆斯特丹大学', nameEN: 'University of Amsterdam', loc: '荷兰', country: 'Netherlands', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/University_of_Amsterdam_coat_of_arms.svg/500px-University_of_Amsterdam_coat_of_arms.svg.png' },
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
        title: "2026 Fall 名校申请全攻略",
        subtitle: "G5 / 藤校 / 港三 录取趋势深度解析"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "名校学长面对面",
        subtitle: "揭秘真实的留学生活与求职路径"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1544531696-9342a533af63?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "背景提升科研营",
        subtitle: "名师带队，助力冲击顶尖名校"
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1526304640152-d4619684e484?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "全球百万奖学金计划",
        subtitle: "优秀学员可获全额学费减免"
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "签证办理绿色通道",
        subtitle: "专业团队护航，拒签全额退款"
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "海外住宿无忧行",
        subtitle: "严选学生公寓，拎包入住"
    }
];

export const latestNewsData = [
    {
        id: 1,
        tag: "重磅",
        title: "英国G5院校26Fall申请时间线汇总已发布",
        date: "10分钟前",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        tag: "政策",
        title: "澳洲留学签证新政解读：利好留学生工签申请",
        date: "1小时前",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        tag: "排名",
        title: "2026 QS世界大学排名发布，MIT连续14年霸榜",
        date: "3小时前",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        tag: "干货",
        title: "如何撰写一份高质量的PS文书？前招生官手把手教你",
        date: "昨天",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    }
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

// ==========================================
// Language Training Data
// ==========================================

export const languageInstitutions: LanguageInstitution[] = [
    {
        id: 'inst-1',
        name: '新东方前途出国',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/New_Oriental_Logo.svg/1200px-New_Oriental_Logo.svg.png',
        tags: ['老牌机构', '语培留学一体', '全国连锁'],
        rating: 4.8,
        studentCount: '10万+',
        description: '新东方旗下高端留学语培品牌，提供雅思、托福、GRE、GMAT等一站式出国语言培训服务。'
    },
    {
        id: 'inst-2',
        name: '环球雅思',
        logo: 'https://companieslogo.com/img/orig/GEDU-011400e2.png?t=1650361259',
        tags: ['雅思专精', '名师云集', '提分快'],
        rating: 4.7,
        studentCount: '5万+',
        description: '专注雅思培训20余年，独创“7系”教学法，帮助数万学子成功屠鸭。'
    },
    {
        id: 'inst-3',
        name: '新航道',
        logo: 'https://img.bosszhipin.com/beijin/mcs/chatphoto/20161209/499298718a2212f71120288f615b1419741604a395272a9e223d6a455a793540.jpg',
        tags: ['高能高分', '学术品质', '精品小班'],
        rating: 4.6,
        studentCount: '3万+',
        description: '坚持“高能高分”的教育理念，提供托福、雅思、SAT等优质出国考试培训。'
    }
];

export const ieltsCoursesData: LanguageCourse[] = [
    { 
        id: 1, 
        institutionId: 'inst-1',
        title: "雅思7分冲刺大班课", 
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", 
        tags: ["名师授课", "保分协议", "晚间班"],
        price: "¥3999",
        originalPrice: "¥5999"
    },
    { 
        id: 2, 
        institutionId: 'inst-1',
        title: "托福100分名师班", 
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", 
        tags: ["全真模考", "技巧精讲"],
        price: "¥4500",
        originalPrice: "¥6000"
    },
    { 
        id: 3, 
        institutionId: 'inst-2',
        title: "雅思口语1对1陪练", 
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", 
        tags: ["外教", "实时反馈", "自由约课"],
        price: "¥299/课时",
        originalPrice: "¥399"
    },
    { 
        id: 4, 
        institutionId: 'inst-2',
        title: "雅思封闭集训营", 
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", 
        tags: ["吃住学一体", "浸泡式学习"],
        price: "¥12800",
        originalPrice: "¥15800"
    },
    { 
        id: 5, 
        institutionId: 'inst-3',
        title: "VIP全科定制提升", 
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", 
        tags: ["前考官", "24h出分", "全托管"],
        price: "¥19800",
        originalPrice: "¥25800"
    }
];

// ==========================================
// Sino-Foreign Cooperation Data
// ==========================================

export const sinoForeignPrograms: SinoForeignProgram[] = [
    // 1. Independent Legal Entity Universities (High Priority)
    {
        id: 'sf-hkust-gz',
        domesticUni: '香港科技大学(广州)',
        foreignUni: '香港科技大学',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/University_of_Hong_Kong_coat_of_arms.svg/500px-University_of_Hong_Kong_coat_of_arms.svg.png', 
        major: '人工智能 / 数据科学 / 智能制造',
        mode: '4+0',
        targetRegion: '港新',
        tuition: '¥100,000 / Year',
        tags: ['独立法人', '港三名校', '大湾区', '高考/自主招生'],
        degree: '本科'
    },
    {
        id: 'sf-cuhk-sz',
        domesticUni: '香港中文大学(深圳)',
        foreignUni: '香港中文大学',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/CUHK_Coat_of_Arms.svg/500px-CUHK_Coat_of_Arms.svg.png',
        major: '经管 / 理工 / 数据科学 / 音乐',
        mode: '4+0',
        targetRegion: '港新',
        tuition: '¥115,000 / Year',
        tags: ['独立法人', '书院制', '全英文', 'QS Top 50'],
        degree: '本科'
    },
    {
        id: 'sf-cityu-dg',
        domesticUni: '香港城市大学(东莞)',
        foreignUni: '香港城市大学',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/City_University_of_Hong_Kong_logo.svg/1200px-City_University_of_Hong_Kong_logo.svg.png',
        major: '智能制造 / 计算机 / 材料 / 能源',
        mode: '4+0',
        targetRegion: '港新',
        tuition: '¥115,000 / Year',
        tags: ['独立法人', '大湾区', '新校区', '科技创新'],
        degree: '本科'
    },
    {
        id: 'sf-uic',
        domesticUni: '北师港浸大 (UIC)',
        foreignUni: '香港浸会大学',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/University_of_Hong_Kong_coat_of_arms.svg/500px-University_of_Hong_Kong_coat_of_arms.svg.png', 
        major: '会计 / 传播 / 统计 / 影视',
        mode: '4+0',
        targetRegion: '港新',
        tuition: '¥100,000 / Year',
        tags: ['独立法人', '博雅大学', '全人教育', '珠海'],
        degree: '本科'
    },
    {
        id: 'sf-nyu-sh',
        domesticUni: '上海纽约大学',
        foreignUni: '纽约大学 (USA)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/79/University_of_Chicago_shield.svg/500px-University_of_Chicago_shield.svg.png', 
        major: '金融 / 计算机 / 互动媒体 / 生物',
        mode: '4+0',
        targetRegion: '北美',
        tuition: '¥200,000 / Year',
        tags: ['独立法人', '中美合办', '通识教育', '第一所中美合办'],
        degree: '本科'
    },
    {
        id: 'sf-dk',
        domesticUni: '昆山杜克大学',
        foreignUni: '杜克大学 (USA)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/500px-MIT_logo.svg.png', 
        major: '材料科学 / 全球健康 / 数据科学',
        mode: '4+0',
        targetRegion: '北美',
        tuition: '¥190,000 / Year',
        tags: ['独立法人', '中美合办', '顶尖藤校资源', '博雅教育'],
        degree: '本科'
    },
    {
        id: 'sf-wku',
        domesticUni: '温州肯恩大学',
        foreignUni: '肯恩大学 (USA)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/22/Kean_University_seal.svg/500px-Kean_University_seal.svg.png',
        major: '商科 / 设计 / 计算机 / 建筑',
        mode: '4+0',
        targetRegion: '北美',
        tuition: '¥75,000 / Year',
        tags: ['独立法人', '美式教育', '全英文', '浙江'],
        degree: '本科'
    },
    {
        id: 'sf-unnc',
        domesticUni: '宁波诺丁汉大学',
        foreignUni: '诺丁汉大学 (UK)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/University_of_Nottingham_coat_of_arms.svg/500px-University_of_Nottingham_coat_of_arms.svg.png',
        major: '商科 / 理工 / 人文 / 航空航天',
        mode: '4+0',
        targetRegion: '英澳',
        tuition: '¥100,000 / Year',
        tags: ['独立法人', '中英合办', '第一所独立法人', '本部学位'],
        degree: '本科'
    },
    {
        id: 'sf-xjtlu',
        domesticUni: '西交利物浦大学',
        foreignUni: '利物浦大学 (UK)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/63/University_of_Liverpool_coat_of_arms.svg/500px-University_of_Liverpool_coat_of_arms.svg.png',
        major: '建筑 / 会计 / 电气 / 计算机',
        mode: '4+0',
        targetRegion: '英澳',
        tuition: '¥93,000 / Year',
        tags: ['独立法人', '强强联合', '规模最大', '自主招生'],
        degree: '本科'
    },
    {
        id: 'sf-smbu',
        domesticUni: '深圳北理莫斯科大学',
        foreignUni: '莫斯科国立大学 (Russia)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/640px-Flag_of_the_United_Kingdom.svg.png', 
        major: '数学 / 物理 / 俄语 / 金融科技',
        mode: '4+0',
        targetRegion: '欧洲',
        tuition: '¥40,000 / Year',
        tags: ['独立法人', '中俄合办', '精英教育', '双学籍', '高性价比'],
        degree: '本科'
    },
    {
        id: 'sf-gtiit',
        domesticUni: '广东以色列理工学院',
        foreignUni: '以色列理工学院',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/640px-Flag_of_the_United_Kingdom.svg.png', 
        major: '化工 / 生物技术 / 机械 / 材料',
        mode: '4+0',
        targetRegion: '欧洲',
        tuition: '¥95,000 / Year',
        tags: ['独立法人', '理工强校', '创新之国', '科创'],
        degree: '本科'
    },

    // 2. Non-Independent Institutes (Selected Prominent Ones)
    {
        id: 'sf-buaa-central',
        domesticUni: '北京航空航天大学',
        foreignUni: '法国中央理工集团',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/PSL_Research_University_logo.svg/500px-PSL_Research_University_logo.svg.png', 
        major: '中法工程师学院 (信息/机械)',
        mode: '4+0',
        targetRegion: '欧洲',
        tuition: '按国家标准',
        tags: ['985', '本硕连读', '精英工程师'],
        degree: '本科'
    },
    {
        id: 'sf-bjut-ucd',
        domesticUni: '北京工业大学',
        foreignUni: '都柏林大学 (Ireland)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/The_University_of_Manchester_Coat_of_Arms.svg/500px-The_University_of_Manchester_Coat_of_Arms.svg.png',
        major: '北京-都柏林国际学院 (物联网/金融)',
        mode: '4+0',
        targetRegion: '欧洲',
        tuition: '¥75,000 / Year',
        tags: ['211', '双学位', '全英文'],
        degree: '本科'
    },
    {
        id: 'sf-buct-paris',
        domesticUni: '北京化工大学',
        foreignUni: '巴黎居里工程师学校',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/PSL_Research_University_logo.svg/500px-PSL_Research_University_logo.svg.png', 
        major: '巴黎居里工程师学院 (化工/生物)',
        mode: '4+0',
        targetRegion: '欧洲',
        tuition: '¥40,000 / Year',
        tags: ['211', '工程师教育', '法式培养'],
        degree: '本科'
    },
    {
        id: 'sf-usst-sbc',
        domesticUni: '上海理工大学',
        foreignUni: '谢菲尔德/利兹等9所英国大学',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/640px-Flag_of_the_United_Kingdom.svg.png',
        major: '中英国际学院 (SBC) (工商/工程)',
        mode: '4+0',
        targetRegion: '英澳',
        tuition: '¥80,000 / Year',
        tags: ['多校合作', '位于上海市区', '商科/工程'],
        degree: '本科'
    },
    {
        id: 'sf-sjtu-ji',
        domesticUni: '上海交通大学',
        foreignUni: '密西根大学 (USA)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/79/University_of_Chicago_shield.svg/500px-University_of_Chicago_shield.svg.png', 
        major: '密西根学院 (机械/电子/材料)',
        mode: '4+0',
        targetRegion: '北美',
        tuition: '¥75,000 / Year',
        tags: ['985名校', '顶尖工科', '双学位', '全英文'],
        degree: '本科'
    },
    {
        id: 'sf-silc',
        domesticUni: '上海大学',
        foreignUni: '悉尼科技大学 (AUS)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/50/University_of_Technology_Sydney_coat_of_arms.svg/500px-University_of_Technology_Sydney_coat_of_arms.svg.png',
        major: '悉尼工商学院 (金融/国贸/信管)',
        mode: '4+0',
        targetRegion: '英澳',
        tuition: '¥49,000 / Year',
        tags: ['211大学', 'AACSB认证', '高性价比'],
        degree: '本科'
    },
    {
        id: 'sf-sjtu-paris',
        domesticUni: '上海交通大学',
        foreignUni: '巴黎高科 (France)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/PSL_Research_University_logo.svg/500px-PSL_Research_University_logo.svg.png', 
        major: '巴黎卓越工程师学院 (机械/能源/信息)',
        mode: '4+0',
        targetRegion: '欧洲',
        tuition: '¥45,000 / Year',
        tags: ['985', '卓工计划', '法语+工程'],
        degree: '本科'
    },
    {
        id: 'sf-zju-zje',
        domesticUni: '浙江大学',
        foreignUni: '爱丁堡大学 (UK)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/University_of_Edinburgh_Ceremonial_Coat_of_Arms.svg/500px-University_of_Edinburgh_Ceremonial_Coat_of_Arms.svg.png',
        major: '浙大爱丁堡联合学院 (生物医学/信息)',
        mode: '4+0',
        targetRegion: '英澳',
        tuition: '¥160,000 / Year',
        tags: ['C9', '双名校', '生物医学强强联合'],
        degree: '本科'
    },
    {
        id: 'sf-zju-zjui',
        domesticUni: '浙江大学',
        foreignUni: '伊利诺伊大学厄巴纳香槟校区 (USA)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/79/University_of_Chicago_shield.svg/500px-University_of_Chicago_shield.svg.png', 
        major: 'ZJUI联合学院 (电子/计算机/机械/土木)',
        mode: '4+0',
        targetRegion: '北美',
        tuition: '¥160,000 / Year',
        tags: ['C9', '顶尖工科', 'UIUC学位'],
        degree: '本科'
    },
    {
        id: 'sf-uestc-glasgow',
        domesticUni: '电子科技大学',
        foreignUni: '格拉斯哥大学 (UK)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/640px-Flag_of_the_United_Kingdom.svg.png',
        major: '格拉斯哥学院 (电子信息/通信)',
        mode: '4+0',
        targetRegion: '英澳',
        tuition: '¥60,000 / Year',
        tags: ['985', '电子类强校', '双学位'],
        degree: '本科'
    },
    {
        id: 'sf-swufe-ud',
        domesticUni: '西南财经大学',
        foreignUni: '特拉华大学 (USA)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/79/University_of_Chicago_shield.svg/500px-University_of_Chicago_shield.svg.png', 
        major: '特拉华数据科学学院 (信管/物流/金融)',
        mode: '4+0',
        targetRegion: '北美',
        tuition: '¥96,000 / Year',
        tags: ['211财经', '数据科学', '美式商科'],
        degree: '本科'
    },
    {
        id: 'sf-ouc-arizona',
        domesticUni: '中国海洋大学',
        foreignUni: '亚利桑那大学 (USA)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/79/University_of_Chicago_shield.svg/500px-University_of_Chicago_shield.svg.png', 
        major: '海德学院 (法学/生物/食品)',
        mode: '4+0',
        targetRegion: '北美',
        tuition: '¥70,000 / Year',
        tags: ['985', '法学特色', '海洋学科'],
        degree: '本科'
    },
    {
        id: 'sf-jinan-bham',
        domesticUni: '暨南大学',
        foreignUni: '伯明翰大学 (UK)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/640px-Flag_of_the_United_Kingdom.svg.png',
        major: '暨南伯明翰联合学院 (数学/经济/信计)',
        mode: '4+0',
        targetRegion: '英澳',
        tuition: '¥70,000 / Year',
        tags: ['211', '百年名校', '数学经济'],
        degree: '本科'
    },
    {
        id: 'sf-hnu-asu',
        domesticUni: '海南大学',
        foreignUni: '亚利桑那州立大学 (USA)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/79/University_of_Chicago_shield.svg/500px-University_of_Chicago_shield.svg.png', 
        major: '国际旅游学院 (酒店管理/旅游/行政)',
        mode: '4+0',
        targetRegion: '北美',
        tuition: '¥60,000 / Year',
        tags: ['211', '旅游管理强项', '海南自贸区'],
        degree: '本科'
    },

    // 3. Single Project Programs (Selected & Representative)
    {
        id: 'sf-cufe-vu',
        domesticUni: '中央财经大学',
        foreignUni: '维多利亚大学 (AUS)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Australian_National_University_Coat_of_Arms.svg/500px-Australian_National_University_Coat_of_Arms.svg.png',
        major: '国际经济与贸易',
        mode: '4+0', 
        targetRegion: '英澳',
        tuition: '¥70,000 / Year',
        tags: ['211财经', '项目办学', '商科'],
        degree: '本科'
    },
    {
        id: 'sf-cau-corn',
        domesticUni: '中国农业大学',
        foreignUni: '科罗拉多大学丹佛分校 / 康奈尔大学',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/500px-Cornell_University_seal.svg.png',
        major: '国际经济与贸易 / 传播学 / 食品科学',
        mode: '4+0', 
        targetRegion: '北美',
        tuition: '按学分/具体项目',
        tags: ['985', '老牌项目', '经济/传播/食品'],
        degree: '本科'
    },
    {
        id: 'sf-bit-usu',
        domesticUni: '北京理工大学',
        foreignUni: '犹他州立大学 (USA)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/79/University_of_Chicago_shield.svg/500px-University_of_Chicago_shield.svg.png',
        major: '国际经济',
        mode: '4+0',
        targetRegion: '北美',
        tuition: '¥60,000 / Year',
        tags: ['985', '自主招生', '经济学'],
        degree: '本科'
    },
    {
        id: 'sf-bupt-qmul',
        domesticUni: '北京邮电大学',
        foreignUni: '伦敦玛丽女王大学 (UK)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/640px-Flag_of_the_United_Kingdom.svg.png',
        major: '电信工程及管理 / 电子商务及法律 / 物联网',
        mode: '4+0',
        targetRegion: '英澳',
        tuition: '¥70,000 / Year',
        tags: ['211', '北邮王牌', '双学位'],
        degree: '本科'
    },
    {
        id: 'sf-cuc-media',
        domesticUni: '中国传媒大学',
        foreignUni: '密苏里哥伦比亚/诺丁汉特伦特等',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/640px-Flag_of_the_United_Kingdom.svg.png',
        major: '传播学 / 广告学 / 文化产业管理',
        mode: '4+0',
        targetRegion: '英澳', // Mixed actually
        tuition: '¥50,000+ / Year',
        tags: ['211', '传媒顶尖', '艺术类'],
        degree: '本科'
    },
    {
        id: 'sf-jnu-bham',
        domesticUni: '暨南大学',
        foreignUni: '伯明翰大学 (UK)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/640px-Flag_of_the_United_Kingdom.svg.png',
        major: '数学 / 经济学 / 经济统计学 / 信息与计算科学',
        mode: '4+0',
        targetRegion: '英澳',
        tuition: '¥70,000 / Year',
        tags: ['211', '数学经济', '双学位'],
        degree: '本科'
    },
    {
        id: 'sf-scut-nantes',
        domesticUni: '华南理工大学',
        foreignUni: '南特大学等 (France)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/PSL_Research_University_logo.svg/500px-PSL_Research_University_logo.svg.png',
        major: '微电子 / 城市设计',
        mode: '3+1', // Often mixed
        targetRegion: '欧洲',
        tuition: '¥60,000+ / Year',
        tags: ['985', '工科强项', '欧洲合作'],
        degree: '本科'
    },
    {
        id: 'sf-whu-dundee',
        domesticUni: '武汉大学',
        foreignUni: '邓迪大学 (UK)',
        foreignUniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/640px-Flag_of_the_United_Kingdom.svg.png',
        major: '建筑学',
        mode: '4+1', // Typically 5 years for architecture
        targetRegion: '英澳',
        tuition: '¥55,000 / Year',
        tags: ['985', '建筑老八校', '双学位'],
        degree: '本科'
    }
];

export const applicationStatusData = [
    {
        id: 'app-u2',
        uniName: '帝国理工学院',
        uniLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Imperial_College_London_new_logo.png/600px-Imperial_College_London_new_logo.png',
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
        uniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/University_College_London_logo.svg/500px-University_College_London_logo.svg.png',
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
        uniLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/The_University_of_Manchester_Coat_of_Arms.svg/500px-The_University_of_Manchester_Coat_of_Arms.svg.png',
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

// ==========================================
// Student Success Cases
// ==========================================

export const studentCases: StudentCase[] = [
    {
        id: 'case-1',
        studentName: '张同学',
        admitCountry: 'UK',
        admitUniversity: '帝国理工学院',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Imperial_College_London_new_logo.png/600px-Imperial_College_London_new_logo.png',
        admitMajor: 'MSc Business Analytics',
        admitYear: '2025 Fall',
        undergradUniversity: '上海交通大学',
        undergradMajor: '数学与应用数学',
        gpa: '88/100',
        languageScore: 'IELTS 7.5 (6.5)',
        greGmat: 'GRE 325',
        research: [
            '2024年全国大学生数学建模竞赛一等奖',
            '校级科研项目：基于机器学习的金融风险预测模型'
        ],
        internship: [
            '中金公司 (CICC) - 投行部实习生',
            '字节跳动 - 数据分析实习生'
        ],
        tags: ['G5名校', '跨专业', '高标化'],
        advisorComment: '张同学的数理背景非常扎实，这是申请BA专业的一大优势。在文书中我们重点突出了他在实习中运用数学模型解决实际商业问题的能力，弥补了商科背景的不足。'
    },
    {
        id: 'case-2',
        studentName: '李同学',
        admitCountry: 'UK',
        admitUniversity: '伦敦大学学院 (UCL)',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/University_College_London_logo.svg/500px-University_College_London_logo.svg.png',
        admitMajor: 'MSc Education',
        admitYear: '2025 Fall',
        undergradUniversity: '华东师范大学',
        undergradMajor: '英语教育',
        gpa: '3.6/4.0',
        languageScore: 'IELTS 7.0 (6.0)',
        research: [
            '参与编撰《初中英语教学法探究》',
            '曾在偏远山区支教3个月'
        ],
        internship: [
            '新东方 - 英语助教',
            '某公立中学 - 实习班主任'
        ],
        tags: ['科班出身', '丰富实践', 'QS Top 10'],
        advisorComment: '李同学的软背景非常丰富，支教经历是最大的亮点。我们在文书中将这段经历升华为对教育公平的深度思考，深深打动了招生官。'
    },
    {
        id: 'case-3',
        studentName: '王同学',
        admitCountry: 'USA',
        admitUniversity: '哥伦比亚大学',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1a/Columbia_University_Shield.svg/500px-Columbia_University_Shield.svg.png',
        admitMajor: 'MS Financial Engineering',
        admitYear: '2025 Fall',
        undergradUniversity: '波士顿大学 (美本)',
        undergradMajor: 'Economics',
        gpa: '3.8/4.0',
        languageScore: '免语言',
        greGmat: 'GRE 330',
        research: [
            'Dean\'s List',
            '协助教授进行宏观经济数据清洗与分析'
        ],
        internship: [
            'Morgan Stanley (NY) - Summer Analyst',
            'Deloitte (Shanghai) - Risk Advisory'
        ],
        tags: ['藤校录取', '海本背景', '顶尖金工'],
        advisorComment: '王同学是典型的美本高材生，GRE分数极高。申请策略上我们主攻金工强校，利用他在纽约的实习经历展示了强大的Networking能力和职业规划。'
    },
    {
        id: 'case-4',
        studentName: '赵同学',
        admitCountry: 'Singapore',
        admitUniversity: '新加坡国立大学',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/NUS_coat_of_arms.svg/500px-NUS_coat_of_arms.svg.png',
        admitMajor: 'MSc Computer Science',
        admitYear: '2025 Spring',
        undergradUniversity: '北京邮电大学',
        undergradMajor: '计算机科学与技术',
        gpa: '85/100',
        languageScore: 'TOEFL 102',
        research: [
            '发表 IEEE 会议论文一篇 (二作)',
            'GitHub 开源项目 500+ Star'
        ],
        internship: [
            '腾讯 - 后端开发实习生',
            '商汤科技 - 算法实习生'
        ],
        tags: ['亚洲第一', '强科研', '大厂实习'],
        advisorComment: '赵同学的代码能力很强，科研产出是核心竞争力。我们在文书中详细阐述了他的论文贡献，证明他完全具备研究生阶段的科研潜力。'
    },
     {
        id: 'case-5',
        studentName: '刘同学',
        admitCountry: 'Australia',
        admitUniversity: '悉尼大学',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/University_of_Sydney_Coat_of_Arms.svg/500px-University_of_Sydney_Coat_of_Arms.svg.png',
        admitMajor: 'Master of Media Practice',
        admitYear: '2025 Feb',
        undergradUniversity: '浙江传媒学院',
        undergradMajor: '广播电视编导',
        gpa: '82/100',
        languageScore: 'IELTS 6.5',
        research: [],
        internship: [
            '湖南卫视 - 节目组实习',
            '小红书 - 内容运营实习'
        ],
        tags: ['双非逆袭', '传媒名校', '作品集优秀'],
        advisorComment: '虽然本科院校双非，但刘同学的实践经历非常亮眼，且作品集制作精良。悉尼大学非常看重学生的实际操作能力，这也是成功录取的关键。'
    },
    // New Cases Added Below
    {
        id: 'case-6',
        studentName: '陈同学',
        admitCountry: 'UK',
        admitUniversity: '牛津大学',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Oxford_University_Coat_of_Arms.svg/500px-Oxford_University_Coat_of_Arms.svg.png',
        admitMajor: 'MSc Financial Economics',
        admitYear: '2025 Fall',
        undergradUniversity: '北京大学',
        undergradMajor: '金融学',
        gpa: '3.8/4.0',
        languageScore: 'IELTS 8.0',
        greGmat: 'GRE 332',
        research: ['核心期刊发表一篇', '校级科研基金负责人'],
        internship: ['高盛 (Goldman Sachs) - IBD', 'BCG - PTA'],
        tags: ['顶级名校', '高GPA', '大牛实习'],
        advisorComment: '陈同学的背景无懈可击，我们在文书中着重强调了她对宏观经济周期的独特见解，以及在顶级投行实习中的实战思考。'
    },
    {
        id: 'case-7',
        studentName: '林同学',
        admitCountry: 'UK',
        admitUniversity: '剑桥大学',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Coat_of_Arms_of_the_University_of_Cambridge.svg/500px-Coat_of_Arms_of_the_University_of_Cambridge.svg.png',
        admitMajor: 'MPhil in Education',
        admitYear: '2025 Fall',
        undergradUniversity: '北京师范大学',
        undergradMajor: '教育学',
        gpa: '89/100',
        languageScore: 'IELTS 7.5',
        research: ['SSCI 二作一篇', '参与国家级教育课题'],
        internship: ['UNESCO (联合国教科文组织) 实习', '某公立高中教学实习'],
        tags: ['学术导向', '国际视野', '教育情怀'],
        advisorComment: '林同学的科研能力在本科阶段非常突出，且有国际组织实习经历。申请剑桥MPhil时，我们重点打造了她的Research Proposal，展现了极高的学术潜力。'
    },
    {
        id: 'case-8',
        studentName: '黄同学',
        admitCountry: 'UK',
        admitUniversity: '伦敦政治经济学院 (LSE)',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/01/LSE_Coat_of_Arms.svg/500px-LSE_Coat_of_Arms.svg.png',
        admitMajor: 'MSc Media and Communications',
        admitYear: '2025 Fall',
        undergradUniversity: '中国传媒大学',
        undergradMajor: '传播学',
        gpa: '86/100',
        languageScore: 'IELTS 7.5',
        research: ['挑战杯全国二等奖'],
        internship: ['奥美 (Ogilvy) - 策略部实习', 'CCTV - 新闻中心实习'],
        tags: ['传媒强校', '4A实习', '女神校'],
        advisorComment: 'LSE非常看重学生的批判性思维。黄同学的实习经历很光鲜，我们帮助她从实习中提炼出对数字媒体伦理的深刻思考，而非简单的罗列工作内容。'
    },
    {
        id: 'case-9',
        studentName: '周同学',
        admitCountry: 'UK',
        admitUniversity: '曼彻斯特大学',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/The_University_of_Manchester_Coat_of_Arms.svg/500px-The_University_of_Manchester_Coat_of_Arms.svg.png',
        admitMajor: 'MSc Advanced Computer Science',
        admitYear: '2025 Fall',
        undergradUniversity: '西安电子科技大学',
        undergradMajor: '计算机科学',
        gpa: '82/100',
        languageScore: 'IELTS 6.5',
        research: ['校级大创项目负责人'],
        internship: ['华为 - 软件开发实习生'],
        tags: ['211录取', 'CS强校', '就业导向'],
        advisorComment: '周同学GPA不算顶尖，但来自计算机强校且有华为实习。曼大CS竞争激烈，我们突出了他在分布式系统方面的工程落地能力，成功拿到Offer。'
    },
    {
        id: 'case-10',
        studentName: '吴同学',
        admitCountry: 'UK',
        admitUniversity: '爱丁堡大学',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/University_of_Edinburgh_Ceremonial_Coat_of_Arms.svg/500px-University_of_Edinburgh_Ceremonial_Coat_of_Arms.svg.png',
        admitMajor: 'MSc Artificial Intelligence',
        admitYear: '2025 Fall',
        undergradUniversity: '四川大学',
        undergradMajor: '软件工程',
        gpa: '85/100',
        languageScore: 'IELTS 7.0',
        research: ['CVPR Workshop 投稿一篇'],
        internship: ['旷视科技 - 算法实习'],
        tags: ['AI热门', '科研加分', '985背景'],
        advisorComment: '爱丁堡的AI专业欧洲顶尖。吴同学虽然均分中规中矩，但有一段高质量的CVPR投稿经历，这是他从众多申请者中脱颖而出的关键。'
    },
    {
        id: 'case-11',
        studentName: '郑同学',
        admitCountry: 'USA',
        admitUniversity: '麻省理工学院 (MIT)',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/500px-MIT_logo.svg.png',
        admitMajor: 'Master of Finance',
        admitYear: '2025 Fall',
        undergradUniversity: '清华大学',
        undergradMajor: '经济与金融',
        gpa: '3.9/4.0',
        languageScore: 'TOEFL 112',
        greGmat: 'GRE 335',
        research: ['清华经管学院 - 助研'],
        internship: ['中信证券 - 投行部', 'Citadel - 量化实习'],
        tags: ['彩票录取', '量化金融', '顶尖标化'],
        advisorComment: 'MIT MFin是全球最难申请的项目之一。郑同学不仅硬件满分，更在Citadel有一段含金量极高的量化经历，完美契合MIT对数理能力的极致追求。'
    },
    {
        id: 'case-12',
        studentName: '孙同学',
        admitCountry: 'USA',
        admitUniversity: '斯坦福大学',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/500px-Seal_of_Leland_Stanford_Junior_University.svg.png',
        admitMajor: 'MS Computer Science',
        admitYear: '2025 Fall',
        undergradUniversity: '上海交通大学',
        undergradMajor: 'ACM班',
        gpa: '92/100',
        languageScore: 'TOEFL 110',
        research: ['NeurIPS 一作', 'ACM ICPC 金牌'],
        internship: ['Google (Beijing) - SWE Intern'],
        tags: ['神级Offer', '硬核科研', '竞赛金牌'],
        advisorComment: '对于斯坦福CS来说，高GPA只是门槛。孙同学的ACM金牌和顶会一作才是真正的杀手锏，证明了他是世界级的计算机人才。'
    },
    {
        id: 'case-13',
        studentName: '马同学',
        admitCountry: 'USA',
        admitUniversity: '宾夕法尼亚大学',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UPenn_shield_with_banner.svg/500px-UPenn_shield_with_banner.svg.png',
        admitMajor: 'MSE Data Science',
        admitYear: '2025 Fall',
        undergradUniversity: '浙江大学',
        undergradMajor: '统计学',
        gpa: '3.85/4.0',
        languageScore: 'TOEFL 105',
        greGmat: 'GRE 330',
        research: ['数据挖掘实验室 - 项目组长'],
        internship: ['阿里云 - 数据分析师'],
        tags: ['藤校工程', '统计背景', 'DS热门'],
        advisorComment: '马同学的统计学背景非常扎实，我们在文书中展示了他如何运用统计学原理解决复杂的大数据问题，这种跨学科的思维深受宾大工学院喜爱。'
    },
    {
        id: 'case-14',
        studentName: '朱同学',
        admitCountry: 'USA',
        admitUniversity: '康奈尔大学',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/500px-Cornell_University_seal.svg.png',
        admitMajor: 'MPS Information Science',
        admitYear: '2025 Fall',
        undergradUniversity: '对外经济贸易大学',
        undergradMajor: '信息管理与信息系统',
        gpa: '3.6/4.0',
        languageScore: 'TOEFL 103',
        greGmat: 'GRE 324',
        research: [],
        internship: ['腾讯 - 产品经理培训生', '滴滴 - 交互设计实习'],
        tags: ['就业导向', '产品经理', '藤校MPS'],
        advisorComment: '康奈尔的MPS项目非常职业导向。朱同学虽然科研不多，但两段互联网大厂的产品实习经历非常对口，文书重点突出了他的产品思维和用户洞察。'
    },
    {
        id: 'case-15',
        studentName: '胡同学',
        admitCountry: 'USA',
        admitUniversity: '加州大学洛杉矶分校 (UCLA)',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/UCLA_Seal_2024.svg/500px-UCLA_Seal_2024.svg.png',
        admitMajor: 'MS Business Analytics',
        admitYear: '2025 Fall',
        undergradUniversity: '复旦大学',
        undergradMajor: '市场营销',
        gpa: '3.5/4.0',
        languageScore: 'TOEFL 104',
        greGmat: 'GRE 325',
        research: ['消费者行为研究课题'],
        internship: ['LVMH - 数据营销实习', '尼尔森 - 市场分析'],
        tags: ['公立常春藤', '商科转码', '加州就业'],
        advisorComment: '胡同学是典型的商科转BA。虽然编程基础薄弱，但他补修了Python和SQL课程，并在实习中展现了极强的数据敏感度，成功说服了招生官。'
    },
    {
        id: 'case-16',
        studentName: '郭同学',
        admitCountry: 'Hong Kong',
        admitUniversity: '香港大学',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/University_of_Hong_Kong_coat_of_arms.svg/500px-University_of_Hong_Kong_coat_of_arms.svg.png',
        admitMajor: 'Master of Economics',
        admitYear: '2025 Fall',
        undergradUniversity: '中央财经大学',
        undergradMajor: '财政学',
        gpa: '87/100',
        languageScore: 'IELTS 7.0',
        research: ['普惠金融调研报告'],
        internship: ['中国银行 - 总行管培实习'],
        tags: ['港三名校', '财经强校', '高性价比'],
        advisorComment: '港大MEcon竞争激烈，偏爱财经名校生。郭同学作为央财学子，背景非常契合。我们帮助他梳理了对大湾区经济政策的理解，增加了文书的深度。'
    },
    {
        id: 'case-17',
        studentName: '何同学',
        admitCountry: 'Hong Kong',
        admitUniversity: '香港中文大学',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/CUHK_Coat_of_Arms.svg/500px-CUHK_Coat_of_Arms.svg.png',
        admitMajor: 'MSc Marketing',
        admitYear: '2025 Fall',
        undergradUniversity: '深圳大学',
        undergradMajor: '工商管理',
        gpa: '3.6/4.0',
        languageScore: 'IELTS 6.5',
        research: [],
        internship: ['大疆 (DJI) - 市场部实习', '快手 - 运营实习'],
        tags: ['大湾区就业', '双非逆袭', '实战经验'],
        advisorComment: '何同学虽然本科双非，但深大在深圳认可度极高，且有大疆的硬核实习。港中文非常看重学生的实战能力，这份Offer是对其实践经验的肯定。'
    },
    {
        id: 'case-18',
        studentName: '高同学',
        admitCountry: 'Singapore',
        admitUniversity: '南洋理工大学 (NTU)',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Nanyang_Technological_University_coat_of_arms.svg/500px-Nanyang_Technological_University_coat_of_arms.svg.png',
        admitMajor: 'MSc Analytics',
        admitYear: '2025 Fall',
        undergradUniversity: '中山大学',
        undergradMajor: '信息与计算科学',
        gpa: '3.7/4.0',
        languageScore: 'TOEFL 100',
        greGmat: 'GRE 322',
        research: ['Kaggle 比赛银牌'],
        internship: ['平安科技 - 数据算法实习'],
        tags: ['新二名校', '就业热门', '数理背景'],
        advisorComment: 'NTU的Analytics项目侧重技术落地。高同学不仅有扎实的数学功底，还有Kaggle获奖经历，这直接证明了他解决实际问题的能力。'
    },
    {
        id: 'case-19',
        studentName: '罗同学',
        admitCountry: 'Australia',
        admitUniversity: '墨尔本大学',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/University_of_Melbourne_Coat_of_Arms.svg/500px-University_of_Melbourne_Coat_of_Arms.svg.png',
        admitMajor: 'Master of Information Technology',
        admitYear: '2025 Feb',
        undergradUniversity: '武汉大学',
        undergradMajor: '测绘工程',
        gpa: '80/100',
        languageScore: 'IELTS 6.5',
        research: [],
        internship: ['武汉某软件公司 - Java实习'],
        tags: ['澳洲第一', '转专业CS', '工科转码'],
        advisorComment: '罗同学本科是传统工科，想转CS。墨尔本大学的MIT项目对非CS背景学生非常友好，只要加权均分达标即可录取，是转码的黄金跳板。'
    },
    {
        id: 'case-20',
        studentName: '梁同学',
        admitCountry: 'Australia',
        admitUniversity: '新南威尔士大学 (UNSW)',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/UNSW_Coat_of_Arms.svg/500px-UNSW_Coat_of_Arms.svg.png',
        admitMajor: 'Master of Engineering Science',
        admitYear: '2025 Feb',
        undergradUniversity: '北京理工大学',
        undergradMajor: '车辆工程',
        gpa: '78/100',
        languageScore: 'IELTS 6.5',
        research: ['大学生方程式赛车队成员'],
        internship: [],
        tags: ['工科强校', '低分录取', '宽进严出'],
        advisorComment: '梁同学均分不到80，申请英美强校有难度。但UNSW工科全澳第一，且对985学生均分要求较宽松，是他提升学历背景的最佳选择。'
    },
    {
        id: 'case-21',
        studentName: '宋同学',
        admitCountry: 'Australia',
        admitUniversity: '澳大利亚国立大学 (ANU)',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Australian_National_University_Coat_of_Arms.svg/500px-Australian_National_University_Coat_of_Arms.svg.png',
        admitMajor: 'Master of Computing',
        admitYear: '2025 Feb',
        undergradUniversity: '中国海洋大学',
        undergradMajor: '计算机科学',
        gpa: '82/100',
        languageScore: 'IELTS 6.5',
        research: [],
        internship: ['青岛某科技公司实习'],
        tags: ['澳洲八大', '985背景', '移民加分'],
        advisorComment: 'ANU学术氛围浓厚，且位于堪培拉，有移民政策优势。宋同学看重未来的澳洲发展机会，ANU的计算机硕士是兼顾学术与移民的优选。'
    },
    {
        id: 'case-22',
        studentName: '许同学',
        admitCountry: 'UK',
        admitUniversity: '伦敦国王学院 (KCL)',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/King%27s_College_London_Coat_of_Arms.svg/500px-King%27s_College_London_Coat_of_Arms.svg.png',
        admitMajor: 'MA Digital Asset & Media Management',
        admitYear: '2025 Fall',
        undergradUniversity: '暨南大学',
        undergradMajor: '新闻学',
        gpa: '85/100',
        languageScore: 'IELTS 7.0',
        research: ['自媒体账号粉丝 5w+'],
        internship: ['网易游戏 - 社区运营'],
        tags: ['KCL热门', '数字媒体', '作品集'],
        advisorComment: 'KCL的DAMM专业非常火爆。许同学不仅有传统的媒体实习，自己运营的自媒体账号数据也很好，这种“网感”和实操能力是KCL非常看重的。'
    },
    {
        id: 'case-23',
        studentName: '邓同学',
        admitCountry: 'UK',
        admitUniversity: '布里斯托大学',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/University_of_Bristol_coat_of_arms.svg/500px-University_of_Bristol_coat_of_arms.svg.png',
        admitMajor: 'MSc Robotics',
        admitYear: '2025 Fall',
        undergradUniversity: '哈尔滨工业大学',
        undergradMajor: '机械电子',
        gpa: '83/100',
        languageScore: 'IELTS 6.5',
        research: ['机器人大赛国奖'],
        internship: [],
        tags: ['工科强校', '机器人', 'C9背景'],
        advisorComment: '布里斯托的机器人专业全英领先。邓同学来自C9名校哈工大，且有机器人大赛获奖经历，背景非常硬核，轻松获得录取。'
    },
    {
        id: 'case-24',
        studentName: '曹同学',
        admitCountry: 'USA',
        admitUniversity: '芝加哥大学',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/79/University_of_Chicago_shield.svg/500px-University_of_Chicago_shield.svg.png',
        admitMajor: 'Master of Public Policy (MPP)',
        admitYear: '2025 Fall',
        undergradUniversity: '中国人民大学',
        undergradMajor: '公共管理',
        gpa: '3.7/4.0',
        languageScore: 'TOEFL 108',
        greGmat: 'GRE 328',
        research: ['社会治理课题调研'],
        internship: ['某知名NGO', '联合国志愿人员 (UNV)'],
        tags: ['社科神校', '公益情怀', 'MPP'],
        advisorComment: '芝加哥大学MPP强调数理分析。曹同学不仅有丰富的NGO经历体现情怀，GRE数学满分也证明了逻辑能力，是典型的“有情怀也有头脑”的申请者。'
    },
    {
        id: 'case-25',
        studentName: '谢同学',
        admitCountry: 'USA',
        admitUniversity: '哈佛大学',
        admitUniversityLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/500px-Harvard_University_coat_of_arms.svg.png',
        admitMajor: 'Master in Design Studies (MDes)',
        admitYear: '2025 Fall',
        undergradUniversity: '同济大学',
        undergradMajor: '建筑学',
        gpa: '4.5/5.0',
        languageScore: 'TOEFL 106',
        greGmat: 'GRE 322',
        research: ['城市更新设计工作坊'],
        internship: ['Gensler (Shanghai) - 建筑实习'],
        tags: ['建筑老八校', '顶尖设计', '作品集大神'],
        advisorComment: '对于设计类申请，作品集大于一切。谢同学的作品集极具前瞻性，探讨了后疫情时代的城市空间重构，深刻的立意打动了哈佛设计学院的教授。'
    }
];
