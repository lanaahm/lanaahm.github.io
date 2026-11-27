import type { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { LoginCredentials, signInWithEmail, signOutUser } from '../../../services/authService';
import {
  createTableRow,
  deleteTableRow,
  fetchHomePayload,
  fetchTableRows,
  updateTableRow
} from '../../../services/supabaseService';
import type { AppState, AuthUserProfile, HomePayload, TableName } from '../../../types/domain';
import { clearHomeCache, readHomeCache, writeHomeCache } from '../../../utils/homeCache';
import { ActionType, ActionTypeValue } from './globalActionType';

type AppThunkDispatch = ThunkDispatch<AppState, unknown, UnknownAction>;

const TABLE_TO_ACTION: Record<TableName, ActionTypeValue> = {
  employee_history: ActionType.SET_EMPLOYEEHISTORY,
  certification: ActionType.SET_CERTIFICATION,
  experience: ActionType.SET_EXPERIENCE,
  portfolio: ActionType.SET_PORTFOLIO,
  settings: ActionType.SET_SETTINGS
};

export const setNav = (activeSection: string) => (dispatch: AppThunkDispatch) =>
  dispatch({ type: ActionType.SET_ACTIVATE_NAV, value: activeSection });

export const setLoginStatus = (isLogin: boolean) => (dispatch: AppThunkDispatch) =>
  dispatch({ type: ActionType.IS_LOGIN, value: isLogin });

export const loginUserAPI =
  (credentials: LoginCredentials) =>
  async (dispatch: AppThunkDispatch): Promise<AuthUserProfile> => {
    dispatch({ type: ActionType.IS_LOADING, value: true });
    try {
      const user = await signInWithEmail(credentials);
      dispatch({ type: ActionType.IS_LOGIN, value: true });
      return user;
    } finally {
      dispatch({ type: ActionType.IS_LOADING, value: false });
    }
  };

export const logoutUserAPI = () => async (dispatch: AppThunkDispatch): Promise<void> => {
  await signOutUser();
  dispatch({ type: ActionType.IS_LOGIN, value: false });
};

/**
 * Loads all public portfolio data via 1x RPC with localStorage SWR caching.
 * Revalidates silently in background when cached or snapshot data is already rendered.
 */
export const loadHomePayload =
  () =>
  async (dispatch: AppThunkDispatch, getState: () => AppState): Promise<HomePayload | null> => {
    const cached = readHomeCache();
    const state = getState();
    const hasRenderedData =
      state.settings.length > 0 || state.portfolio.length > 0 || Boolean(cached?.data);

    if (cached?.isFresh) {
      dispatch({ type: ActionType.HYDRATE_HOME_PAYLOAD, value: cached.data });
    }

    if (!hasRenderedData) {
      dispatch({ type: ActionType.IS_LOADING, value: true });
    }

    try {
      const fresh = await fetchHomePayload();
      writeHomeCache(fresh);
      dispatch({ type: ActionType.HYDRATE_HOME_PAYLOAD, value: fresh });
      return fresh;
    } catch {
      return cached?.data ?? null;
    } finally {
      if (!hasRenderedData) {
        dispatch({ type: ActionType.IS_LOADING, value: false });
      }
    }
  };

const fetchCollectionThunk =
  (tableName: TableName, typeAction: ActionTypeValue, orderByField: string | null) =>
  async (dispatch: AppThunkDispatch) => {
    dispatch({ type: ActionType.IS_LOADING, value: true });
    try {
      const rows = await fetchTableRows(tableName, orderByField);
      dispatch({ type: typeAction, value: rows });
      return rows;
    } finally {
      dispatch({ type: ActionType.IS_LOADING, value: false });
    }
  };

export const getDataFromAPI = (tableName: TableName, typeAction: ActionTypeValue) =>
  fetchCollectionThunk(tableName, typeAction, 'created_at');

export const getDataIdsFromAPI = (tableName: TableName, typeAction: ActionTypeValue) =>
  fetchCollectionThunk(tableName, typeAction, null);

export const addDataToAPI =
  (tableName: TableName, fields: Record<string, unknown>) =>
  async (dispatch: AppThunkDispatch): Promise<boolean> => {
    dispatch({ type: ActionType.IS_LOADING, value: true });
    try {
      await createTableRow(tableName, fields);
      clearHomeCache();
      const rows = await fetchTableRows(tableName, 'created_at');
      dispatch({ type: TABLE_TO_ACTION[tableName], value: rows });
      return true;
    } finally {
      dispatch({ type: ActionType.IS_LOADING, value: false });
    }
  };

export const updateDataToAPI =
  (tableName: TableName, { id, fields }: { id: string; fields: Record<string, unknown> }) =>
  async (dispatch: AppThunkDispatch): Promise<boolean> => {
    dispatch({ type: ActionType.IS_LOADING, value: true });
    try {
      await updateTableRow(tableName, id, fields);
      clearHomeCache();
      const rows = await fetchTableRows(tableName, 'created_at');
      dispatch({ type: TABLE_TO_ACTION[tableName], value: rows });
      return true;
    } finally {
      dispatch({ type: ActionType.IS_LOADING, value: false });
    }
  };

export const deleteDataToAPI =
  (tableName: TableName, id: string) =>
  async (dispatch: AppThunkDispatch): Promise<boolean> => {
    dispatch({ type: ActionType.IS_LOADING, value: true });
    try {
      await deleteTableRow(tableName, id);
      clearHomeCache();
      const rows = await fetchTableRows(tableName, 'created_at');
      dispatch({ type: TABLE_TO_ACTION[tableName], value: rows });
      return true;
    } finally {
      dispatch({ type: ActionType.IS_LOADING, value: false });
    }
  };
