const Web3 = require('web3')
const mycontract = require('../build/contracts/IdentityController.json')
const HDWalletProvider = require("truffle-hdwallet-provider")
const lightwallet = require('eth-signer')

const address = '0x19eF977b7530D5a8a61c364FB9E7aF23F42CdD9e'
const privateKey = 'd80e00dc4d83d83db9ebb0bd079f01e82e42d3cd44177e40e05f3be3dd3aef4002f38d3de420b6e781000fa1030fddfc'

const init = async () => {
    const provider = new HDWalletProvider(
        'panel attack spot cause mixed uniform menu actress much expand claw wealth',
        'https://rinkeby.infura.io/v3/5a89659ce65f4481a1eed03a96b7f3ab'
    );
    const web3 = new Web3(provider);

    let contract = new web3.eth.Contract(
        mycontract.abi,
        '0xa39A5E3a765bee886563CcF693a640cfa54Ee78d',
    );

    contract.methods.createIdentity('0x19eF977b7530D5a8a61c364FB9E7aF23F42CdD9e', 'pubkey').send({
        from: '0x19eF977b7530D5a8a61c364FB9E7aF23F42CdD9e',
    }, function(receipt) {
        console.log(receipt)
    })

    /*let data = lightwallet.txutils._encodeFunctionTxData('vote', ['uint256'], [1])
    contract.methods.forwardTo("0x19eF977b7530D5a8a61c364FB9E7aF23F42CdD9e", '0x4Acd02F8346dF5400BaA3c712b1239733dE36a67', 0, '0x' + data).send({
        from: '0xa39A5E3a765bee886563CcF693a640cfa54Ee78d',
    }), function(receipt) {
        console.log(receipt)
    }*/
}

init()