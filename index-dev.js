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
    name: 'Product1',
    description: 'this is a description',
    price: '22',
    img: 'http://www.gendaiya.co.jp/s_fgeta/dai/komachi-getaM-v500.jpg',
  },
  {
    name: 'Product 2',
    description: 'some other description',
    price: '124',
    img: 'http://www.gendaiya.co.jp/s_fgeta/dai/komachi-getaM-bb1-v500.jpg',
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
  rpcServer.when('ProductsService', 'fetchProduct').respond(([id, name]) => {
    return products.find(p => p.name === name);
  });

  rpcServer.when('ProductsService', 'add').respond(([id, product]) => {
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
