/* eslint-disable no-unused-vars */
import { ethers } from "hardhat";
// eslint-disable no-unused-vars
import chai, { expect } from "chai";
import { deployContract, MockProvider, solidity } from "ethereum-waffle";
import EtherWalletJSON from "../artifacts/contracts/EtherWallet.sol/EtherWallet.json";

chai.use(solidity);

describe("Ether Wallet Contract Tests", async function () {
  // checks if the wallet address is the owner address
  it("Checks the address", async function () {
    const provider = new MockProvider();
    const [wallet] = provider.getWallets();
    const etherWallet = await deployContract(wallet, EtherWalletJSON, []);
    expect(await etherWallet.owner()).to.equal(wallet.address);
  });

  // checks if the contract can receive eth, display the balance and allow the owner to withdraw from it
  // I failed to pay it ether using the receive() so I had to create a named function to send it ether.
  // Everything else worked fine.

  it("Checks the balance and withdraw", async function () {
    const provider = new MockProvider();
    const [wallet] = provider.getWallets();
    const etherWallet = await deployContract(wallet, EtherWalletJSON, []);
    await etherWallet.take({ value: ethers.utils.parseUnits("10", "ether") });

    await etherWallet.withdraw(ethers.utils.parseUnits("1", "ether"));

    const contractBalance = ethers.utils.formatEther(
      await etherWallet.getBalance()
    );
    expect(contractBalance).to.equal("9.0");
  });
});
