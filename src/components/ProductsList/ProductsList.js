import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class ProductsList extends React.Component {
  static propTypes = {
  };

  state = {
    productsList: []
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
        {productsList && productsList.map((productItem) => (
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
