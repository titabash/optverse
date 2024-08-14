import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomiclabs/hardhat-ethers";
import "@chainlink/hardhat-chainlink";
import * as dotenv from "dotenv";
import { HardhatNetworkUserConfig } from "hardhat/types/config";

const HARDHAT_CHAINID = 31337;
const DEFAULT_BLOCK_GAS_LIMIT = 12450000;
const GWEI = 1000 * 1000 * 1000;

const ALCHEMY_SEPOLIA_API_KEY = process.env.ALCHEMY_SEPOLIA_API_KEY;
const OWNER_WALLET_SECRET_KEY = process.env.OWNER_WALLET_SECRET_KEY ?? "";

const localNetwork: HardhatNetworkUserConfig = {
  blockGasLimit: DEFAULT_BLOCK_GAS_LIMIT,
  gas: DEFAULT_BLOCK_GAS_LIMIT,
  gasPrice: 8 * GWEI,
  throwOnTransactionFailures: true,
  throwOnCallFailures: true,
  allowUnlimitedContractSize: true,
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.19",
      },
      {
        version: "0.7.0",
        settings: {
          optimizer: {
            enabled: true,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      ...localNetwork,
      chainId: HARDHAT_CHAINID,
    },
    localhost: {
      ...localNetwork,
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_SEPOLIA_API_KEY}`,
      accounts: [OWNER_WALLET_SECRET_KEY],
    },
  },
};

export default config;
