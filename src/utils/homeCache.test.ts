import type { HomePayload } from '../types/domain';
import { clearHomeCache, readHomeCache, writeHomeCache } from './homeCache';

const SAMPLE_PAYLOAD: HomePayload = {
  settings: [],
  employee_history: [],
  certification: [],
  experience: [],
  portfolio: []
};

describe('homeCache', () => {
  beforeEach(() => {
    clearHomeCache();
  });

  test('returns null when cache is empty or corrupted', () => {
    expect(readHomeCache()).toBeNull();
    window.localStorage.setItem('lanaahm_home_cache_v1', '{bad json');
    expect(readHomeCache()).toBeNull();
  });

  test('writes and reads fresh cache, and detects stale cache', () => {
    writeHomeCache(SAMPLE_PAYLOAD);
    const fresh = readHomeCache(60_000);
    expect(fresh).toEqual({ data: SAMPLE_PAYLOAD, isFresh: true });

    const stale = readHomeCache(-1);
    expect(stale).toEqual({ data: SAMPLE_PAYLOAD, isFresh: false });
  });

  test('clearHomeCache removes stored data', () => {
    writeHomeCache(SAMPLE_PAYLOAD);
    clearHomeCache();
    expect(readHomeCache()).toBeNull();
  });
});
