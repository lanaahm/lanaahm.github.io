import type { UnknownAction } from '@reduxjs/toolkit';
import homeSnapshot from '../../snapshot/homeSnapshot.json';
import type { AppState, HomePayload } from '../../../types/domain';
import { readHomeCache } from '../../../utils/homeCache';
import { ActionType } from '../action/globalActionType';

interface InternalAppState extends AppState {
  pendingRequests: number;
}

interface PayloadAction extends UnknownAction {
  value?: unknown;
}

const getInitialPayload = (): HomePayload => {
  const cached = typeof window !== 'undefined' ? readHomeCache() : null;
  if (cached?.data) return cached.data;
  return homeSnapshot as unknown as HomePayload;
};

const initialPayload = getInitialPayload();

const initState: InternalAppState = {
  activeNav: '#',
  isLoading: false,
  pendingRequests: 0,
  isLogin: false,
  employeeHistory: initialPayload.employee_history || [],
  certification: initialPayload.certification || [],
  experience: initialPayload.experience || [],
  portfolio: initialPayload.portfolio || [],
  settings: initialPayload.settings || []
};

const rootReducer = (
  state: InternalAppState = initState,
  action: PayloadAction = { type: '' }
): InternalAppState => {
  switch (action.type) {
    case ActionType.SET_ACTIVATE_NAV:
      return { ...state, activeNav: String(action.value ?? '#') };
    case ActionType.IS_LOADING: {
      const nextPending = action.value
        ? state.pendingRequests + 1
        : Math.max(0, state.pendingRequests - 1);
      return { ...state, pendingRequests: nextPending, isLoading: nextPending > 0 };
    }
    case ActionType.IS_LOGIN:
      return { ...state, isLogin: Boolean(action.value) };
    case ActionType.HYDRATE_HOME_PAYLOAD: {
      const payload = action.value as HomePayload;
      return {
        ...state,
        settings: payload.settings || [],
        employeeHistory: payload.employee_history || [],
        certification: payload.certification || [],
        experience: payload.experience || [],
        portfolio: payload.portfolio || []
      };
    }
    case ActionType.SET_EMPLOYEEHISTORY:
      return { ...state, employeeHistory: (action.value as AppState['employeeHistory']) || [] };
    case ActionType.SET_CERTIFICATION:
      return { ...state, certification: (action.value as AppState['certification']) || [] };
    case ActionType.SET_EXPERIENCE:
      return { ...state, experience: (action.value as AppState['experience']) || [] };
    case ActionType.SET_PORTFOLIO:
      return { ...state, portfolio: (action.value as AppState['portfolio']) || [] };
    case ActionType.SET_SETTINGS:
      return { ...state, settings: (action.value as AppState['settings']) || [] };
    default:
      return state;
  }
};

export default rootReducer;
