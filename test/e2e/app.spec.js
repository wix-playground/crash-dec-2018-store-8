import axios from 'axios';
import {
  buttonTestkitFactory,
  // formFieldTestkitFactory,
  inputTestkitFactory,
} from 'wix-style-react/dist/testkit/puppeteer';

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

// TODO: check for productList === null

const appDriver = page => ({
  navigateHomepage: () => page.goto(app.getUrl('/crash-store-8/')),
  navigateAddProductPage: () => page.goto(app.getUrl('/crash-store-8/new')),
  getProductsList: () => page.$('[data-hook="products-list"]'),
  getProductsListTitle: () =>
    page.$eval('[data-hook="products-list"] h1', el => el.innerText),
  getProducts: () =>
    page.$$eval('[data-hook="products-list"] tr', e =>
      Array.from(e).map(el => ({
        name: el.children[0].innerText,
        description: el.children[1].innerText,
      })),
    ),
  fillProductDetails: async ({ name, description, price, image }) => {
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
    if (image) {
      const testkit = await inputTestkitFactory({
        dataHook: 'image',
        page,
      });
      await testkit.enterText(image);
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
  addRPCProduct: productDetails => {
    rpcServer
      .when('ProductsService', 'add')
      .respond(([id, values]) =>
        JSON.stringify(values) === JSON.stringify(productDetails)
          ? productDetails
          : null,
      );
  },
  takeScreenshot: () => page.screenshot({ path: './test.png' }),
});

let driver;

beforeEach(() => {
  driver = appDriver(page);
});

afterEach(() => {
  axios.get(app.getUrl('/api/flush'));
  rpcServer.reset();
});

// petriServer.onConductAllInScope(() => ({
//       "specs.cx.IsMyButtonBig": "true"
//     }));
// rpcServer
//   .when("CommentsService", "fetch")
//   .respond([{ text: "Hello World", author: "Uncle Bob" }]);
// petriServer.onConductAllInScope(() => ({
//   'specs.crash-course.IsAddButtonEnabled': 'true',
// }));

describe('React application', () => {
  it('should display add product title', async () => {
    await driver.navigateAddProductPage();
    expect(await page.$eval('h2', e => e.innerText)).toEqual('Add product');
  });

  it('should contain products list:', async () => {
    await driver.fetchProducts();
    await driver.navigateHomepage();
    await new Promise(res => setTimeout(res, 300));
    expect(await driver.getProductsList()).toBeTruthy();
  });

  it('should contain products list title All Products List', async () => {
    await driver.fetchProducts();
    await driver.navigateHomepage();
    await new Promise(res => setTimeout(res, 300));
    expect(await driver.getProductsListTitle()).toBe('All Products List');
  });

  it('should contain withing product list one product item', async () => {
    await driver.fetchProducts();
    await driver.navigateHomepage();
    await new Promise(res => setTimeout(res, 300));
    expect(await driver.getProducts()).toHaveLength(2);
  });

  it('should fetch and render products list', async () => {
    await driver.fetchProducts();
    await driver.navigateHomepage();
    await new Promise(res => setTimeout(res, 300));

    expect(await driver.getProducts()).toHaveLength(mockedProductsList.length);
  });

  describe('Product item', () => {
    it('should contain title', async () => {
      await driver.fetchProducts();
      await driver.navigateHomepage();
      await new Promise(res => setTimeout(res, 300));
      expect(await driver.getAllProductItems()).toBeTruthy();
    });

    it('should contain descr', async () => {
      await driver.fetchProducts();
      await driver.navigateHomepage();
      await new Promise(res => setTimeout(res, 300));
      expect(await driver.getAllProductItems()).toBeTruthy();
    });
  });

  describe('Add Product Page', () => {
    it('should add product but cancel', async () => {
      await driver.fetchProducts();
      await driver.navigateAddProductPage();
      expect(await page.$eval('h2', e => e.innerText)).toEqual('Add product');

      await driver.fillProductDetails({ name: 'bla' });
      await driver.cancelAddProduct();
      await new Promise(resolve => setTimeout(resolve, 300));
      expect(await page.$eval('h2', e => e.innerText)).toEqual('Awesome store');
    });

    it('should add product', async () => {
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
});
