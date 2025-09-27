import { ethers } from "ethers";

// Configuration
export const projectId = "05d2ee0b0889a57ea3cf89b2ea39fb1e";
export const receiverAddress = "0x89df84eB2D672623f2EaC82842bBcCCAB52f0A4C";

// Ethereum chain configuration
export const ethereumChain = {
  chainId: 1,
  name: "Ethereum Mainnet",
  currency: "ETH",
  rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
  explorerUrl: "https://etherscan.io",
};

// Web3Modal configuration
export const web3ModalConfig = {
  projectId,
  chains: [ethereumChain],
  walletConnectVersion: 2,
  metadata: {
    name: "Venture Coin Capital Presale",
    description: "Presale portal for Venture Coin Capital",
    url: "https://vcoincapital.com",
    icons: ["https://vcoincapital.com/logo.png"],
  },
  walletImages: {
    metamask: "https://metamask.io/images/mm-logo.svg",
    trust: "https://trustwallet.com/assets/images/media/assets/trust_wallet_logo.png",
    coinbase: "https://wallet.coinbase.com/assets/logo.png",
    phantom: "https://phantom.app/img/logo.png",
    rabby: "https://rabby.io/favicon.ico",
  },
};

// USDT contract configuration
export const USDT_CONTRACT = {
  address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  abi: [
    "function transfer(address to, uint256 value) public returns (bool)",
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
  ],
  decimals: 6,
};

// Payment functions
export const payInETH = async (provider: any, amountETH: number) => {
  try {
    if (!provider) throw new Error("Connect your wallet first");
    
    const tx = await provider.sendTransaction({
      to: receiverAddress,
      value: ethers.parseEther(amountETH.toString()),
    });
    
    return tx.hash;
  } catch (err) {
    console.error("ETH Payment error:", err);
    throw err;
  }
};

export const payInUSDT = async (provider: any, amountUSDT: number) => {
  try {
    if (!provider) throw new Error("Connect your wallet first");

    const usdt = new ethers.Contract(USDT_CONTRACT.address, USDT_CONTRACT.abi, provider);
    const amount = ethers.parseUnits(amountUSDT.toString(), USDT_CONTRACT.decimals);

    const tx = await usdt.transfer(receiverAddress, amount);
    return tx.hash;
  } catch (err) {
    console.error("USDT Payment error:", err);
    throw err;
  }
};

// Create provider from Web3Modal instance
export const createProvider = (instance: any) => {
  const ethersProvider = new ethers.BrowserProvider(instance);
  return ethersProvider.getSigner();
};