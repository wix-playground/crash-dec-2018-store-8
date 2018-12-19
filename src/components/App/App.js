import React from 'react';
import { translate } from 'react-i18next';
import s from './App.scss';
import PropTypes from 'prop-types';
import ProductsList from '../ProductsList';
import { Link } from '@reach/router';

class App extends React.Component {
  static propTypes = {
    t: PropTypes.func,
  };

  render() {
    return (
      <div className={s.root}>
        <h2>Awesome store</h2>
        <ProductsList />
        <Link to="new">Add product</Link>
      </div>
    );
  }
}

export default translate()(App);
