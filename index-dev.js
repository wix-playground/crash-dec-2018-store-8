const {
  bootstrapServer,
  emitConfigs,
  bootstrapRpcServer,
  bootstrapPetriServer,
} = require('./test/environment');

const port = parseInt(process.env.PORT);
const appConfDir = './target/dev/configs';

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

  // rpcServer
  //  .when("CommentsService", "fetch")
  //  .respond([{ text: "Hello World", author: "Uncle Bob" }]);

  // petriServer.onConductAllInScope(() => ({
  //   "specs.productstoreori.IsNewButtonEnabled": "true"
  // }));

  await emitConfigs({ targetFolder: appConfDir, rpcServer });

  await rpcServer.start();
  await petriServer.start();
  await app.start();
})();
