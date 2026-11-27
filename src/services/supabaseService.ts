import { v4 as uuidv4 } from 'uuid';
import { STORAGE_BUCKET, supabase } from '../config/supabase';
import type { HomePayload, TableName } from '../types/domain';
import {
  validateDocumentId,
  validateImageFile,
  validatePdfFile,
  validateTableName
} from '../utils/validators';

/**
 * Fetches all rows from a Supabase table, optionally ordered by a column.
 */
export const fetchTableRows = async <T = Record<string, unknown>>(
  tableName: TableName,
  orderByField: string | null = 'created_at'
): Promise<T[]> => {
  const name = validateTableName(tableName) as TableName;
  const baseQuery = supabase.from(name).select('*');
  const { data, error } = orderByField
    ? await baseQuery.order(orderByField, { ascending: true })
    : await baseQuery;

  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as T[];
};

/**
 * Fetches all 5 public portfolio tables in a single Supabase RPC round-trip.
 */
export const fetchHomePayload = async (): Promise<HomePayload> => {
  const { data, error } = await supabase.rpc('get_home_payload');
  if (!error && data && typeof data === 'object') {
    return data as unknown as HomePayload;
  }

  const [settings, employee_history, certification, experience, portfolio] = await Promise.all([
    fetchTableRows<HomePayload['settings'][number]>('settings', null),
    fetchTableRows<HomePayload['employee_history'][number]>('employee_history', 'created_at'),
    fetchTableRows<HomePayload['certification'][number]>('certification', 'created_at'),
    fetchTableRows<HomePayload['experience'][number]>('experience', 'created_at'),
    fetchTableRows<HomePayload['portfolio'][number]>('portfolio', 'created_at')
  ]);

  return { settings, employee_history, certification, experience, portfolio };
};

/**
 * Inserts a new row into a Supabase table.
 */
export const createTableRow = async (
  tableName: TableName,
  fields: Record<string, unknown>
): Promise<void> => {
  const name = validateTableName(tableName) as TableName;
  if (!fields || typeof fields !== 'object') {
    throw new Error('Record fields must be an object.');
  }

  const { error } = await supabase.from(name).insert(fields as never);
  if (error) throw new Error(error.message);
};

/**
 * Updates an existing row in a Supabase table by ID.
 */
export const updateTableRow = async (
  tableName: TableName,
  id: string,
  fields: Record<string, unknown>
): Promise<void> => {
  const name = validateTableName(tableName) as TableName;
  const recordId = validateDocumentId(id);
  const { id: _ignoredId, created_at: _c, updated_at: _u, ...payload } = fields;

  const { error } = await supabase
    .from(name)
    .update(payload as never)
    .eq('id', recordId);

  if (error) throw new Error(error.message);
};

/**
 * Deletes a row from a Supabase table by ID.
 */
export const deleteTableRow = async (
  tableName: TableName,
  id: string
): Promise<void> => {
  const name = validateTableName(tableName) as TableName;
  const recordId = validateDocumentId(id);

  const { error } = await supabase.from(name).delete().eq('id', recordId);
  if (error) throw new Error(error.message);
};

/**
 * Uploads a validated portfolio image to Supabase Storage and returns its public URL.
 */
export const uploadPortfolioImage = async (file: File): Promise<string> => {
  validateImageFile(file);
  const extension = file.name.split('.').pop() || 'png';
  const filePath = `images/${uuidv4()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, { contentType: file.type, cacheControl: '86400', upsert: false });

  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
};

/**
 * Uploads a validated resume PDF to Supabase Storage and returns its public URL.
 */
export const uploadResumePdf = async (file: File): Promise<string> => {
  validatePdfFile(file);
  const filePath = 'cv/Maulana-Ahmad-Maliki-Resume.pdf';

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, {
      contentType: 'application/pdf',
      cacheControl: '86400',
      upsert: true
    });

  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
};
