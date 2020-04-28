const HDWalletProvider = require("truffle-hdwallet-provider");

require('dotenv').config()  // Store environment-specific variable from '.env' to process.env

console.log(process.env.MNENOMIC + ' ' + process.env.INFURA_API_KEY)
module.exports = {
  // Uncommenting the defaults below 
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  //networks: {
  //  development: {
  //    host: "127.0.0.1",
  //    port: 7545,
  //    network_id: "*"
  //  },
  //  test: {
  //    host: "127.0.0.1",
  //    port: 7545,
  //    network_id: "*"
  //  }
  //}
  //
  networks: {
    contracts_directory: "./contracts/",
    rinkeby: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://rinkeby.infura.io/v3/5a89659ce65f4481a1eed03a96b7f3ab"),
      network_id: 4,
      gas: 3000000,
      gasPrice: 10000000000
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: 5777
    }
  }
};
