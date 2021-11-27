const proxy = require("@sap/cds-odata-v2-adapter-proxy");
const cds = require("@sap/cds");
const cors = require("cors");
//  cds.on('bootstrap', (app) => {app.use(proxy()
//     app.use(cors()
// }))

cds.on("bootstrap", (app) => {
  console.debug("Use: cors middleware");
  app.use(proxy());
  app.use(cors());
});
module.exports = cds.server;
