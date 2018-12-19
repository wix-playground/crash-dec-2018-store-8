// import axios from 'axios';

const appDriver = page => ({
  navigate: () => page.goto(app.getUrl('/')),
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
    await driver.navigate();

    expect(await page.$eval('h2', e => e.innerText)).toEqual('Hello World!');
  });
});
