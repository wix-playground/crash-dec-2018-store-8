const {
  bootstrapServer,
  emitConfigs,
  bootstrapRpcServer,
  bootstrapPetriServer,
} = require('./test/environment');

const port = parseInt(process.env.PORT);
const appConfDir = './target/dev/configs';
const products = [
  {
    name: 'Name',
    description: 'Description',
    price: '22',
    img: 'sss',
  },
  {
    name: 'Product 1',
    description: 'some description',
    price: 'GVExxnpJBs',
    img: 'diHZhfxwDg',
  },
];

(async () => {
  const petriPort = port + 3;
  const app = bootstrapServer({
    port,
    managementPort: port + 1,
    appConfDir,
    petriPort,
  });
  const rpcServer = bootstrapRpcServer({ port: port + 2 });
  const petriServer = bootstrapPetriServer({ port: petriPort });

  rpcServer.when('ProductsService', 'fetch').respond(products);
  rpcServer.when('ProductsService', 'fetchProduct').respond(([id, product]) => {
    return product;
  });

  rpcServer
    .when("ProductsService", "add")
    .respond(([id, product]) => {
      products.push(product);
      return null;
    });

  petriServer.onConductAllInScope(() => ({
    'specs.crash-course.IsAddButtonEnabled': 'true',
  }));

  await emitConfigs({ targetFolder: appConfDir, rpcServer });

  await rpcServer.start();
  await petriServer.start();
  await app.start();
})();
