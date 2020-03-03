pragma solidity ^0.5.16;
import "./Owned.sol";

contract IdentityProxy is Owned {
    event ExternalOperation(
        address indexed dest,
        uint value,
        bytes data
    );

    event Paid(
        address indexed sender,
        uint value
    );

    function () external payable {
        emit Paid(msg.sender, msg.value);
    }

    function forward(address dest, uint value, bytes memory data) public checkOwned {
        require(execute(dest, value, data));
        emit ExternalOperation(dest, value, data);
    }

    function execute(address dest, uint value, bytes memory data) internal returns(bool success) {
        assembly {
            success := call(gas, dest, value, add(data, 0x20), mload(data), 0, 0)
        }
    }
}