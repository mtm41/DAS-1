const lightwallet = require('eth-signer')

const Web3 = require('web3')
const fs = require('fs')
const jsonFile = "./test/ControllerABI.json"
const parsed = JSON.parse(fs.readFileSync(jsonFile));
var abi = parsed.abi

const rpcURL = "https://rinkeby.infura.io/v3/5a89659ce65f4481a1eed03a96b7f3ab"
const web3 = new Web3(rpcURL)
const controllerAddress = "0xa39A5E3a765bee886563CcF693a640cfa54Ee78d"
//import ControllerABI from './ControllerABI.json'

/*let data = lightwallet.txutils._encodeFunctionTxData('vote', ['uint256'], [1])
        IdentityController.methods.forwardTo('0xf2E9F7CC0a5Da1b0beed3b12410A9231cE3b5e75', '0x4Acd02F8346dF5400BaA3c712b1239733dE36a67', 0, '0x' + data)
                                  .call((err, result) => {
                                      if (err)
                                        console.log('ERROR! ' + err)
                                      else
                                        console.log(result)
                                  })*/

contract('IdentityController', () => {

    it('should create an identity', async () => {
        const IdentityController = new web3.eth.Contract(abi, controllerAddress)
        console.log(IdentityController)
        await IdentityController.methods.createIdentity('0xf2E9F7CC0a5Da1b0beed3b12410A9231cE3b5e75', 'pubkey')
                                  .send({from: '0x19eF977b7530D5a8a61c364FB9E7aF23F42CdD9e'}).then(function(receipt) {
                                      console.log(receipt)
                                  })
    });

    it('should interact with Election Contract', async () => {
        
    });
});