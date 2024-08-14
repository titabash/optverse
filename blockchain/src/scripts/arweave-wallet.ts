// Importing modules with TypeScript syntax
import Arweave from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import * as fs from "fs";
import { isNil } from "lodash";
import path from "path";

// Getting wallet name from command line arguments
const walletName: string | undefined = process.argv[2];

const arweaveNetworkLocal = {
  host: "localhost",
  port: 1984,
  protocol: "http",
};

const arweaveNetworkTestnet = {
  host: "testnet.redstone.tools",
  port: 443,
  protocol: "https",
};

const arweaveNetworkMainnet = {
  host: "arweave.net",
  port: 443,
  protocol: "https",
};

if (isNil(walletName)) {
  console.log("No wallet name given.");
  process.exit();
}

// Async function to generate and save a new Arweave wallet
const generateWallet = async (): Promise<void> => {
  let arweaveNetwork = arweaveNetworkLocal;
  if (process.argv[3] === "--network") {
    if (process.argv[4] === "mainnet") {
      arweaveNetwork = arweaveNetworkMainnet;
    } else if (process.argv[4] === "testnet") {
      arweaveNetwork = arweaveNetworkTestnet;
    }
  }
  const arweave: Arweave = Arweave.init(arweaveNetwork);

  const walletDirPath: string = path.resolve(__dirname, ".wallets");
  const walletPath: string = path.resolve(walletDirPath, `wallet-${walletName}.json`);

  // Check if wallet already exists
  if (fs.existsSync(walletPath)) {
    console.log("Wallet exists.");
    process.exit();
  }

  // Generate new wallet
  const wallet: JWKInterface = await arweave.wallets.generate();

  // Create directory if it doesn't exist
  if (!fs.existsSync(walletDirPath)) fs.mkdirSync(walletDirPath);

  // Write wallet to filesystem
  fs.writeFileSync(walletPath, JSON.stringify(wallet));

  // Getting wallet address
  const walletAddress: string = await arweave.wallets.jwkToAddress(wallet);

  console.log(`A new wallet (${walletAddress}) saved at ${walletPath}`);
};

// Execute the generateWallet function
generateWallet();
