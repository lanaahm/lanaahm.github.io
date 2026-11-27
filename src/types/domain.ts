import type { Database } from './database.types';

export type TableName = keyof Database['public']['Tables'];

export interface EmployeeHistoryItem
  extends Omit<Database['public']['Tables']['employee_history']['Row'], 'highlights'> {
  highlights: string[];
}
export type CertificationItem = Database['public']['Tables']['certification']['Row'];
export type ExperienceItem = Database['public']['Tables']['experience']['Row'];
export type SettingsItem = Database['public']['Tables']['settings']['Row'];

export type PortfolioLinkEntry = Record<string, string>;

export interface PortfolioItem
  extends Omit<Database['public']['Tables']['portfolio']['Row'], 'link'> {
  link: PortfolioLinkEntry[];
}

export type DomainRecord =
  | EmployeeHistoryItem
  | CertificationItem
  | ExperienceItem
  | PortfolioItem
  | SettingsItem;

export type TimelineOrientation = 'horizontal' | 'vertical';

export interface FormSelectOption {
  label: string;
  value: string;
}

export interface FormInputConfig {
  id: string;
  type: 'text' | 'date' | 'file' | 'email' | 'select';
  label: string;
  placeholder?: string;
  imageUpload?: boolean;
  pdfUpload?: boolean;
  category?: boolean;
  options?: FormSelectOption[];
}

export interface FormSectionConfig {
  inputs: FormInputConfig[];
  header?: string[];
  collection: TableName;
}

export interface SummaryCardItem {
  title: string;
  subtitle: string;
  value: string;
  percent: number;
}

export interface ContentOverview {
  title: string;
  value: string;
  chartData: {
    labels: string[];
    data: number[];
  };
}

export interface AuthUserProfile {
  email: string;
  uid: string;
  emailVerified: boolean;
  accessToken: string;
}

export interface HomePayload {
  settings: SettingsItem[];
  employee_history: EmployeeHistoryItem[];
  certification: CertificationItem[];
  experience: ExperienceItem[];
  portfolio: PortfolioItem[];
}

export interface AppState {
  activeNav: string;
  isLoading: boolean;
  isLogin: boolean;
  employeeHistory: EmployeeHistoryItem[];
  certification: CertificationItem[];
  experience: ExperienceItem[];
  portfolio: PortfolioItem[];
  settings: SettingsItem[];
}
