import {experiencePeriods} from './portfolio';
export const experiences = [
  {id: 'ministry', title: 'Kementerian Pertanian Republik Indonesia', role: 'DATA OPERATIONS SUPPORT', typeLabel: 'HOK program', logo: '/images/organizations/kementan-128.webp', logoAlt: 'Logo Kementerian Pertanian Republik Indonesia', ...experiencePeriods.ministry,
    description: 'Managed and processed sugarcane farmer records from regions across Indonesia. Supported data validation and processing through the Ministry’s system, helping records progress toward fund disbursement.',
    workflow: ['Farmer records', 'Validation & processing', 'Verification', 'Fund disbursement'], note: 'My work supported the data administration and processing stages of this workflow.'},
  {id: 'palapa', title: 'PT Palapa Alta Utama', role: 'VOCATIONAL SCHOOL INTERNSHIP', typeLabel: 'Internship / PKL', logo: '/images/organizations/palapa-128.webp', logoAlt: 'Logo PT Palapa Alta Utama', ...experiencePeriods.palapa,
    description: 'Handled company e-commerce administration and helped configure network printing on employee PCs.', workflow: [], note: 'Workplace operations with limited IT and network support.'},
];
