import axios from 'axios';
import {
  buttonTestkitFactory,
  inputTestkitFactory,
} from 'wix-style-react/dist/testkit/puppeteer';

const mockedProductsList = [
  {
    name: 'Product 1',
    description: 'some description',
    price: '22',
    img: 'http://bla.com/diHZhfxwDg',
  },
  {
    name: 'Product 2',
    description: 'some description',
    price: '223',
    img: 'http://bla.com/diHZhfxwDg',
  },
];

const toHtmlVisibleProduct = ({ name, description, price, img }) => {
  return {
    name: `Product: ${name} - ${name}`,
    description,
    price: `${price}₪`,
    img: `${img}`,
  };
};
// TODO: check for productList === null

const appDriver = page => ({
  navigateHomepage: () => page.goto(app.getUrl('/crash-store-8/')),
  navigateAddProductPage: () => page.goto(app.getUrl('/crash-store-8/new')),
  getProductsList: () => page.$('[data-hook="products-list-container"]'),
  getProductsListTitle: () =>
    page.$eval(
      '[data-hook="products-list-container"] h2',
      el => el.textContent,
    ),
  getProducts: () =>
    page.$$eval('[data-hook="products-list-container"] tbody tr', e =>
      Array.from(e).map(el => ({
        name: el.children[0].innerText,
        description: el.children[1].innerText,
      })),
    ),
  fillProductDetails: async ({ name, description, price, img }) => {
    if (name) {
      const testkit = await inputTestkitFactory({ dataHook: 'name', page });
      await testkit.enterText(name);
    }
    if (description) {
      const testkit = await inputTestkitFactory({
        dataHook: 'description',
        page,
      });
      await testkit.enterText(description);
    }
    if (price) {
      const testkit = await inputTestkitFactory({
        dataHook: 'price',
        page,
      });
      await testkit.enterText(price);
    }
    if (img) {
      const testkit = await inputTestkitFactory({
        dataHook: 'img',
        page,
      });
      await testkit.enterText(img);
    }
  },
  cancelAddProduct: async () => {
    const testkit = await buttonTestkitFactory({ dataHook: 'cancel', page });
    testkit.click();
  },
  addProduct: async () => {
    const testkit = await buttonTestkitFactory({ dataHook: 'add', page });
    testkit.click();
  },
  waitForProductItems: () =>
    page.waitForSelector('[data-hook="products-item"]'),
  getAllProductItems: () => page.$$('[data-hook="product-list"] tr'),
  fetchProducts: (additions = []) => {
    rpcServer
      .when('ProductsService', 'fetch')
      .respond(([id]) =>
        id === '2963d463-3ce5-4d22-ab81-7b1b4d09c8db'
          ? mockedProductsList.concat(additions)
          : null,
      );
  },
  fetchProductRpc: () => {
    rpcServer
      .when('ProductsService', 'fetchProduct')
      .respond(([id, name]) =>
        id === '2963d463-3ce5-4d22-ab81-7b1b4d09c8db'
          ? mockedProductsList[0]
          : null,
      );
  },
  addRPCProduct: productDetails => {
    rpcServer
      .when('ProductsService', 'add')
      .respond(([id, values]) =>
        JSON.stringify(values) === JSON.stringify(productDetails)
          ? productDetails
          : null,
      );
  },
  getNavigateAddProductLink: async () => {
    const testkit = await buttonTestkitFactory({
      dataHook: 'add-product-link',
      page,
    });
    return testkit.element();
  },
  takeScreenshot: () => page.screenshot({ path: './test.png' }),
  clickFirstProduct: () =>
    page.click('[data-hook="products-list-container"] tbody tr'),
  getProduct: () =>
    page.$eval('[data-hook="product"]', el => ({
      name: el.children[0].innerText,
      description: el.children[1].innerText,
      price: el.children[2].innerText,
      img: el.children[3].children[0].src,
    })),
  getDefaultExperiments: () => {
    petriServer.onConductAllInScope(() => ({
      'specs.crash-course.IsAddButtonEnabled': 'true',
    }));
  },
});

let driver;

beforeEach(() => {
  driver = appDriver(page);
});

afterEach(() => {
  rpcServer.reset();
});

