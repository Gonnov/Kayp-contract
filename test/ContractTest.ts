import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
const { ethers } = require("hardhat");

import "@nomicfoundation/hardhat-ethers";

describe("BillOfLadingContract", function () {
    const _rawBillOfLadingInfo = "test";
    async function billOfLadingContractFixture() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const billOfLadingContract = await ethers.deployContract(
            "BillOfLadingContract",
            [_rawBillOfLadingInfo]
        );
        await billOfLadingContract.waitForDeployment();
        return { billOfLadingContract, owner, addr1, addr2 };
    }
    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { billOfLadingContract, owner } = await loadFixture(
                billOfLadingContractFixture
            );
            expect(await billOfLadingContract.owner()).to.equal(owner.address);
        });
    });
});
