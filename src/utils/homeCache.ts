import type { HomePayload } from '../types/domain';

const CACHE_KEY = 'lanaahm_home_cache_v1';
export const DEFAULT_CACHE_TTL_MS = 15 * 60 * 1000;

interface CacheEnvelope {
  timestamp: number;
  data: HomePayload;
}

export interface CacheReadResult {
  data: HomePayload;
  isFresh: boolean;
}

const isValidPayload = (value: unknown): value is HomePayload => {
  if (!value || typeof value !== 'object') return false;
  const record = value as Record<string, unknown>;
  return (
    Array.isArray(record.settings) &&
    Array.isArray(record.employee_history) &&
    Array.isArray(record.certification) &&
    Array.isArray(record.experience) &&
    Array.isArray(record.portfolio)
  );
};

/**
 * Reads cached HomePayload from localStorage and reports whether it is within TTL.
 */
export const readHomeCache = (ttlMs = DEFAULT_CACHE_TTL_MS): CacheReadResult | null => {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEnvelope;
    if (!parsed || typeof parsed.timestamp !== 'number' || !isValidPayload(parsed.data)) {
      return null;
    }
    return {
      data: parsed.data,
      isFresh: Date.now() - parsed.timestamp < ttlMs
    };
  } catch {
    return null;
  }
};

/**
 * Persists a HomePayload snapshot with timestamp into localStorage.
 */
export const writeHomeCache = (data: HomePayload): void => {
  try {
    const envelope: CacheEnvelope = { timestamp: Date.now(), data };
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(envelope));
  } catch {
    // Ignore storage quota or private-mode errors
  }
};

/**
 * Clears the cached HomePayload (called after Dashboard mutations).
 */
export const clearHomeCache = (): void => {
  try {
    window.localStorage.removeItem(CACHE_KEY);
  } catch {
    // Ignore storage errors
  }
};
