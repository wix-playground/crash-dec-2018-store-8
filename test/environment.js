// https://github.com/wix-platform/wix-node-platform/tree/master/bootstrap/wix-bootstrap-testkit
const testkit = require('@wix/wix-bootstrap-testkit');
// https://github.com/wix-platform/wix-node-platform/tree/master/config/wix-config-emitter
const configEmitter = require('@wix/wix-config-emitter');
const rpctestkit = require('@wix/wix-rpc-testkit');
const petriTestkit = require('@wix/wix-petri-testkit');

// take erb configurations from source folder, replace values/functions,
// remove the ".erb" extension and emit files inside the target folder
// module.exports.emitConfigs = ({ targetFolder, rpcServer }) => {
module.exports.emitConfigs = ({ targetFolder }) => {
  const emitter = configEmitter({
    sourceFolders: ['./templates'],
    targetFolder,
  });

  return (
    emitter
      .val('scripts_domain', 'static.parastorage.com')
      // .fn(
      //   'rpc_service_url',
      //   'com.wixpress.npm.node-workshop-scala-app',
      //   rpcServer.getUrl(),
      // )
      .emit()
  );
};

module.exports.bootstrapRpcServer = ({ port }) => {
  return rpctestkit.server({ port });
};
module.exports.bootstrapPetriServer = ({ port }) => {
  return petriTestkit.server({ port });
};

// start the server as an embedded app
module.exports.bootstrapServer = ({
  port,
  managementPort,
  appConfDir,
  petriPort,
}) => {
  return testkit.app('./index', {
    env: {
      PORT: port,
      MANAGEMENT_PORT: managementPort,
      NEW_RELIC_LOG_LEVEL: 'warn',
      APP_CONF_DIR: appConfDir,
      DEBUG: '',
      WIX_BOOT_LABORATORY_URL: `http://localhost:${petriPort}`,
    },
  });
};
