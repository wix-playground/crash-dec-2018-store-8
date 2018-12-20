import React from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import Heading from 'wix-style-react/Heading';
import s from './Product.scss';

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
        <Heading appearance="H2">
          Product: {product.name} - {productId}
        </Heading>
        <Heading appearance="H3">{product.description}</Heading>
        <Heading appearance="H3">{product.price}₪</Heading>
        <div>
          <img src={product.img} alt={product.img} className={s.productImage} />
        </div>

        <Link to="../../">Back</Link>
      </div>
    ) : (
      <Link to="../../">Back</Link>
    );
  }
}
export default Product;
