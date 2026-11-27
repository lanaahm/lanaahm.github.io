import {
  certificationForm,
  employeeHistoryForm,
  experienceForm
} from './forms/experienceForms';
import { portfolioForm, settingsForm } from './forms/portfolioForms';

export const data = {
  user: {
    name: 'L A N'
  }
};

export const form = {
  employeeHistory: employeeHistoryForm,
  certification: certificationForm,
  experience: experienceForm,
  portfolio: portfolioForm,
  settings: settingsForm
};
