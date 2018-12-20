import React from 'react';
import { translate } from 'react-i18next';
import s from './App.scss';
import PropTypes from 'prop-types';
import ProductsList from '../ProductsList';
import { Router } from '@reach/router';
import AddProduct from '../AddProduct';
import Product from '../Product';

const tempProduct = {
  description: 'some description',
  img: 'diHZhfxwDg',
  name: 'Product 1',
  price: '22',
};

const HomePage = () => <ProductsList />;
const ProductPage = props => (
  <Product productId={props.name} product={tempProduct} />
);
const AddProductPage = () => <AddProduct />;

// TODO move to util
function compose(...functions) {
  if (functions.length === 0) {
    return arg => arg;
  }

  if (functions.length === 1) {
    return functions[0];
  }

  return functions.reduce((a, b) => (...args) => a(b(...args)));
}

class App extends React.Component {
  static propTypes = {
    t: PropTypes.func,
  };

  render() {
    const { t } = this.props;

    return (
      <div className={s.root}>
        <h1>Awesome team 8 store</h1>
        <Router basepath="/crash-store-8">
          <HomePage path="/" />
          <ProductPage path="/product/:name" />
          <AddProductPage path="/new" />
        </Router>
      </div>
    );
  }
}

export default translate()(App);
