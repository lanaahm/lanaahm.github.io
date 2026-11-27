export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      certification: {
        Row: {
          created_at: string;
          expired: string;
          file_url: string;
          id: string;
          issuer: string;
          obtained: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          expired: string;
          file_url?: string;
          id?: string;
          issuer?: string;
          obtained: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          expired?: string;
          file_url?: string;
          id?: string;
          issuer?: string;
          obtained?: string;
          title?: string;
          updated_at?: string;
        };
      };
      employee_history: {
        Row: {
          company: string;
          created_at: string;
          end_work: string;
          focus: string;
          highlights: Json;
          id: string;
          location: string;
          start_work: string;
          updated_at: string;
        };
        Insert: {
          company: string;
          created_at?: string;
          end_work: string;
          focus?: string;
          highlights?: Json;
          id?: string;
          location?: string;
          start_work: string;
          updated_at?: string;
        };
        Update: {
          company?: string;
          created_at?: string;
          end_work?: string;
          focus?: string;
          highlights?: Json;
          id?: string;
          location?: string;
          start_work?: string;
          updated_at?: string;
        };
      };
      experience: {
        Row: {
          category: string;
          created_at: string;
          id: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          category: string;
          created_at?: string;
          id?: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          id?: string;
          title?: string;
          updated_at?: string;
        };
      };
      portfolio: {
        Row: {
          created_at: string;
          description: string;
          id: string;
          image: string;
          link: Json;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          id?: string;
          image?: string;
          link?: Json;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          image?: string;
          link?: Json;
          title?: string;
          updated_at?: string;
        };
      };
      settings: {
        Row: {
          created_at: string;
          cv_url: string;
          description: string;
          email: string;
          github: string;
          id: string;
          kaggle: string;
          linkedin: string;
          medium: string;
          name: string;
          number_phone: string;
          timeline_orientation: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          cv_url?: string;
          description?: string;
          email?: string;
          github?: string;
          id?: string;
          kaggle?: string;
          linkedin?: string;
          medium?: string;
          name?: string;
          number_phone?: string;
          timeline_orientation?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          cv_url?: string;
          description?: string;
          email?: string;
          github?: string;
          id?: string;
          kaggle?: string;
          linkedin?: string;
          medium?: string;
          name?: string;
          number_phone?: string;
          timeline_orientation?: string;
          updated_at?: string;
        };
      };
    };
    Functions: {
      get_home_payload: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
    };
  };
}
