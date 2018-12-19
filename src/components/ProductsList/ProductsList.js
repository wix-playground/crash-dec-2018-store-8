import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class ProductsList extends React.Component {
  static propTypes = {
  };

  state = {
    productsList: []
  };

  productItem = {
    name:"Product 1",
    description:"some description",
    price:"GVExxnpJBs",
    img:"diHZhfxwDg"
  };

  componentDidMount() {
    void this.handleFetchProducts();
  }

  handleFetchProducts = async () => {
    const { data } = await axios.get('/api/products');
    this.setState({
      productsList: data,
    });
  };

  render() {
    const { productsList } = this.state;
    return (
      <div data-hook="products-list">
        <h1>All Products List</h1>
        {productsList.map((productItem) => (
            <div data-hook="product-item" key={productItem.name}>
              <h3>{productItem.name}</h3>
              <p>{productItem.description}</p>
            </div>
          ))}
      </div>
    );
  }
}
export default ProductsList;
