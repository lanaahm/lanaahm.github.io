import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../types/database.types';

const SUPABASE_URL =
  process.env.REACT_APP_SUPABASE_URL || 'https://quwjvmjsvncuuaxpwcqe.supabase.co';

const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const STORAGE_BUCKET =
  process.env.REACT_APP_SUPABASE_STORAGE_BUCKET || "lanaahm's Bucket";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
