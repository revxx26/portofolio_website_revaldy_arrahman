import {experiencePeriods} from './portfolio';
export const experiences = [
  {id: 'ministry', title: 'Kementerian Pertanian Republik Indonesia', role: 'PROJECT DATA SUPPORT', typeLabel: 'HOK program', logo: '/images/organizations/kementan-128.webp', logoAlt: 'Logo Kementerian Pertanian Republik Indonesia', ...experiencePeriods.ministry,
    description: 'Managed and validated sugarcane farmer records from regions across Indonesia for the HOK program. Processed fund disbursement through SAKTI, the Ministry of Finance system.',
    workflow: ['Farmer records', 'Validation & processing', 'Verification', 'Fund disbursement via SAKTI'], note: 'My work covered data administration, validation, and fund disbursement processing through SAKTI.'},
  {id: 'palapa', title: 'PT Palapa Alta Utama', role: 'VOCATIONAL SCHOOL INTERNSHIP', typeLabel: 'Internship / PKL', logo: '/images/organizations/palapa-128.webp', logoAlt: 'Logo PT Palapa Alta Utama', ...experiencePeriods.palapa,
    description: 'Handled company e-commerce administration and helped configure network printing on employee PCs.', workflow: [], note: 'Workplace operations with limited IT and network support.'},
];
