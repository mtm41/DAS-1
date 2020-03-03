pragma solidity ^0.5.16;
import "./Owned.sol";


contract DidResolver is Owned {
    
    struct PublicKey {
        string algh;
        string publicKeyPem;
    }

    struct DidDocument {
        string context;
        PublicKey pubKey;
    }
    
    mapping(address => address) private identities;
    mapping(address => DidDocument) private document;

    function canAccess() internal view returns(bool){
        bool verified = false;
        if (msg.sender == 0x1c9Db4eb69522Ca59651eC8D1Ed810DccFe2781d){
            verified = true;
        }
        return verified;
    }

    function isRegistered(address id) internal view returns(address){
        address identity = identities[id];

        //Checkinf if identity already exists
        if (identity != address(0)){
            return identity;
        }
        return address(0);
    }

    function registerID(address id, string memory pubKey) public checkOwned returns(address){
        address identity = address(0);

        if (isRegistered(id) == address(0)){
            identities[id] = id;
            // I am not checking if address id is free in network
            PublicKey memory pk = PublicKey({algh: 'RsaVerificationKey2048',
                                      publicKeyPem: pubKey });

            DidDocument memory doc = DidDocument({context:'https://www.w3.org/ns/did/v1', pubKey: pk});
            document[id] = doc;
            identity = id;
        }
        return identity;
    }

    //Limit access to MetaIDManager address
    function resolveDID(address didToResolve) public view checkOwned returns(string memory) {
        string memory pubKey = "";
        if (isRegistered(didToResolve) != address(0)){
            DidDocument memory doc = document[didToResolve];
            pubKey = doc.pubKey.publicKeyPem;
        }
        return pubKey;
    }
    
}