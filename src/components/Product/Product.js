import React from 'react';
import { Link } from '@reach/router';

function Product({ productId, product: { name, description, price, img } }) {
  return (
    <div data-hook="product">
      <h1>
        Product: {name} - {productId}
      </h1>
      <div>{description}</div>
      <div>{price}₪</div>
      <img src={img} alt={img} />

      <Link to="../../">Back</Link>
    </div>
  );
}
export default Product;
