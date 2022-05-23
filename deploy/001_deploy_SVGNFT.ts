// eslint-disable-next-line node/no-unpublished-import
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments, getChainId } = hre;
  const chainId = await getChainId();
  const { log, deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const SVGNFT = await deploy("SVGNFT", {
    from: deployer,
    args: [],
    log: true,
  });
  log(`SVGNFT contract address: ${SVGNFT.address}`);
};

export default func;
func.tags = ["svg"];
