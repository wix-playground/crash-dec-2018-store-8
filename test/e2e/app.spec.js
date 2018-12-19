// import axios from 'axios';

const appDriver = page => ({
  navigateHomepage: () => page.goto(app.getUrl('/crash-store-8/')),
  navigateAddProductPage: () => page.goto(app.getUrl('/crash-store-8/new')),
  getProductsList: () => page.$('[data-hook="products-list"]'),
  getProductsListTitle: () =>
    page.$eval('[data-hook="products-list"] h1', el => el.innerText),
  getProductItem: () => page.$('[data-hook="product-item"]'),
  getProductItemTitle: () => page.$('[data-hook="product-item"] h3'),
  getProductItemDescr: () => page.$('[data-hook="product-item"] p'),
});

let driver;

beforeEach(() => {
  driver = appDriver(page);
});

// afterEach(() => {
//   axios.get(app.getUrl('/api/flush'));
// rpcServer.reset()
// });

// petriServer.onConductAllInScope(() => ({
//       "specs.cx.IsMyButtonBig": "true"
//     }));
// rpcServer
//   .when("CommentsService", "fetch")
//   .respond([{ text: "Hello World", author: "Uncle Bob" }]);

describe('React application', () => {
  it('should display title', async () => {
    petriServer.onConductAllInScope(() => ({
      'specs.crash-course.IsAddButtonEnabled': 'true',
    }));

    await driver.navigateHomepage();

    expect(await page.$eval('h2', e => e.innerText)).toEqual('Hello World!');
  });

  it('should display add product title', async () => {
    await driver.navigateAddProductPage();
    expect(await page.$eval('h2', e => e.innerText)).toEqual('Add product');
  });

  it('should contain products list:', async () => {
    await driver.navigateHomepage();

    expect(await driver.getProductsList()).toBeTruthy();
  });

  it('should contain products list title All Products List', async () => {
    await driver.navigateHomepage();

    expect(await driver.getProductsListTitle()).toBe('All Products List');
  });

  it('should contain withing product list one product item', async () => {
    await driver.navigateHomepage();
    expect(await driver.getProductItem()).toBeTruthy();
  });

  describe('Product item', () => {
    it('should contain title', async () => {
      await driver.navigateHomepage();
      expect(await driver.getProductItemTitle()).toBeTruthy();
    });

    it('should contain descr', async () => {
      await driver.navigateHomepage();
      expect(await driver.getProductItemDescr()).toBeTruthy();
    });
  });
});
