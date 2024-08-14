import hre from "hardhat";
import { formatEther, getAddress, parseEther } from "viem";

// Lockコントラクトをデプロイする関数
async function deployLock(unlockTime: bigint, lockedAmount: bigint) {
  const lock = await hre.viem.deployContract("Lock", [unlockTime], {
    value: lockedAmount,
  });
  console.log(
    `Lock with ${
      formatEther(
        lockedAmount,
      )
    } ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`,
  );
  return lock;
}

// GettingStartedFunctionsConsumerのデプロイ用の関数
async function deployGettingStartedFunctionsConsumer(donID: string, router: string) {
  const gettingStartedFunctionsConsumer = await hre.viem.deployContract("GettingStartedFunctionsConsumer", [
    donID,
    router,
  ]);
  console.log(
    `GettingStartedFunctionsConsumer deployed to ${gettingStartedFunctionsConsumer.address}`,
  );
  return gettingStartedFunctionsConsumer;
}

// ChainlinkのFunctionsConsumerのデプロイ用の関数
async function deployFunctionsConsumer(donID: string, router: string) {
  const functionsConsumer = await hre.viem.deployContract("FunctionsConsumer", [router, donID]);
  console.log(
    `FunctionsConsumer deployed to ${functionsConsumer.address}`,
  );
  return functionsConsumer;
}

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = BigInt(currentTimestampInSeconds + 60);
  const lockedAmount = parseEther("0.001");

  // Lockコントラクトをデプロイ
  // await deployLock(unlockTime, lockedAmount);
  const donID = process.env.CHAINLINK_FUNCTIONS_SEPOLIA_DONID ?? "";
  const router = process.env.CHAINLINK_FUNCTIONS_SEPOLIA_ROUTER ?? "";
  await deployGettingStartedFunctionsConsumer(donID, router);
  await deployFunctionsConsumer(donID, router);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
