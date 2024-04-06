// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;


contract BillOfLadingContract {
    bytes32 hashedBillOfLadingData;
    uint256 lastUpdated;
    uint256 expeditionDate;
    address owner;

    constructor (
        string memory _rawBillOfLadingData,
        uint256 _expeditionDate
    ) {
        hashedBillOfLadingData = keccak256(abi.encodePacked(_rawBillOfLadingData));
        lastUpdated = block.timestamp;
        expeditionDate = _expeditionDate;
        owner = msg.sender;
    }

    modifier onlyOwner(){
		require(msg.sender == owner, "Not the owner");
		_;
	}

    function setExpeditionDate(uint256 _expeditionDate) external onlyOwner {
        require(block.timestamp < expeditionDate, "Expedition date has passed");
        expeditionDate = _expeditionDate;
    }

    function setBillOfLadingData(string memory _rawBillOfLadingData) external onlyOwner {
        require(block.timestamp < expeditionDate, "Expedition date has passed");
        hashedBillOfLadingData = keccak256(abi.encodePacked(_rawBillOfLadingData));
        lastUpdated = block.timestamp;
    }

    function checkBillOfLadingData(string memory _rawBillOfLadingData) external onlyOwner view returns (bool) {
        return keccak256(abi.encodePacked(_rawBillOfLadingData)) == hashedBillOfLadingData;
    }
}


