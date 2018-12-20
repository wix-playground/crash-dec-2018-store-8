import axios from 'axios';

export function fetchProducts() {
  return axios.get('/api/products');
}

export function fetchProduct(name) {
  return axios.get(`/api/products/${name}`);
}

export function addProduct(newProduct) {
  return axios.post('/api/products', newProduct);
}
