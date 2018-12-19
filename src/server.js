import wixExpressCsrf from '@wix/wix-express-csrf';
import wixExpressRequireHttps from '@wix/wix-express-require-https';
import bodyParser from 'body-parser';

const siteId = '2963d463-3ce5-4d22-ab81-7b1b4d09c8db';
// This function is the main entry for our server. It accepts an express Router
// (see http://expressjs.com) and attaches routes and middlewares to it.
//
// `context` is an object with built-in services from `wix-bootstrap-ng`. See
// https://github.com/wix-platform/wix-node-platform/tree/master/bootstrap/wix-bootstrap-ng).
module.exports = (app, context) => {
  // We load the already parsed ERB configuration (located at /templates folder).
  const config = context.config.load('crash-dec-2018-store-8');

  // Attach CSRF protection middleware. See
  // https://github.com/wix-platform/wix-node-platform/tree/master/express/wix-express-csrf.
  app.use(wixExpressCsrf());

  // Require HTTPS by redirecting to HTTPS from HTTP. Only active in a production environment.
  // See https://github.com/wix-platform/wix-node-platform/tree/master/express/wix-express-require-https.
  app.use(wixExpressRequireHttps);

  // Attach a rendering middleware, it adds the `renderView` method to every request.
  // See https://github.com/wix-private/fed-infra/tree/master/wix-bootstrap-renderer.
  app.use(context.renderer.middleware());
  app.use(bodyParser.json());

  if (process.env.NODE_ENV !== 'production') {
    app.get('/', (req, res) => {
      res.redirect('/crash-store-8');
    });
  }

  app.get('/api/products', async (req, res) => {
    const rpcResponse = await context.rpc
      .clientFactory(config.services.productsUrl, 'ProductsService')
      .client(req.aspects)
      .invoke('fetch', siteId);
    res.json(rpcResponse);
  });

  app.post('/api/products', async (req, res) => {
    const { name, description, price, image } = req.body;
    const rpcResponse = await context.rpc
      .clientFactory(config.services.productsUrl, 'ProductsService')
      .client(req.aspects)
      .invoke('add', siteId, { name, description, price, image });
    res.json(rpcResponse);
  });
  // TODO: add
  // app.get('api/products/:name')

  // Define a route to render our initial HTML.
  app.get('*', async (req, res) => {
    const petriResponse = await context.petri
      .client(req.aspects)
      .conductAllInScope('crash-course');

    const experiments = JSON.stringify(petriResponse);
    // Extract some data from every incoming request.
    const renderModel = getRenderModel(req);

    // Send a response back to the client.
    res.renderView('./index.ejs', { experiments, ...renderModel });
  });

  function getRenderModel(req) {
    const { language, basename, debug } = req.aspects['web-context'];

    return {
      language,
      basename,
      debug: debug || process.env.NODE_ENV === 'development',
      title: 'Wix Full Stack Project Boilerplate',
      staticsDomain: config.clientTopology.staticsDomain,
    };
  }

  return app;
};
