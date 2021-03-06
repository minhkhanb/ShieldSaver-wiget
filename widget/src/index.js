import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { I18nextProvider } from 'react-i18next';
import i18n from './app/i18n';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>, document.getElementById('root'),
);
registerServiceWorker();
