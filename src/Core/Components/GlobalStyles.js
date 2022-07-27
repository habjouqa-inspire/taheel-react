import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      fontFamily: 'FrutigerLTArabic-55Roman !important',
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      backgroundColor: '#f4f6f8',
      height: '100%',
      width: '100%'
    },
    a: {
      textDecoration: 'none'
    },
    '#root': {
      height: '100%',
      width: '100%'
    },
    '.st0': {
      fill: '00bef2'
    },
    '.custom-field label': {
      transformOrigin: 'top right',
      right: '30px',
      left: 'unset'
    },
    '.custom-label-field label': {
      transformOrigin: 'top right',
      right: '15px',
      left: 'unset',
      backgroundColor: '#fff',
      padding: '0 8px',
      'z-index': '4'
    },
    '.custom-label-field .MuiInputLabel-shrink': {
      top: '-9px'
    },
    '.custom-field fieldset': {
      textAlign: 'right'
    },
    'span.css-htszrh-MuiButton-startIcon': {
      marginLeft: '8px',
      marginRight: '-4px'
    },
    '.customGrid .MuiGrid-item': {
      paddingLeft: '0px !important'
    },
    '.custom-field .MuiSelect-icon': {
      right: 'unset',
      left: '0'
    },
    '.Mui-checked': {
      color: '#fcb712 !important'
    },
    '.google-map': {
      position: 'relative !important'
    },
    '.custom-wizard .MuiStepConnector-horizontal': {
      left: 'calc(50% + 20px)',
      right: 'calc(-50% + 20px)'
    },
    '.custom-wizard  .MuiStepIcon-completed': {
      color: '#34ae73 !important'
    },
    '.custom-wizard  .MuiStepLabel-completed': {
      color: '#34ae73 !important'
    },
    '.service-not-active .service-content': {
      filter: 'blur(7px)'
    },
    '.MuiCardHeader-title': {
      fontSize: '20px !important'
    },
    '.MuiChip-icon': {
      marginRight: '4px !important',
      marginLeft: '0 !important',
    },
    '.MuiTableCell-root': {
      textAlign: 'right !important'
    },
    '.MuiButton-startIcon': {
      'margin-left': '8px !important',
      'margin-right': '-4px !important'
    },
    '.unordered-list': {
      'padding-right': '24px',
      'line-height': '2.0'
    },
    '.ordered-list': {
      'padding-right': '24px',
      'line-height': '2.0'
    },
    '.appendix': {
      marginRight: '30px',
      'line-height': '2.0'
    },
    '.section-headline': {
      marginBottom: '16px',
      'line-height': '2.0',
      'font-weight': '700'
    },
    '#terms-dialog-title .MuiTypography-root': {
      fontSize: '30px !important'
    },
    '.MuiFormControlLabel-root': {
      'margin-left': '16px !important',
      'margin-right': '-11px !important'
    },
    '.MuiFormGroup-row': {
      'justify-content': 'space-between !important',
      'align-items': 'center !important',
      height: '100% !important'
    }
  }
}));

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
