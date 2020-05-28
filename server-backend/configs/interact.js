const Web3 = require('web3')
const mycontract = require('../../identity-manager/build/contracts/IdentityController.json')
const HDWalletProvider = require("truffle-hdwallet-provider")
const lightwallet = require('eth-signer')
const request = require('request')

const provider = new HDWalletProvider(
    process.env.WALLET_PRIVATE_WORDS, //wallet private word list
    'https://rinkeby.infura.io/v3/5a89659ce65f4481a1eed03a96b7f3ab'
);
const web3 = new Web3(provider);

let contract = new web3.eth.Contract(
    mycontract.abi,
    '0xeB522a0730e4F19D2B6A6b009D5d89DC51Df3cD4',
);

async function contractInteraction(userAddress, contractAddress) {
    // API request to get Smart Contract verified code
    request("https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=" + contractAddress + '&apikey=' + process.env.APIKEY_RINKEBY_ETHERCAN,
            { json: true },  (err, res, body) => {
                if (err) { return console.log(err); }
                
                /* Compare abi code with parameters given by the user */

                /*let data = lightwallet.txutils._encodeFunctionTxData('candidatesCount', [], [])
                console.log(userAddress)
                contract.methods.forwardTo(userAddress, contractAddress, 0, '0x' + data).send({from: '0x19eF977b7530D5a8a61c364FB9E7aF23F42CdD9e',
                    }, function(receipt) {
                        console.log(receipt)
                    })*/



                let data = lightwallet.txutils._encodeFunctionTxData('vote', ['uint256'], [1])
                contract.methods.forwardTo(userAddress, contractAddress, 0, '0x' + data).send({from: '0x19eF977b7530D5a8a61c364FB9E7aF23F42CdD9e',
                    }), function(receipt) {
                        console.log(receipt)
                    }
              });
}

module.exports = contractInteraction