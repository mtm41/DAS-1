const ConvertLib = artifacts.require("ConvertLib");
//const IdentityManager = artifacts.require("DidResolver.sol");
const IdentityController = artifacts.require("IdentityController.sol");
const IdentityProxy = artifacts.require("IdentityProxy.sol");
const Election = artifacts.require("Election.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  //deployer.link(ConvertLib, IdentityManager);
  deployer.link(ConvertLib, IdentityController)
  //deployer.deploy(IdentityManager);
  deployer.deploy(IdentityController);
  deployer.link(ConvertLib, Election);
  deployer.deploy(Election);
  //deployer.link(ConvertLib, IdentityProxy);
  //deployer.deploy(IdentityProxy);
};
