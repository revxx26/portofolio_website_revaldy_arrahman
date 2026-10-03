import {profile, projects, skills, volunteering, certifications} from './portfolio';
import {experiences} from './experience';

export const fallbackContent = {
  profile: {...profile, analyticsId: '', linkedinLabel: 'Revaldy Arrahman', githubLabel: 'revxx26',
    greeting: 'Hello, I’m Revaldy.', headline: 'Data Analyst & Data Engineer Enthusiast',
    intro: 'I work with data to find the useful information within it. From careful preparation to clear analysis, I’m interested in how data becomes something people can use.',
    opportunity: 'Interested in internships & early-career opportunities',
    aboutTitle: 'A curious mind. A careful approach.',
    aboutIntro: 'I’m an Information Systems student with an interest in the whole data journey: how it’s prepared, what it tells us, and how we communicate it.',
    aboutBody: 'I enjoy finding patterns, checking data quality, and making results easy to understand. I’m detail-oriented, adaptable, and comfortable working with a team.',
    university: 'Universitas Bina Sarana Informatika', universityLogo: '/images/organizations/ubsi-128.webp', degree: 'Information Systems', gpa: '3.84', semester: 'SEMESTER 7',
    contactIntro: 'I’m interested in Data Analyst and Data Engineer internships and early-career opportunities.',
  },
  projects: projects.map((project, index) => ({...project, demo: index === 0 ? 'https://public.tableau.com/views/CustomerChurnRiskTelcoDashboard/CustomerChurnRiskDashboard' : '', contribution: project.contribution || '', width: [1597, 494, 642][index], height: [888, 451, 475][index], additionalImages: project.additionalImages.map(figure => ({...figure, width: 950, height: figure.src.includes('evaluation') ? 178 : 324}))})),
  experiences, volunteering: volunteering.map(item => ({...item, gallery: [] as GalleryFigure[]})), certifications: certifications.map(item => ({...item, gallery: [] as GalleryFigure[]})), skills,
};
export type GalleryFigure = {src: string; alt: string; caption: string; width: number; height: number};
export type PortfolioData = typeof fallbackContent;
export type ContentTranslations = Record<string, {en: string; id: string}>;
