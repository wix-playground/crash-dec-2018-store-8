import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import axios from 'axios';
import { wixAxiosConfig } from '@wix/wix-axios-config';
import i18n from './i18n';
import App from './components/App';
import AddProduct from './components/AddProduct';
import Product from './components/Product';
import { Router } from '@reach/router';
import { ExperimentsProvider } from 'wix-experiments-react';

const baseURL = window.__BASEURL__;
const locale = window.__LOCALE__;

wixAxiosConfig(axios, { baseURL });

const tempProduct = {
  description: 'some description',
  img: 'diHZhfxwDg',
  name: 'Product 1',
  price: '22',
};

const HomePage = () => <App />;
const ProductPage = props => (
  <Product productId={props.name} product={tempProduct} />
);
const AddProductPage = () => <AddProduct />;

ReactDOM.render(

  <I18nextProvider i18n={i18n(locale)}>
    <ExperimentsProvider options={{experiments: window.__EXPERIMENTS__}}>
      <Router basepath="/crash-store-8">
            <HomePage path="/" />
          <ProductPage path="/product/:name" />
            <AddProductPage path="/new" />
        </Router>
    </ExperimentsProvider>

  </I18nextProvider>,
  document.getElementById('root'),
);
