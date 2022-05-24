// eslint-disable-next-line node/no-unpublished-import
// import { HardhatRuntimeEnvironment } from "hardhat/types";
// import { DeployFunction } from "hardhat-deploy/dist/types";
// const { networkConfig } = require("../helper-hardhat-config");
// const fs = require("fs");

// const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
//   const { getNamedAccounts, deployments, ethers, getChainId } = hre;
//   const chainId = await getChainId();
//   const { log, deploy } = deployments;
//   const { deployer } = await getNamedAccounts();
//   const SVGNFT = await deploy("SVGNFT", {
//     from: deployer,
//     args: [],
//     log: true,
//   });
//   log(`SVGNFT contract address: ${SVGNFT.address}`);
//   const svgNFTContract = await ethers.getContractFactory("SVGNFT");
//   const accounts = await hre.ethers.getSigners();
//   const signer = accounts[0];
//   const svgNFT = new ethers.Contract(
//     SVGNFT.address,
//     svgNFTContract.interface,
//     signer
//   );
//   const networkName = networkConfig[chainId].name;
//   console.log(networkName);

//   log(
//     `Verify with:\n npx hardhat verify --network ${networkName} ${svgNFT.address}`
//   );
//   log("Let's create an NFT now!");
//   const filepath = fs.readFileSync("./img/pug.svg");
// const svg = fs.readFileSync(filepath, { encoding: "utf8" });
//   const svg = `<svg xmlns="http://www.w3.org/2000/svg" height="500" width="500">
//   <circle cx="250" cy="250" r="200" stroke="black" stroke-width="3" fill="blue" />
// </svg>`;
//   log(
//     `We will use ${filepath} as our SVG, and this will turn into a tokenURI. `
//   );
//   const tx = await svgNFT.create(svg);
//   await tx.wait(1);
//   log(`You've made your first NFT!`);
//   log(`You can view the tokenURI here ${await svgNFT.tokenURI(0)}`);
// };

// export default func;
// func.tags = ["svg"];

const { networkConfig } = require("../helper-hardhat-config");
const fs = require("fs");
const hre = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  log("----------------------------------------------------");
  const SVGNFT = await deploy("SVGNFT", {
    from: deployer,
    log: true,
  });
  log(`You have deployed an NFT contract to ${SVGNFT.address}`);
  const svgNFTContract = await hre.ethers.getContractFactory("SVGNFT");
  const accounts = await hre.ethers.getSigners();
  const signer = accounts[0];
  const svgNFT = new hre.ethers.Contract(
    SVGNFT.address,
    svgNFTContract.interface,
    signer
  );
  const networkName = networkConfig[chainId].name;

  log(
    `Verify with:\n npx hardhat verify --network ${networkName} ${svgNFT.address}`
  );
  log("Let's create an NFT now!");
  const filepath = "./img/pug.svg";
  const svg = fs.readFileSync(filepath, { encoding: "utf8" });
  log(
    `We will use ${filepath} as our SVG, and this will turn into a tokenURI.
    SVG = ${svg}`
  );
  const tx = await svgNFT.create(svg);
  await tx.wait(1);
  log(`You've made your first NFT!`);
  log(`You can view the tokenURI here ${await svgNFT.tokenURI(0)}`);
};

module.exports.tags = ["all", "svg"];
