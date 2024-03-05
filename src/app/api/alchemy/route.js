// Setup: npm install alchemy-sdk
const { Network, Alchemy } = require("alchemy-sdk");

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "RZ8fzMQ38D_-76_fO2FxOoyTGO7yK6yg", // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};
const alchemy = new Alchemy(settings);

const vitalikAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
const usdcContract = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

// Print token balances of USDC in Vitalik's address
alchemy.core.getTokenBalances(vitalikAddress, [usdcContract]).then(console.log);
