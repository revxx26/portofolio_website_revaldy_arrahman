import {profile, projects, skills, volunteering, certifications} from './portfolio';
import {experiences} from './experience';

export const fallbackContent = {
  profile: {...profile, analyticsId: '', linkedinLabel: 'Revaldy Arrahman', githubLabel: 'revxx26',
    greeting: 'Hello, I’m Revaldy.', headline: 'Data Analyst & Data Engineer Enthusiast',
    intro: '',
    opportunity: 'Interested in internships & early-career opportunities',
    aboutTitle: 'About me',
    aboutIntro: 'I’m an Information Systems student working with SQL, Python, Tableau, and Power BI to analyze data and build dashboards.',
    aboutBody: 'My experience includes processing sugarcane farmer records at Kementerian Pertanian and working on several data-related projects. I enjoy exploring data, solving problems, and building things that are actually useful.',
    university: 'Universitas Bina Sarana Informatika', universityLogo: '/images/organizations/ubsi-128.webp', degree: 'Information Systems', gpa: '3.84', semester: 'SEMESTER 7',
    contactIntro: 'I’m interested in Data Analyst and Data Engineer internships and early-career opportunities.',
  },
  projects: projects.map((project, index) => ({...project, demo: index === 0 ? 'https://public.tableau.com/views/CustomerChurnRiskTelcoDashboard/CustomerChurnRiskDashboard' : '', contribution: project.contribution || '', width: [1597, 494, 642][index], height: [888, 451, 475][index], additionalImages: project.additionalImages.map(figure => ({...figure, width: 950, height: figure.src.includes('evaluation') ? 178 : 324}))})),
  experiences, volunteering: volunteering.map(item => ({...item, gallery: [] as GalleryFigure[]})), certifications: certifications.map(item => ({...item, gallery: [] as GalleryFigure[]})), skills,
};
export type GalleryFigure = {src: string; alt: string; caption: string; width: number; height: number};
export type PortfolioData = typeof fallbackContent;
export type ContentTranslations = Record<string, {en: string; id: string}>;
