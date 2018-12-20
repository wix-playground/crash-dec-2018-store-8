import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from '@reach/router';

class ProductsList extends React.Component {
  static propTypes = {};

  state = {
    productsList: [],
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
        <table>
          <tbody>
            {productsList &&
              productsList.map(productItem => (
                <tr key={productItem.name}>
                  <td>
                    <Link to={`product/${productItem.name}`}>
                      {productItem.name}
                    </Link>
                  </td>
                  <td>{productItem.description}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ProductsList;
