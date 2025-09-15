import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { 
  PRESALE_CONTRACT_ADDRESS, 
  PRESALE_CONTRACT_ABI,
  VCOIN_TOKEN_ADDRESS,
  VCOIN_TOKEN_ABI,
  USDT_CONTRACT_ADDRESS,
  USDT_CONTRACT_ABI
} from '@/contracts/VCoinPresale';

export const usePresaleContract = () => {
  const { chain, address: account } = useAccount();
  
  // Read contract data
  const { data: tokenPrice } = useReadContract({
    address: PRESALE_CONTRACT_ADDRESS,
    abi: PRESALE_CONTRACT_ABI,
    functionName: 'tokenPrice',
  });

  const { data: totalRaised } = useReadContract({
    address: PRESALE_CONTRACT_ADDRESS,
    abi: PRESALE_CONTRACT_ABI,
    functionName: 'totalRaised',
  });

  const { data: tokensRemaining } = useReadContract({
    address: PRESALE_CONTRACT_ADDRESS,
    abi: PRESALE_CONTRACT_ABI,
    functionName: 'tokensRemaining',
  });

  // Write contract functions
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Buy tokens with ETH
  const buyWithETH = async (ethAmount: string) => {
    try {
      const result = await writeContract({
        address: PRESALE_CONTRACT_ADDRESS as `0x${string}`,
        abi: PRESALE_CONTRACT_ABI,
        functionName: 'buyTokensWithETH',
        args: [parseEther(ethAmount)],
        value: parseEther(ethAmount),
        chain,
        account: account!,
      });
      return result;
    } catch (error) {
      console.error('Error buying with ETH:', error);
      throw error;
    }
  };

  // Buy tokens with USDT
  const buyWithUSDT = async (usdtAmount: string) => {
    try {
      // First approve USDT spending
      await writeContract({
        address: USDT_CONTRACT_ADDRESS as `0x${string}`,
        abi: USDT_CONTRACT_ABI,
        functionName: 'approve',
        args: [PRESALE_CONTRACT_ADDRESS as `0x${string}`, parseEther(usdtAmount)],
        chain,
        account: account!,
      });

      // Then buy tokens
      const result = await writeContract({
        address: PRESALE_CONTRACT_ADDRESS as `0x${string}`,
        abi: PRESALE_CONTRACT_ABI,
        functionName: 'buyTokensWithUSDT',
        args: [parseEther(usdtAmount)],
        chain,
        account: account!,
      });
      return result;
    } catch (error) {
      console.error('Error buying with USDT:', error);
      throw error;
    }
  };

  // Get user's VCoin balance
  const useVCoinBalance = (address: string | undefined) => {
    return useReadContract({
      address: VCOIN_TOKEN_ADDRESS as `0x${string}`,
      abi: VCOIN_TOKEN_ABI,
      functionName: 'balanceOf',
      args: address ? [address as `0x${string}`] : undefined,
      query: {
        enabled: !!address,
      },
    });
  };

  // Get user's total purchases from presale
  const useUserPurchases = (address: string | undefined) => {
    return useReadContract({
      address: PRESALE_CONTRACT_ADDRESS as `0x${string}`,
      abi: PRESALE_CONTRACT_ABI,
      functionName: 'getUserPurchases',
      args: address ? [address as `0x${string}`] : undefined,
      query: {
        enabled: !!address,
      },
    });
  };

  // Calculate tokens for given ETH amount
  const calculateTokensForETH = (ethAmount: string) => {
    if (!tokenPrice || !ethAmount) return '0';
    const ethValue = parseEther(ethAmount);
    const tokens = ethValue / BigInt(tokenPrice.toString());
    return formatEther(tokens);
  };

  return {
    // Contract data
    tokenPrice: tokenPrice ? formatEther(BigInt(tokenPrice.toString())) : '0.10',
    totalRaised: totalRaised ? formatEther(BigInt(totalRaised.toString())) : '125000',
    tokensRemaining: tokensRemaining ? formatEther(BigInt(tokensRemaining.toString())) : '875000',
    
    // Transaction state
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
    
    // Functions
    buyWithETH,
    buyWithUSDT,
    calculateTokensForETH,
    useVCoinBalance,
    useUserPurchases,
  };
};