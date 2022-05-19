/* eslint-disable no-unused-vars */
import { ethers } from "hardhat";
// eslint-disable no-unused-vars
import chai, { expect } from "chai";
import { deployContract, MockProvider, solidity } from "ethereum-waffle";
import EtherWalletJSON from "../artifacts/contracts/EtherWallet.sol/EtherWallet.json";

chai.use(solidity);

describe("Ether Wallet Contract Tests", async function () {
  it("Checks the address", async function () {
    const provider = new MockProvider();
    const [wallet] = provider.getWallets();
    const etherWallet = await deployContract(wallet, EtherWalletJSON, []);
    expect(await etherWallet.owner()).to.equal(wallet.address);

    const contractBalance = await etherWallet.getBalance();
    expect(contractBalance).to.equal(0);
  });

  it("Checks the balance which is zero", async function () {
    const provider = new MockProvider();
    const [wallet] = provider.getWallets();
    const etherWallet = await deployContract(wallet, EtherWalletJSON, []);
    expect(await etherWallet.getBalance()).to.equal(0);
  });
});
