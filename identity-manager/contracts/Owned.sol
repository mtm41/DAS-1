pragma solidity ^0.5.16;

contract Owned {
    address owner;
    
    modifier checkOwned() {
        require(isOwner(msg.sender));
        _;
    }

    //This call is executed always when we instanciate a new Proxy
    constructor() public {
        owner = msg.sender;
    }

    function isOwner(address addr) private view returns(bool) {
        return addr == owner;
    }
}