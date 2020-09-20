import { createMuiTheme } from '@material-ui/core';
import { lightBlue, pink } from '@material-ui/core/colors';
const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#03a9f4',
      contrastText: '#000000ba'
    },
    secondary: {
      main: '#f50057',
      contrastText: '#000000ba'
    }
  }
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#03a9f4',
      contrastText: '#ffffffba'
    },
    secondary: {
      main: '#f50057',
      contrastText: '#ffffffba'
    }
  }
});

export { lightTheme, darkTheme };
