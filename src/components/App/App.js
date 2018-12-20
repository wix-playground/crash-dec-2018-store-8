import React from 'react';
import { translate } from 'react-i18next';
import s from './App.scss';
import PropTypes from 'prop-types';
import ProductsList from '../ProductsList';
import { Link } from '@reach/router';
import {withExperiments} from 'wix-experiments-react';

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
    const {t, experiments } = this.props;
    const addProductEnabled = experiments.enabled('specs.crash-course.IsAddButtonEnabled');
    return (
      <div className={s.root}>
        <h2>Awesome store</h2>
        <ProductsList />
        {addProductEnabled && <Link to="new" data-hook='add-product-link'>Add product</Link>}
      </div>
    );
  }
}

export default withExperiments(translate()(App));
