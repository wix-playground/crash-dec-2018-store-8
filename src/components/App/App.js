import React from 'react';
import { translate } from 'react-i18next';
import s from './App.scss';
import PropTypes from 'prop-types';
import ProductsList from '../ProductsList';

class App extends React.Component {
  static propTypes = {
    t: PropTypes.func,
  };

  render() {
    return (
      <div className={s.root}>
        <h2>Awesome store</h2>
        <ProductsList />
      </div>
    );
  }
}

export default translate()(App);
