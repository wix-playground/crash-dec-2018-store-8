import React from 'react';
import PropTypes from 'prop-types';

class ProductsList extends React.Component {
  static propTypes = {
  };

  productItem = {
    name:"Product 1",
    description:"some description",
    price:"GVExxnpJBs",
    img:"diHZhfxwDg"
  };
  productsList = [this.productItem];

  render() {
    return (
      <div data-hook="products-list">
        <h1>All Products List</h1>
        {
          this.productsList.map((productItem) => (
            <div data-hook="product-item" key={productItem.name}>
              <h3>{productItem.name}</h3>
              <p>{productItem.description}</p>
            </div>
          ))
        }

      </div>
    );
  }
}
export default ProductsList;