describe('React application', () => {
  it('should display add product title', async () => {
    driver.getDefaultExperiments();
    await driver.navigateAddProductPage();
    expect(await page.$eval('h2', e => e.innerText)).toEqual('Add product');
  });

  it('should contain products list:', async () => {
    driver.getDefaultExperiments();
    await driver.fetchProducts();
    await driver.navigateHomepage();
    await new Promise(res => setTimeout(res, 300));
    expect(await driver.getProductsList()).toBeTruthy();
  });

  it('should contain products list title All Products List', async () => {
    driver.getDefaultExperiments();
    await driver.fetchProducts();
    await driver.navigateHomepage();
    await new Promise(res => setTimeout(res, 300));
    expect(await driver.getProductsListTitle()).toBe('All Products List');
  });

  it('should contain withing product list one product item', async () => {
    driver.getDefaultExperiments();
    await driver.fetchProducts();
    await driver.navigateHomepage();
    await new Promise(res => setTimeout(res, 300));
    expect(await driver.getProducts()).toHaveLength(2);
  });

  it('should fetch and render products list', async () => {
    driver.getDefaultExperiments();
    await driver.fetchProducts();
    await driver.navigateHomepage();
    await new Promise(res => setTimeout(res, 300));
    // add eventually maybe
    expect(await driver.getProducts()).toHaveLength(mockedProductsList.length);
  });

  describe('Product item', () => {
    it('should contain title', async () => {
      driver.getDefaultExperiments();
      await driver.fetchProducts();
      await driver.navigateHomepage();
      await new Promise(res => setTimeout(res, 300));
      expect(await driver.getAllProductItems()).toBeTruthy();
    });

    it('should contain descr', async () => {
      driver.getDefaultExperiments();
      await driver.fetchProducts();
      await driver.navigateHomepage();
      await new Promise(res => setTimeout(res, 300));
      expect(await driver.getAllProductItems()).toBeTruthy();
    });
  });

  describe('Add Product Page', () => {
    it('should add product but cancel', async () => {
      driver.getDefaultExperiments();
      await driver.fetchProducts();
      await driver.navigateAddProductPage();
      expect(await page.$eval('h2', e => e.innerText)).toEqual('Add product');

      await driver.fillProductDetails({ name: 'bla' });
      await driver.cancelAddProduct();
      await new Promise(resolve => setTimeout(resolve, 300));
      expect(await page.$eval('h2', e => e.innerText)).toEqual(
        'All Products List',
      );
    });

    it('should add product', async () => {
      driver.getDefaultExperiments();
      await driver.fetchProducts();

      const productDetails = {
        name: 'new product',
        description: 'this is a bla product',
      };
      await driver.navigateAddProductPage();
      await driver.fillProductDetails(productDetails);
      await driver.addRPCProduct();
      await driver.addProduct();
      await driver.fetchProducts(productDetails);
      await new Promise(resolve => setTimeout(resolve, 300));
      const products = await driver.getProducts();
      expect(products[products.length - 1]).toEqual(productDetails);
    });
  });

  describe('Product Page', () => {
    it('should see product', async () => {
      driver.getDefaultExperiments();
      await driver.fetchProducts();
      await driver.fetchProductRpc();
      await driver.navigateHomepage();
      await new Promise(resolve => setTimeout(resolve, 300));
      await driver.clickFirstProduct();
      await new Promise(resolve => setTimeout(resolve, 300));
      const product = toHtmlVisibleProduct(mockedProductsList[0]);
      expect(await driver.getProduct()).toEqual(product);
    });
  });

  describe('Experiment: ', () => {
    afterEach(() => petriServer.reset());

    it('should render add product button', async () => {
      driver.getDefaultExperiments();
      await driver.fetchProducts();
      await driver.navigateHomepage();
      expect(await driver.getNavigateAddProductLink()).toBeTruthy();
    });

    it('should not  render add product button', async () => {
      petriServer.onConductAllInScope(() => ({
        'specs.crash-course.IsAddButtonEnabled': 'false',
      }));
      await driver.fetchProducts();
      await driver.navigateHomepage();

      expect(await driver.getNavigateAddProductLink()).toBeNull();
    });
  });
});
