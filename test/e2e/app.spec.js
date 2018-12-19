// import axios from 'axios';

const appDriver = page => ({
  navigateHomepage: () => page.goto(app.getUrl('/')),
  navigateAddProductPage: () => page.goto(app.getUrl('/new')),
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
    expect(await page.$eval('h2', e => e.innerText)).toEqual('Hello World!');
  });
});
