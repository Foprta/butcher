import { expect } from "chai";
import { ethers } from "hardhat";
import { Butcher, MyToken1, MyToken2 } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Butcher", () => {
  let butcher: Butcher;
  let myToken1: MyToken1;
  let myToken2: MyToken2;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  beforeEach(async () => {
    const signers = await ethers.getSigners();
    user1 = signers[0];
    user2 = signers[1];

    const Butcher = await ethers.getContractFactory("Butcher");
    butcher = await Butcher.deploy();
    await butcher.deployed();

    const MyToken1 = await ethers.getContractFactory("MyToken1");
    myToken1 = await MyToken1.deploy();
    await myToken1.deployed();
    await myToken1.safeMint(user1.address);

    const MyToken2 = await ethers.getContractFactory("MyToken2");
    myToken2 = await MyToken2.deploy();
    await myToken2.deployed();
    await myToken2.safeMint(user1.address);
  });

  it("Should revert if any is not approved", async function () {
    // Arrange
    await myToken1.setApprovalForAll(butcher.address, true);

    // Act
    const sendTx = butcher.sendNFTs(user2.address, [
      {
        tokenId: 0,
        contractAddress: myToken1.address,
      },
      {
        tokenId: 0,
        contractAddress: myToken2.address,
      },
    ]);

    // Assert
    await expect(sendTx).to.be.revertedWith("Some contracts are not approved");
  });

  it("Should send 1 NFT", async function () {
    // Arrange
    await myToken1.setApprovalForAll(butcher.address, true);

    // Act
    await butcher.sendNFTs(user2.address, [
      {
        tokenId: 0,
        contractAddress: myToken1.address,
      },
    ]);

    // Assert
    expect(await myToken1.ownerOf(0)).to.be.equal(user2.address);
  });

  it("Should send 2 NFT", async function () {
    // Arrange
    await myToken1.setApprovalForAll(butcher.address, true);
    await myToken2.setApprovalForAll(butcher.address, true);

    // Act
    await butcher.sendNFTs(user2.address, [
      {
        tokenId: 0,
        contractAddress: myToken1.address,
      },
      {
        tokenId: 0,
        contractAddress: myToken2.address,
      },
    ]);

    // Assert
    expect(await myToken1.ownerOf(0)).to.be.equal(user2.address);
    expect(await myToken2.ownerOf(0)).to.be.equal(user2.address);
  });
});
