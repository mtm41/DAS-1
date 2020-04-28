const lightwallet = require('eth-signer')

const IdentityController = artifacts.require("IdentityController");
const IdentityProxy = artifacts.require("IdentityProxy");
const Election = artifacts.require("Election");

contract('IdentityController', () => {

    /*it('should create an identity', async () => {
        
        const IdentityControllerInstance = await IdentityController.deployed();
        const newIdentity = (await IdentityControllerInstance.createIdentity.call("0xf2E9F7CC0a5Da1b0beed3b12410A9231cE3b5e75", "pubkey1"));
        console.log(newIdentity);

        assert.equal(newIdentity, '0xf2E9F7CC0a5Da1b0beed3b12410A9231cE3b5e75');
    });*/

    it('should interact with Election Contract', async () => {
        
        const IdentityControllerInstance = await IdentityController.deployed();
      //  const IdentityProxyInstance = await IdentityProxy.deployed();
       // const ElectionInstance = await Election.deployed();

        let data = lightwallet.txutils._encodeFunctionTxData('vote', ['uint256'], [1])
        var error = false;
        console.log('CONTROLADOR: ' + IdentityControllerInstance.address)
        //console.log('PROXY: ' + IdentityProxyInstance.address)
        try{
            await IdentityControllerInstance.forwardToTest.call("0xf2E9F7CC0a5Da1b0beed3b12410A9231cE3b5e75",
                                                                    "0xbD35CBEe9f4399A66480B9eBB8397a6A8d6552d3",
                                                                    0, '0x' + data);
        
        } catch (e){
            error = true;
            console.log(e)
        }
        assert.equal(error, false);
    });
});