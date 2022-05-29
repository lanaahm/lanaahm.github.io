import { ActionType } from '../action/globalActionType';

const initState = {
  activeNav: '#',
  isLoading: false,
  isLogin: false,
  employeeHistory: [],
  certification: [],
  experience: [],
  portfolio: [],
  settings: []
};

const rootReducer = (state = initState, action = undefined) => {
  switch (action.type) {
    case ActionType.SET_ACTIVATE_NAV:
      return {
        ...state,
        activeNav: action.value
      };
    case ActionType.IS_LOADING:
      return {
        ...state,
        isLoading: action.value
      };
    case ActionType.IS_LOGIN:
      return {
        ...state,
        isLogin: action.value
      };
    case ActionType.SET_EMPLOYEEHISTORY:
      return {
        ...state,
        employeeHistory: action.value
      };
    case ActionType.SET_CERTIFICATION:
      return {
        ...state,
        certification: action.value
      };
    case ActionType.SET_EXPERIENCE:
      return {
        ...state,
        experience: action.value
      };
    case ActionType.SET_PORTFOLIO:
      return {
        ...state,
        portfolio: action.value
      };
    case ActionType.SET_SETTINGS:
      return {
        ...state,
        settings: action.value
      };
    default:
      return state;
  }
};

export default rootReducer;
