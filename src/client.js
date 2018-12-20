import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import axios from 'axios';
import { wixAxiosConfig } from '@wix/wix-axios-config';
import i18n from './i18n';
import App from './components/App';
import { ExperimentsProvider } from 'wix-experiments-react';

const baseURL = window.__BASEURL__;
const locale = window.__LOCALE__;

wixAxiosConfig(axios, { baseURL });

ReactDOM.render(
  <I18nextProvider i18n={i18n(locale)}>
    <ExperimentsProvider options={{ experiments: window.__EXPERIMENTS__ }}>
      <App />
    </ExperimentsProvider>
  </I18nextProvider>,
  document.getElementById('root'),
);
