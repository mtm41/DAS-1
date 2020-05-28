const Web3 = require('web3')
const mycontract = require('../../identity-manager/build/contracts/IdentityController.json')
const HDWalletProvider = require("truffle-hdwallet-provider")
const lightwallet = require('eth-signer')
const request = require('request')

const provider = new HDWalletProvider(
    proccess.env.WALLET_PRIVATE_WORDS, //wallet private word list
    'https://rinkeby.infura.io/v3/5a89659ce65f4481a1eed03a96b7f3ab'
);
const web3 = new Web3(provider);

let contract = new web3.eth.Contract(
    mycontract.abi,
    '0xeB522a0730e4F19D2B6A6b009D5d89DC51Df3cD4',
);

async function sendCredential(orgAddress, userAddress, credential, email) {
    await contract.methods.sendCredential(orgAddress, userAddress, credential.name, credential.emitDate.toString(), '2021-05-06T18:31:18.621Z').send({
        from: '0x19eF977b7530D5a8a61c364FB9E7aF23F42CdD9e',
    }, function(receipt) {
        const mailer = require('../configs/mailer');
        mailer({
            from: 'Das project',
            to: email,
            subject: 'Credencial enviado',
            html: 'El credencial ha sido enviado. Más información: ' + receipt
        });
        return 'Credencial enviado con éxito'
    })
    
}

module.exports = sendCredential