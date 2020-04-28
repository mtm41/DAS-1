pragma solidity ^0.5.16;
import "./DidResolver.sol";
import "./IdentityProxy.sol";

import "./Owned.sol";

contract IdentityController is Owned {

    DidResolver resolver = new DidResolver();

    //assigning DID to Proxy address
    mapping(address => IdentityProxy) idproxies;

    event IdentityCreated(
        address creator,
        address indexed owner
    );

    function createIdentity(address owner, string memory pubKey) public checkOwned returns(address) {
        address registeredID = resolver.registerID(owner, pubKey);
        //Trying to register user
        if (registeredID == address(0)){
            IdentityProxy proxy = new IdentityProxy();
            idproxies[owner] = proxy;
            emit IdentityCreated(msg.sender,owner);
        }
        
        return registeredID;
    }
/*
    function externalTransaction(address owner, address destinationContract, uint value, bytes memory data) public returns(bool) {
        forwardTo(idproxies[owner], owner, destinationContract, value, data);
        return true;
    }
*/
    function forwardTo(address owner, address destinationContract, uint value, bytes memory data) public{
        IdentityProxy proxy1 = idproxies[owner];
        proxy1.forward(destinationContract, value, data);
    }

    function forwardToTest(address owner, address destinationContract, uint value, bytes memory data) public{
        IdentityProxy proxy1 = new IdentityProxy();
        proxy1.forward(destinationContract, value, data);
    }

    function isOwner(address proxy, address owner) private view returns(bool) {
        bool owned = false;
        if (address(idproxies[owner]) == proxy){
            owned = true;
        }
        return owned;
    }

}