const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;


async function testCreateIdentityInfura(){


    const account = '0x19eF977b7530D5a8a61c364FB9E7aF23F42CdD9e' //Organizational Account
    const privateKey = Buffer.from('0xd80e00dc4d83d83db9ebb0bd079f01e82e42d3cd44177e40e05f3be3dd3aef4002f38d3de420b6e781000fa1030fddfc', 'hex') //Private key

    const provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/5a89659ce65f4481a1eed03a96b7f3ab");
    const web3 = new Web3(provider);
    web3.eth.net.isListening()
    .then(() => {
        console.log('web3 is connected')

        const abi=[
            {
            "anonymous": false,
            "inputs": [
                {
                "indexed": false,
                "internalType": "address",
                "name": "creator",
                "type": "address"
                },
                {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
                }
            ],
            "name": "IdentityCreated",
            "type": "event"
            },
            {
            "constant": false,
            "inputs": [
                {
                "internalType": "address",
                "name": "owner",
                "type": "address"
                },
                {
                "internalType": "string",
                "name": "pubKey",
                "type": "string"
                }
            ],
            "name": "createIdentity",
            "outputs": [
                {
                "internalType": "address",
                "name": "",
                "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
            },
            {
            "constant": false,
            "inputs": [
                {
                "internalType": "address",
                "name": "owner",
                "type": "address"
                },
                {
                "internalType": "address",
                "name": "destinationContract",
                "type": "address"
                },
                {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
                },
                {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
                }
            ],
            "name": "forwardTo",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
            },
            {
            "constant": false,
            "inputs": [
                {
                "internalType": "address",
                "name": "owner",
                "type": "address"
                },
                {
                "internalType": "address",
                "name": "destinationContract",
                "type": "address"
                },
                {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
                },
                {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
                }
            ],
            "name": "forwardToTest",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
            }
        ];
        const contract_Address="0xa39A5E3a765bee886563CcF693a640cfa54Ee78d";
        const contract = new web3.eth.Contract(abi, contract_Address);
    
    
        const myData = contract.methods.createIdentity("0xa39A5E3a765bee886563CcF693a640cfa54Ee78d", 'pubkey').encodeABI();
        web3.eth.getTransactionCount(account, (err, txCount) => {
            // Build the transaction
        const txObject = {
            nonce:    web3.utils.toHex(txCount),
            to:       contract_Address,
            value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
            gasLimit: web3.utils.toHex(2100000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
            data: myData  
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
    .catch(e => console.log(e));
    
}

testCreateIdentityInfura()