import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";
import { ethers } from "ethers";
import { toast } from "sonner";
import { payInETH, payInUSDT } from "@/lib/web3modal";

type Ctx = {
  provider: any | null;
  account: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  buyWithETH: (amountETH: number) => Promise<string | null>;
  buyWithUSDT: (amountUSDT: number) => Promise<string | null>;
};

const ReownWalletContext = createContext<Ctx | undefined>(undefined);

export function ReownWalletProvider({ children }: { children: ReactNode }) {
  const [provider, setProvider] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    try {
      if ((window as any).ethereum) {
        const browserProvider = new ethers.BrowserProvider((window as any).ethereum);
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await browserProvider.getSigner();
        const address = await signer.getAddress();
        setProvider(signer);
        setAccount(address);
        setIsConnected(true);
        toast.success("Wallet connected successfully!");
        console.log("Connected wallet:", address);
      } else {
        toast.error("Please install MetaMask or another Web3 wallet");
      }
    } catch (err) {
      console.error("Error connecting wallet:", err);
      toast.error("Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setProvider(null);
    setAccount(null);
    setIsConnected(false);
    toast.info("Wallet disconnected");
  }, []);

  const ensureConnected = useCallback(async (): Promise<any | null> => {
    if (provider) return provider;
    try {
      if ((window as any).ethereum) {
        const browserProvider = new ethers.BrowserProvider((window as any).ethereum);
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await browserProvider.getSigner();
        const address = await signer.getAddress();
        setProvider(signer);
        setAccount(address);
        setIsConnected(true);
        return signer;
      }
    } catch (e) {
      console.error('Auto-connect error:', e);
    }
    return null;
  }, [provider]);

  const buyEth = useCallback(async (amountETH: number) => {
    try {
      const signer = await ensureConnected();
      if (!signer) {
        toast.error("Please install MetaMask or another Web3 wallet");
        return null;
      }
      toast.info("Processing ETH payment...");
      const txHash = await payInETH(signer, amountETH);
      toast.success("ETH payment sent successfully!");
      return txHash;
    } catch (err: any) {
      console.error("ETH payment error:", err);
      toast.error(err?.message || "ETH payment failed");
      return null;
    }
  }, [ensureConnected]);

  const buyUsdt = useCallback(async (amountUSDT: number) => {
    try {
      const signer = await ensureConnected();
      if (!signer) {
        toast.error("Please install MetaMask or another Web3 wallet");
        return null;
      }
      toast.info("Processing USDT payment...");
      const txHash = await payInUSDT(signer, amountUSDT);
      toast.success("USDT payment sent successfully!");
      return txHash;
    } catch (err: any) {
      console.error("USDT payment error:", err);
      toast.error(err?.message || "USDT payment failed");
      return null;
    }
  }, [ensureConnected]);

  const value: Ctx = useMemo(() => ({
    provider,
    account,
    isConnecting,
    isConnected,
    connectWallet,
    disconnectWallet,
    buyWithETH: buyEth,
    buyWithUSDT: buyUsdt,
  }), [provider, account, isConnecting, isConnected, connectWallet, disconnectWallet, buyEth, buyUsdt]);

  return (
    <ReownWalletContext.Provider value={value}>
      {children}
    </ReownWalletContext.Provider>
  );
}

export function useReownWallet() {
  const ctx = useContext(ReownWalletContext);
  if (!ctx) throw new Error("useReownWallet must be used within ReownWalletProvider");
  return ctx;
}
