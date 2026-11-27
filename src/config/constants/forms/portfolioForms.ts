import type { FormSectionConfig } from '../../../types/domain';

export const portfolioForm: FormSectionConfig = {
  inputs: [
    { id: 'image', type: 'file', imageUpload: true, label: 'Cover Portfolio' },
    { id: 'title', type: 'text', label: 'Title', placeholder: 'Title' },
    { id: 'description', type: 'text', label: 'Description', placeholder: 'Description' },
    {
      id: 'link',
      type: 'text',
      label: 'Link',
      category: true,
      placeholder: 'https://github.com'
    }
  ],
  header: ['Images', 'Title', 'Description', 'Link', 'Action'],
  collection: 'portfolio'
};

export const settingsForm: FormSectionConfig = {
  inputs: [
    { id: 'name', type: 'text', label: 'Full Name', placeholder: 'Full name' },
    { id: 'description', type: 'text', label: 'Description', placeholder: 'Description' },
    { id: 'number_phone', type: 'text', label: 'Number Phone', placeholder: '62...' },
    { id: 'email', type: 'email', label: 'Email', placeholder: 'Email' },
    { id: 'github', type: 'text', label: 'Github', placeholder: 'Github' },
    { id: 'kaggle', type: 'text', label: 'Kaggle', placeholder: 'Kaggle' },
    { id: 'linkedin', type: 'text', label: 'Linkedin', placeholder: 'Linkedin' },
    { id: 'medium', type: 'text', label: 'Medium', placeholder: 'Medium' },
    {
      id: 'cv_url',
      type: 'text',
      label: 'CV PDF URL',
      placeholder: '/cv/Maulana-Ahmad-Maliki-Resume.pdf',
      pdfUpload: true
    },
    {
      id: 'timeline_orientation',
      type: 'select',
      label: 'Career Timeline Layout',
      options: [
        { label: 'Horizontal (Default)', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' }
      ]
    }
  ],
  collection: 'settings'
};
