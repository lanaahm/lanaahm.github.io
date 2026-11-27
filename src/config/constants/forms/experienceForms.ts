import type { FormSectionConfig } from '../../../types/domain';

export const employeeHistoryForm: FormSectionConfig = {
  inputs: [
    { id: 'company', type: 'text', label: 'Company', placeholder: 'Company Name' },
    { id: 'start_work', type: 'date', label: 'Start Works' },
    { id: 'end_work', type: 'date', label: 'End Works' }
  ],
  header: ['Company', 'Start Work', 'End Work', 'Action'],
  collection: 'employee_history'
};

export const certificationForm: FormSectionConfig = {
  inputs: [
    { id: 'title', type: 'text', label: 'Title', placeholder: 'Title' },
    { id: 'issuer', type: 'text', label: 'Issuer', placeholder: 'Coursera / Dicoding / ...' },
    { id: 'obtained', type: 'date', label: 'Obtained' },
    { id: 'expired', type: 'date', label: 'Expired' },
    { id: 'file_url', type: 'text', label: 'Certificate File URL', placeholder: '/certifications/...' }
  ],
  header: ['Title', 'Issuer', 'Obtained', 'Expired', 'File URL', 'Action'],
  collection: 'certification'
};

export const experienceForm: FormSectionConfig = {
  inputs: [
    { id: 'title', type: 'text', label: 'Title', placeholder: 'Title' },
    { id: 'category', type: 'text', label: 'Category', placeholder: 'Category' }
  ],
  header: ['Title', 'Category', 'Action'],
  collection: 'experience'
};
