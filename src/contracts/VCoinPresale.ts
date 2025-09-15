// VCoin Presale Contract ABI and Configuration
// This would connect to a real deployed ERC-20 and Presale contract

export const VCOIN_TOKEN_ADDRESS = "0x742d35Cc6635C0532925a3b8D8Cc4e8E6B8B6B8B"; // Mock address
export const PRESALE_CONTRACT_ADDRESS = "0x742d35Cc6635C0532925a3b8D8Cc4e8E6B8B6B8C"; // Mock address

// VCoin ERC-20 Token ABI (simplified)
export const VCOIN_TOKEN_ABI = [
  {
    "inputs": [{"name": "spender", "type": "address"}, {"name": "amount", "type": "uint256"}],
    "name": "approve",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Presale Contract ABI
export const PRESALE_CONTRACT_ABI = [
  {
    "inputs": [{"name": "amount", "type": "uint256"}],
    "name": "buyTokensWithETH",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"name": "usdtAmount", "type": "uint256"}],
    "name": "buyTokensWithUSDT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokenPrice",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalRaised",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokensRemaining",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "getUserPurchases",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "name": "buyer", "type": "address"},
      {"indexed": false, "name": "amount", "type": "uint256"},
      {"indexed": false, "name": "tokens", "type": "uint256"},
      {"indexed": false, "name": "paymentMethod", "type": "string"}
    ],
    "name": "TokensPurchased",
    "type": "event"
  }
] as const;

// USDT Contract ABI (for ERC-20 payments)
export const USDT_CONTRACT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // Real USDT address on mainnet
export const USDT_CONTRACT_ABI = [
  {
    "inputs": [{"name": "spender", "type": "address"}, {"name": "amount", "type": "uint256"}],
    "name": "approve",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;