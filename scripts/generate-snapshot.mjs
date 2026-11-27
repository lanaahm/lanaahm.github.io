import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

const SNAPSHOT_PATH = path.resolve('src/config/snapshot/homeSnapshot.json');

const EMPTY_SNAPSHOT = {
  settings: [],
  employee_history: [],
  certification: [],
  experience: [],
  portfolio: []
};

const loadEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) return {};
  return Object.fromEntries(
    fs
      .readFileSync(filePath, 'utf8')
      .split('\n')
      .filter((line) => line.trim() && !line.startsWith('#') && line.includes('='))
      .map((line) => {
        const idx = line.indexOf('=');
        return [line.slice(0, idx).trim(), line.slice(idx + 1).trim().replace(/^"|"$/g, '')];
      })
  );
};

const ensureSnapshotExists = (payload) => {
  fs.mkdirSync(path.dirname(SNAPSHOT_PATH), { recursive: true });
  fs.writeFileSync(SNAPSHOT_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
};

const main = async () => {
  const env = { ...loadEnvFile(path.resolve('.env')), ...process.env };
  const url = env.REACT_APP_SUPABASE_URL;
  const anonKey = env.REACT_APP_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    if (!fs.existsSync(SNAPSHOT_PATH)) ensureSnapshotExists(EMPTY_SNAPSHOT);
    console.log('[snapshot] Skipped: Supabase env vars not set; keeping existing snapshot.');
    return;
  }

  try {
    const supabase = createClient(url, anonKey);
    const { data, error } = await supabase.rpc('get_home_payload');
    if (error || !data) throw new Error(error?.message || 'Empty RPC response');
    ensureSnapshotExists(data);
    console.log('[snapshot] Updated src/config/snapshot/homeSnapshot.json from Supabase.');
  } catch (err) {
    if (!fs.existsSync(SNAPSHOT_PATH)) ensureSnapshotExists(EMPTY_SNAPSHOT);
    console.warn(`[snapshot] Warning: ${err.message}. Keeping existing snapshot.`);
  }
};

main();
