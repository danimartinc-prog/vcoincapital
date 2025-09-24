import { createConfig } from 'wagmi';
import { http } from 'viem';
import { injected, coinbaseWallet } from 'wagmi/connectors';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';

// Configure wagmi/RainbowKit without requiring a WalletConnect projectId
export const config = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum, base],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'CryptoICO' }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
  ssr: false,
});