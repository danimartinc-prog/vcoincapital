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
    [mainnet.id]: http(mainnet.rpcUrls.default.http[0]),
    [polygon.id]: http(polygon.rpcUrls.default.http[0]),
    [optimism.id]: http(optimism.rpcUrls.default.http[0]),
    [arbitrum.id]: http(arbitrum.rpcUrls.default.http[0]),
    [base.id]: http(base.rpcUrls.default.http[0]),
  },
  ssr: false,
});