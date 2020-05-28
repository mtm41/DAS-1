const Web3 = require('web3')
const mycontract = require('../../identity-manager/build/contracts/IdentityController.json')
const HDWalletProvider = require("truffle-hdwallet-provider")


const provider = new HDWalletProvider(
    process.env.WALLET_PRIVATE_WORDS,
    'https://rinkeby.infura.io/v3/5a89659ce65f4481a1eed03a96b7f3ab'
);
const web3 = new Web3(provider);

let contract = new web3.eth.Contract(
    mycontract.abi,
    '0xeB522a0730e4F19D2B6A6b009D5d89DC51Df3cD4',
);

async function createIdentity(newUser, response, mongoose, httpResponses) {
        var identity = require('ethereumjs-wallet');
        const ethaddress = identity.generate();

        newUser.DID = ethaddress.getAddressString();

        // Attempt to save the user
        newUser.save(async function(error){
            if (error) {
                mongoose.connection.close()
                return response.json(httpResponses.onUserSaveError);
            }
            mongoose.connection.close()
            await contract.methods.createIdentity(ethaddress.getAddressString(), ethaddress.getPublicKeyString()).send({
                from: '0x19eF977b7530D5a8a61c364FB9E7aF23F42CdD9e',
            }, function(receipt) {
                //send mail
                var link = 'http://localhost:3000/api/v1/active/' + newUser.activeToken;
                // Sending activation email
                const mailer = require('../configs/mailer');
                console.log(newUser.email)
                mailer({
                    from: 'Das project',
                    to: newUser.email,
                    subject: 'Bienvenido al proyecto DAS',
                    html: 'Por favor, dale al clic al enlace <a href="' + link + '"> here </a> para activar tu cuenta.'
                });
                return response.json(httpResponses.onUserSaveSuccess);
            })
        });

        
}

module.exports = createIdentity