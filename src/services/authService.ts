import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '../config/supabase';
import type { Database } from '../types/database.types';
import type { AuthUserProfile } from '../types/domain';

export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Authenticates an admin user with Supabase Auth and returns a sanitized profile.
 */
export const signInWithEmail = async (
  { email, password }: LoginCredentials,
  client: SupabaseClient<Database> = supabase
): Promise<AuthUserProfile> => {
  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error || !data.user || !data.session) {
    throw new Error(error?.message || 'Authentication failed.');
  }

  return {
    email: data.user.email || '',
    uid: data.user.id,
    emailVerified: Boolean(data.user.email_confirmed_at),
    accessToken: data.session.access_token
  };
};

/**
 * Signs out the active Supabase Auth session.
 */
export const signOutUser = async (
  client: SupabaseClient<Database> = supabase
): Promise<void> => {
  const { error } = await client.auth.signOut();
  if (error) throw new Error(error.message);
};

/**
 * Returns the current Supabase session if authenticated.
 */
export const getActiveSession = async (
  client: SupabaseClient<Database> = supabase
): Promise<Session | null> => {
  const { data, error } = await client.auth.getSession();
  if (error) throw new Error(error.message);
  return data.session;
};

/**
 * Subscribes to Supabase auth state transitions.
 */
export const onAuthChange = (
  callback: (isAuthenticated: boolean) => void,
  client: SupabaseClient<Database> = supabase
): (() => void) => {
  const { data } = client.auth.onAuthStateChange((_event, session) => {
    callback(Boolean(session));
  });
  return () => data.subscription.unsubscribe();
};
