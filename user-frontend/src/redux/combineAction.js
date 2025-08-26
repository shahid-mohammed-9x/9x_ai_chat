import UserActions from "./userProfile/action";
import ThemeActions from "./theme/action";

export const userActions = { ...UserActions };
export const themeActions = { ...ThemeActions };

// after adding reset the action in to the logout hook
