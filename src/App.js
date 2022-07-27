/* eslint-disable */
import { ThemeProvider } from '@material-ui/core';
import { useState } from 'react';
import { I18nextProvider } from "react-i18next";
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import GlobalStyles from 'src/Core/Components/GlobalStyles';
import { i18next } from 'src/Core/Contexts/Translate/i18nextInit';
import 'src/Core/mixins/chartjs';
import theme from 'src/Core/Styles/theme';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import routes from 'src/routes';
import localContext from './Core/Contexts/localContext';
//testt
const App = () => {
  const isLoggedIn = getCurrentUser().firstName
  const userData=getCurrentUser();
  const routing = useRoutes(routes(isLoggedIn,userData));
  const [otp, setOtp] = useState(Math.floor(Math.random() * (1000000 - 100000) + 100000));
  const [recipient, setRecipient] = useState(null);
  const [users, setUser] = useState(null);
  const [documents, setDocuments] = useState({ requirements: {}, healthServices: {}, staff: {} })
  // const [finalLicenseDetails, SetFinalLicenseDetails ] = useState({companyName:null, Capacity:null, FinancialGuarantee:null})
  const [finalLicenseDetails, SetFinalLicenseDetails] = useState({})


  return (
    <localContext.Provider value={{ users, setUser, otp, setOtp, recipient, setRecipient, documents, setDocuments, finalLicenseDetails, SetFinalLicenseDetails }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <I18nextProvider i18n={i18next} >
          {routing}
        </I18nextProvider>
      </ThemeProvider>
    </localContext.Provider>
  );
};

export default App;