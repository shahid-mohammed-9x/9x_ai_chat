import UserActions from './userProfile/action';
import ThemeActions from './theme/action';
import ChatActions from './chats/action';

export const userActions = { ...UserActions };
export const themeActions = { ...ThemeActions };
export const chatActions = { ...ChatActions };

// after adding reset the action in to the logout hook
