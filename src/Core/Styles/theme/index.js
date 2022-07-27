import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  direction: 'rtl',
  palette: {
    background: {
      default: '#F4F6F8',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#ffffff',
      main: '#214255'
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c',
      white: '#ffffff'
    },
    action: {
      active: '#fcb712'
    }
  },
  shadows,
  typography,

});

export default theme;
