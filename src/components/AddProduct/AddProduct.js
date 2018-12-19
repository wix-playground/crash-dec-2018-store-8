import React from 'react';
import { translate } from 'react-i18next';
// import s from './AddProduct.scss';
import PropTypes from 'prop-types';
import Button from 'wix-style-react/Button';
import FormField from 'wix-style-react/FormField';
import Input from 'wix-style-react/Input';
import { navigate } from '@reach/router';

class AddProduct extends React.Component {
  static propTypes = {
    t: PropTypes.func,
  };

  handleCancel = () => {
    navigate('/crash-store-8', { replace: true });
  };

  handleChange({ name, description, price, image }) {
    this.setState({ name, description, price, image });
  }

  handleAdd = () => {
    const { name, description, price, image } = this.state;
    // this.props.addProduct({ name, description, price, image });
    navigate('/crash-store-8', {
      state: { name, description, price, image },
      replace: true,
    });
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <div>
          <h2>{t('product.add.title')}</h2>
        </div>
        <FormField label="name" required>
          <Input
            id="name"
            dataHook="name"
            placeholder="product name"
            onChange={e => this.handleChange({ name: e.target.value })}
          />
        </FormField>
        <FormField label="description">
          <Input
            id="description"
            dataHook="description"
            placeholder="product description"
            onChange={e => this.handleChange({ description: e.target.value })}
          />
        </FormField>
        <FormField label="price">
          <Input
            id="price"
            dataHook="price"
            placeholder="product price"
            onChange={e => this.handleChange({ price: e.target.value })}
          />
        </FormField>
        <FormField label="image">
          <Input
            id="image"
            dataHook="image"
            placeholder="product image"
            onChange={e => this.handleChange({ image: e.target.value })}
          />
        </FormField>

        <Button dataHook="add" onClick={this.handleAdd}>
          Add
        </Button>
        <Button
          dataHook="cancel"
          onClick={this.handleCancel}
          skin="destructive"
          upgrade
        >
          Cancel!
        </Button>
      </div>
    );
  }
}

export default translate()(AddProduct);
