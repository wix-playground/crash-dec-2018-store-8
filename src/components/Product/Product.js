import React from 'react';
import { Link } from '@reach/router';
import axios from 'axios';

class Product extends React.Component {
  state = {};

  async componentDidMount() {
    const { productId } = this.props;
    const { data: product } = await axios.get(`/api/products/${productId}`);
    this.setState({ product });
  }

  render() {
    const { product } = this.state;
    const { productId } = this.props;

    return product ? (
      <div data-hook="product">
        <h1>
          Product: {product.name} - {productId}
        </h1>
        <div>{product.description}</div>
        <div>{product.price}₪</div>
        <img src={product.img} alt={product.img} />
        <br />
        <Link to="../../">Back</Link>
      </div>
    ) : null;
  }
}
export default Product;
