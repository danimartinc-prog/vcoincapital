import { useState, useCallback } from "react";
import { ethers } from "ethers";
import { toast } from "sonner";
import { 
  projectId, 
  receiverAddress, 
  payInETH, 
  payInUSDT, 
  createProvider,
  web3ModalConfig 
} from "@/lib/web3modal";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useReownWallet = () => {
  const [provider, setProvider] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    try {
      // Try MetaMask first
      if (window.ethereum) {
        const ethersProvider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await ethersProvider.getSigner();
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

  const buyWithETH = useCallback(async (amountETH: number) => {
    try {
      if (!provider) {
        toast.error("Please connect your wallet first");
        return null;
      }
      
      toast.info("Processing ETH payment...");
      const txHash = await payInETH(provider, amountETH);
      toast.success("ETH payment sent successfully!");
      return txHash;
    } catch (err: any) {
      console.error("ETH payment error:", err);
      toast.error(err.message || "ETH payment failed");
      return null;
    }
  }, [provider]);

  const buyWithUSDT = useCallback(async (amountUSDT: number) => {
    try {
      if (!provider) {
        toast.error("Please connect your wallet first");
        return null;
      }
      
      toast.info("Processing USDT payment...");
      const txHash = await payInUSDT(provider, amountUSDT);
      toast.success("USDT payment sent successfully!");
      return txHash;
    } catch (err: any) {
      console.error("USDT payment error:", err);
      toast.error(err.message || "USDT payment failed");
      return null;
    }
  }, [provider]);

  return {
    provider,
    account,
    isConnected,
    isConnecting,
    connectWallet,
    disconnectWallet,
    buyWithETH,
    buyWithUSDT,
  };
};