import React from 'react';
import { translate } from 'react-i18next';
// import s from './AddProduct.scss';
import PropTypes from 'prop-types';

class AddProduct extends React.Component {
  static propTypes = {
    t: PropTypes.func,
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <div>
          <h2>{t('product.add.title')}</h2>
        </div>
        <p>{t('app.intro')}</p>
      </div>
    );
  }
}

export default translate()(AddProduct);
