// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;


contract BillOfLadingContract {
    bytes32 hashedBillOfLadingData;
    address owner;

    constructor (
        string memory _rawBillOfLadingData
    ) {
        hashedBillOfLadingData = keccak256(abi.encodePacked(_rawBillOfLadingData));
        owner = msg.sender;
    }

    modifier onlyOwner(){
		require(msg.sender == owner, "Not the owner");
		_;
	}

    function setBillOfLadingData(string memory _rawBillOfLadingData) external onlyOwner {
        hashedBillOfLadingData = keccak256(abi.encodePacked(_rawBillOfLadingData));
    }

    function checkBillOfLadingData(string memory _rawBillOfLadingData) external onlyOwner view returns (bool) {
        return keccak256(abi.encodePacked(_rawBillOfLadingData)) == hashedBillOfLadingData;
    }

}


