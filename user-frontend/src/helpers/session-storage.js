const THEME_KEY = "light";

export const getSessionStorageTheme = () => {
  return sessionStorage.getItem(THEME_KEY);
};

export const setSessionStorageTheme = (value) => {
  sessionStorage.setItem(THEME_KEY, value);
  return true;
};

export const removeSessionStorageTheme = () => {
  sessionStorage.removeItem(THEME_KEY);
  return true;
};

export const clearAllSessionStorage = () => {
  sessionStorage.clear();
  return true;
};
