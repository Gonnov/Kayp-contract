import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract, Signer } from "ethers";

describe("BillOfLadingContract", function () {
    let billOfLadingContract: Contract;
    let owner: string;
    const rawBillOfLadingData: string = "test";
    const expeditionDate: number = Math.floor(Date.now() / 1000) + 86400; // Tomorrow

    beforeEach(async function () {
        const signers: Signer[] = await ethers.getSigners();
        owner = await signers[0].getAddress();

        const BillOfLadingContract = await ethers.getContractFactory(
            "BillOfLadingContract"
        );
        billOfLadingContract = await BillOfLadingContract.deploy(
            rawBillOfLadingData,
            expeditionDate
        );
    });

    it("Should return true when checking bill of lading data", async function () {
        const result = await billOfLadingContract.checkBillOfLadingData(
            rawBillOfLadingData
        );
        expect(result).to.be.true;
    });

    it("Should return false when checking incorrect bill of lading data", async function () {
        const result = await billOfLadingContract.checkBillOfLadingData(
            "incorrect data"
        );
        expect(result).to.be.false;
    });

    it("Set a new Bill of lading data and check it with the new one", async function () {
        await billOfLadingContract.setBillOfLadingData("new data");
        const result = await billOfLadingContract.checkBillOfLadingData(
            "new data"
        );
        expect(result).to.be.true;
    });

    it("Set a new Bill of lading data and check it with the old one", async function () {
        await billOfLadingContract.setBillOfLadingData("new data");
        const result = await billOfLadingContract.checkBillOfLadingData("test");
        expect(result).to.be.false;
    });

    it("Should not allow non-owner to set bill of lading data", async function () {
        const nonOwner = (await ethers.getSigners())[1];
        await expect(
            billOfLadingContract
                .connect(nonOwner)
                .setBillOfLadingData("new data")
        ).to.be.revertedWith("Not the owner");
    });

   

