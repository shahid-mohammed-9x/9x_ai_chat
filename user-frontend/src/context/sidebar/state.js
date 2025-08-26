import { useReducer } from "react";
import { Actions } from "./action";
import Reducer from "./reduder";

export const initialState = {
  isSidebarOpen: true,
  navUser: {
    dashboard: false,
    subjects: true,
    attendance: true,
    homework: true,
  },
};

export const SidebarState = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const isSidebarOpenAction = (isOpen) => {
    dispatch({ type: Actions.IS_SIDEBAR_OPEN, payload: isOpen });
  };

  const changeNavUserAction = (payload) => {
    dispatch({ type: Actions.CHANGE_NAV_USER, payload });
  };

  const updateSidebarStateAction = (payload) => {
    dispatch({ type: Actions.UPDATE_SIDEBAR_STATE, payload });
  };

  const resetSidebarAction = () => {
    dispatch({ type: Actions.RESET_STATE });
  };

  return {
    ...state,
    isSidebarOpenAction,
    changeNavUserAction,
    updateSidebarStateAction,
    resetSidebarAction,
  };
};
