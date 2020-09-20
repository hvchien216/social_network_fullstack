import { useLocalStorage } from '../hooks';
import React, { createContext, useContext } from 'react';
import { darkTheme, lightTheme } from '../theme';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
interface ContextProps {
  darkMode: boolean;
  setDarkMode(darkMode: boolean): void;
}
export const DarkModeContext = createContext<ContextProps>({
  darkMode: false,
  setDarkMode: () => {}
});

interface Props {
  children?: any;
}
export const DarkModeProvider = ({ children }: Props) => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode');
  const theme = darkMode ? darkTheme : lightTheme;
  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        setDarkMode
      }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
};

export const useDarkModeStore = () => useContext(DarkModeContext);
