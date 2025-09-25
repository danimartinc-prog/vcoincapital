import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';

const WalletConnect = () => {
  console.log('WalletConnect component rendered');
  
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        console.log('WalletConnect state:', { ready, connected, mounted, authenticationStatus });

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                console.log('Wallet not connected, showing connect button');
                return (
                  <Button 
                    variant="hero" 
                    onClick={() => {
                      console.log('Connect wallet button clicked');
                      openConnectModal();
                    }} 
                    type="button"
                    className="h-12 px-8 text-lg font-bold"
                  >
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button 
                    variant="destructive" 
                    onClick={openChainModal} 
                    type="button"
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={openChainModal}
                    className="flex items-center gap-2"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button>

                  <Button 
                    variant="hero" 
                    onClick={openAccountModal} 
                    type="button"
                    className="font-bold"
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnect;