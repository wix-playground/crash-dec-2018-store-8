import React from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import { withExperiments } from 'wix-experiments-react';
import Table from 'wix-style-react/Table';
import Button from 'wix-style-react/Button';

class ProductsList extends React.Component {
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

  handleProductClicked = product => {
    navigate(`/crash-store-8/product/${product.name}`);
  };

  handleAddProductClicked() {
    navigate(`/crash-store-8/new`);
  }

  render() {
    const { productsList } = this.state;
    const { experiments } = this.props;
    const addProductEnabled = experiments.enabled(
      'specs.crash-course.IsAddButtonEnabled',
    );
    return (
      <div data-hook="products-list-container">
        <h2>All Products List</h2>
        {addProductEnabled && (
          <Button
            dataHook="add-product-link"
            onClick={this.handleAddProductClicked}
          >
            Add product
          </Button>
        )}
        <Table
          dataHook="products-list"
          sortable
          onRowClick={this.handleProductClicked}
          data={productsList}
          columns={[
            {
              title: 'Name',
              render: row => <span>{row.name}</span>,
              width: '50%',
              minWidth: '150px',
              align: 'start',
            },
            {
              title: 'Description',
              render: row => <span>{row.description}</span>,
              width: '50%',
              minWidth: '150px',
              align: 'start',
            },
          ]}
        />
      </div>
    );
  }
}
export default withExperiments(ProductsList);
