import axios from 'axios';

describe('When rendering', () => {
  afterEach(() => rpcServer.reset());

  it('should display a title', async () => {
    petriServer.onConductAllInScope(() => ({
      'specs.crash-course.IsAddButtonEnabled': 'true',
    }));
    const url = app.getUrl('/');
    const response = await axios.get(url);

    expect(response.data).toContain('Wix Full Stack Project Boilerplate');
  });

  it('should return products list', async () => {
    const mockedProductsList = [
      {
        name: 'Product 1',
        description: 'some description',
        price: '22',
        img: 'diHZhfxwDg',
      },
      {
        name: 'Product 2',
        description: 'some description',
        price: '223',
        img: 'diHZhfxwDg',
      },
    ];

    const url = app.getUrl('/api/products');

    rpcServer
      .when('ProductsService', 'fetch')
      .respond(([id]) =>
        id === '2963d463-3ce5-4d22-ab81-7b1b4d09c8db'
          ? mockedProductsList
          : null,
      );

    const response = await axios.get(url);
    expect(response.data).toEqual(mockedProductsList);
  });

  it('should returns information for the specific product', async () => {
    const mockedProduct = {
      name: 'Product2',
      description: 'some description',
      price: '223',
      img: 'diHZhfxwDg',
    };

    const url = app.getUrl(`/api/products/${mockedProduct.name}`);

    rpcServer
      .when('ProductsService', 'fetchProduct')
      .respond(([id, name]) =>
        name === mockedProduct.name ? mockedProduct : null,
      );

    const response = await axios.get(url);
    expect(response.data).toEqual(mockedProduct);
  });

  it('should returns null when adding new product', async () => {
    const mockedProduct = {
      name: 'Product2',
      description: 'some description',
      price: '223',
      img: 'diHZhfxwDg',
    };

    const url = app.getUrl(`/api/products`);

    rpcServer.when('ProductsService', 'add').respond(([id, newProduct]) => {
      return JSON.stringify(newProduct) === JSON.stringify(mockedProduct) ? null : 'error';
      }
    );

    const response = await axios.post(url, mockedProduct);

    expect(response.data).toBeNull();
  });
});
