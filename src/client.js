import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import axios from 'axios';
import { wixAxiosConfig } from '@wix/wix-axios-config';
import i18n from './i18n';
import App from './components/App';
import { Router } from '@reach/router';

const baseURL = window.__BASEURL__;
const locale = window.__LOCALE__;

wixAxiosConfig(axios, { baseURL });

const HomePage = () => <App />;
const ProductPage = props => <App productName={props.name} />;
const AddProductPage = () => <App />;

ReactDOM.render(
  <I18nextProvider i18n={i18n(locale)}>
    <Router>
      <HomePage path="/" />
      <ProductPage path="/product/:name" />
      <AddProductPage path="/new" />
    </Router>
  </I18nextProvider>,
  document.getElementById('root'),
);
