import React from 'react';
import { translate } from 'react-i18next';
// import s from './AddProduct.scss';
import PropTypes from 'prop-types';
import Button from 'wix-style-react/Button';

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
        <Button onClick={() => console.log('thanks for clicking :)')}>
          Add!
        </Button>
      </div>
    );
  }
}

export default translate()(AddProduct);
