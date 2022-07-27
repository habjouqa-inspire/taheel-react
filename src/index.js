import { CircularProgress } from '@material-ui/core';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
const App = React.lazy(() => import('./App'));

if (process.env.NODE_ENV === 'production') {
  console.log = () => { }
  console.warn = () => { }
}

ReactDOM.render((
  <BrowserRouter>
    <Suspense fallback={
      <CircularProgress size="15rem"
        style={{
          display: 'block',
          marginLeft: 'auto',
          marginTop: '8%',
          marginTop: '3%',
          marginRight: 'auto',
          color: '#E2E8EB'
        }} />
    }>
      <App />
    </Suspense>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
