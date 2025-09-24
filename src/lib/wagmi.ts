import { createConfig } from 'wagmi';
import { http } from 'viem';
import { injected, coinbaseWallet, walletConnect } from 'wagmi/connectors';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';

// Configure wagmi with WalletConnect projectId to support major wallets
export const config = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum, base],
  connectors: [
    injected(),
    walletConnect({
      projectId: '05d2ee0b0889a57ea3cf89b2ea39fb1e',
    }),
    coinbaseWallet({ 
      appName: 'VCoin Presale',
      appLogoUrl: 'https://your-domain.com/logo.png'
    }),
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