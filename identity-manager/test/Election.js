const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const lightwallet = require('eth-signer')


async function testCreateIdentityInfura(){


    const account = '0x19eF977b7530D5a8a61c364FB9E7aF23F42CdD9e' //PRIVATE KEY
    const privateKey = Buffer.from('2A4A3E2D2D2567C9B58B6C5C081EF35A4F87490670AC84095CC254EAD6EDD938', 'hex')

    const provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/5a89659ce65f4481a1eed03a96b7f3ab");
    const web3 = new Web3(provider);
    web3.eth.net.isListening()
    .then(() => {
        console.log('web3 is connected')

        const abi=[
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "_candidateId",
                    "type": "uint256"
                  }
                ],
                "name": "votedEvent",
                "type": "event"
              },
              {
                "constant": true,
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "name": "candidates",
                "outputs": [
                  {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                  },
                  {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "voteCount",
                    "type": "uint256"
                  }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
              },
              {
                "constant": true,
                "inputs": [],
                "name": "candidatesCount",
                "outputs": [
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
              },
              {
                "constant": true,
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                  }
                ],
                "name": "voters",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
              },
              {
                "constant": false,
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "_candidateId",
                    "type": "uint256"
                  }
                ],
                "name": "vote",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
              }
        ];
        const contract_Address="0x4Acd02F8346dF5400BaA3c712b1239733dE36a67";
        const contract = new web3.eth.Contract(abi, contract_Address);
    
    
        const myData = contract.methods.vote(1).encodeABI();
        let data = lightwallet.txutils._encodeFunctionTxData('vote', ['uint256'], [1])
        web3.eth.getTransactionCount(account, (err, txCount) => {
            // Build the transaction
        const txObject = {
            nonce:    web3.utils.toHex(txCount),
            to:       contract_Address,
            value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
            gasLimit: web3.utils.toHex(2100000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
            data: data  
        }
    
        // Sign the transaction
        const tx = new Tx(txObject);
        tx.sign(privateKey);
    
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
    
        console.log('TX')
        // Broadcast the transaction
        const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
            console.log('TRANSACCION')
            console.log(raw)
            console.log(tx)
        });
        })
    })
    .catch(e => console.log('Wow. Something went wrong'));
    
}

testCreateIdentityInfura()