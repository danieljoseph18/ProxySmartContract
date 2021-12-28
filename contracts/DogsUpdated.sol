// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Storage.sol";

contract dogsUpdated is Storage{

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    constructor() {
        initialize(msg.sender);
    }

    function initialize(address _owner) public {
        require(!_initialized);
        owner = _owner;
        _initialized = true;
    }

    function getNumberOfDogs() public view returns(uint){
        return _uintStorage["Dogs"];
    }

    function setNumberOfDogs(uint toSet) public onlyOwner {
        _uintStorage["Dogs"] = toSet;
    }
}
