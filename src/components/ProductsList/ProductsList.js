import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from '@reach/router';
import { withExperiments } from 'wix-experiments-react';

class ProductsList extends React.Component {
  static propTypes = {};

  state = {
    productsList: null,
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
    const { experiments } = this.props;
    const addProductEnabled = experiments.enabled(
      'specs.crash-course.IsAddButtonEnabled',
    );
    return (
      <div data-hook="products-list">
        <h2>All Products List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
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

        {addProductEnabled && (
          <Link to="new" data-hook="add-product-link">
            Add product
          </Link>
        )}
      </div>
    );
  }
}
export default withExperiments(ProductsList);
