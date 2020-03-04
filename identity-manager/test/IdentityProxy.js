const lightwallet = require('eth-signer')

const IdentityProxy = artifacts.require("IdentityProxy");

contract('IdentityProxy', () => {
    it('Should create transaction with Election contract', async () => {
        const IdentityProxyInstance = await IdentityProxy.deployed();
        let data = lightwallet.txutils._encodeFunctionTxData('vote', ['uint256'], [1])
        console.log(data);
        var error = false;
        try{
            await IdentityProxyInstance.forward.call("0xbD35CBEe9f4399A66480B9eBB8397a6A8d6552d3",
                                                     0, '0x' + data);
        } catch (e){
            error = true;
            console.log(e)
        }
        assert.equal(error, false);
    });
});