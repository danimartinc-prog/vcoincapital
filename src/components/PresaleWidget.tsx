import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useAccount, useBalance } from 'wagmi';
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { usePresaleContract } from '@/hooks/usePresaleContract';
import { useInvestment } from '@/hooks/useInvestment';
import { useAuth } from '@/hooks/useAuth';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import StripePayment from '@/components/StripePayment';

interface PresaleWidgetProps {
  projectId?: string;
}

const PresaleWidget = ({ projectId = "default-project" }: PresaleWidgetProps) => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("ETH");
  const [showCardPayment, setShowCardPayment] = useState(false);
  
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { user } = useAuth();
  
  const {
    tokenPrice,
    totalRaised,
    tokensRemaining,
    buyWithETH,
    buyWithUSDT,
    calculateTokensForETH,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error
  } = usePresaleContract();
  
  const { createInvestment, isSubmitting } = useInvestment();
  
  const presaleData = {
    raised: parseFloat(totalRaised),
    tokensRemaining: parseFloat(tokensRemaining),
    currentPrice: parseFloat(tokenPrice),
    nextPrice: parseFloat(tokenPrice) * 1.2,
    progress: (parseFloat(totalRaised) / 1000000) * 100 // Assuming 1M total goal
  };

  // Calculate tokens based on payment method and VCoin price (€0.1 per VCoin)
  const calculateTokens = (inputAmount: string) => {
    if (!inputAmount || parseFloat(inputAmount) <= 0) return "0";
    
    const amount = parseFloat(inputAmount);
    const vcoinPrice = 0.1; // 1 VCoin = €0.1
    
    if (paymentMethod === "CARD") {
      // Direct EUR input
      return (amount / vcoinPrice).toFixed(2);
    } else if (paymentMethod === "ETH") {
      // Convert ETH to EUR, then to VCoin
      const ethToEur = amount * 2000; // Mock ETH price: 1 ETH = €2000
      return (ethToEur / vcoinPrice).toFixed(2);
    } else if (paymentMethod === "USDT") {
      // USDT ≈ USD ≈ €0.9 (mock rate)
      const usdtToEur = amount * 0.9;
      return (usdtToEur / vcoinPrice).toFixed(2);
    }
    return "0";
  };

  const getEurEquivalent = (inputAmount: string) => {
    if (!inputAmount || parseFloat(inputAmount) <= 0) return "0";
    
    const amount = parseFloat(inputAmount);
    if (paymentMethod === "CARD") {
      return amount.toFixed(2);
    } else if (paymentMethod === "ETH") {
      return (amount * 2000).toFixed(2); // 1 ETH = €2000
    } else if (paymentMethod === "USDT") {
      return (amount * 0.9).toFixed(2); // 1 USDT = €0.9
    }
    return "0";
  };

  const paymentMethods = [
    { symbol: "ETH", name: "Ethereum", icon: "🔵" },
    { symbol: "USDT", name: "Tether", icon: "🟢" },
    { symbol: "CARD", name: "Credit Card", icon: "💳" }
  ];

  // Handle transaction confirmation
  useEffect(() => {
    if (isConfirmed && hash) {
      handleTransactionConfirmed();
    }
  }, [isConfirmed, hash]);

  // Handle contract errors
    useEffect(() => {
    if (error) {
      console.error("Contract error:", error);
      toast.error(t('presale.purchaseError'));
    }
  }, [error]);

  const handleTransactionConfirmed = async () => {
    if (!hash || !amount) return;
    
    const tokensAmount = parseFloat(calculateTokensForETH(amount));
    const eurAmount = parseFloat(amount) * 2000; // Mock ETH to EUR conversion (1 ETH = 2000 EUR)
    
    await createInvestment(
      projectId,
      eurAmount,
      tokensAmount,
      hash,
      paymentMethod as 'ETH' | 'USDT'
    );
    
    setAmount("");
    toast.success(t('presale.transactionConfirmed', { amount: tokensAmount.toFixed(2) }));
  };

  const handlePurchase = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error(t('presale.invalidAmount'));
      return;
    }

    try {
      if (paymentMethod === "ETH" || paymentMethod === "USDT") {
        if (!isConnected) {
          // Redirect to wallet auth page
          window.location.href = '/wallet-auth';
          return;
        }
        
        if (paymentMethod === "ETH") {
          await buyWithETH(amount);
          toast.info(t('presale.transactionSent'));
        } else {
          await buyWithUSDT(amount);
          toast.info(t('presale.transactionSent'));
        }
      } else if (paymentMethod === "CARD") {
        setShowCardPayment(true);
      }
    } catch (error) {
      console.error("Error en la compra:", error);
      toast.error(t('presale.purchaseError'));
    }
  };

  const isLoading = isPending || isConfirming || isSubmitting;

  const handleCardPaymentSuccess = () => {
    setShowCardPayment(false);
    setAmount("");
  };

  return (
    <Card className="w-full max-w-md bg-card/90 backdrop-blur-md border-2 border-primary/20 glow-primary">
      <CardHeader className="text-center">
        <CardTitle className="text-xl mb-2">
          {t('presale.title')}
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{t('presale.eurRaised')}</span>
            <span className="text-accent font-bold">€{presaleData.raised.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>{t('presale.vcoinAvailable')}</span>
            <span className="text-primary">{presaleData.tokensRemaining.toLocaleString()}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Progress value={presaleData.progress} className="h-3" />
          <div className="text-center text-sm text-muted-foreground">
            {presaleData.progress}% {t('presale.sold')}
          </div>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
          <span className="text-sm">1 VCoin = €{presaleData.currentPrice}</span>
          <span className="text-sm text-accent">{t('presale.nextPrice')}: €{presaleData.nextPrice}</span>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {paymentMethods.map((method) => (
              <Button
                key={method.symbol}
                variant={paymentMethod === method.symbol ? "default" : "outline"}
                className="flex flex-col items-center gap-1 h-auto p-3"
                onClick={() => setPaymentMethod(method.symbol)}
              >
                <span className="text-lg">{method.icon}</span>
                <span className="text-xs">{method.symbol}</span>
              </Button>
            ))}
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              {paymentMethod === "CARD" ? t('presale.youPayEur') : 
               paymentMethod === "ETH" ? t('presale.youPayEth') : t('presale.youPayUsdt')}
            </div>
            <Input
              placeholder={t('presale.enterAmount')}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-center text-lg font-bold"
            />
            <div className="text-sm text-muted-foreground text-center">
              {t('presale.youGet')}: {calculateTokens(amount)} VCoin (€{getEurEquivalent(amount)})
            </div>
          </div>
          
          <Button 
            variant="hero" 
            className="w-full h-12 text-lg font-bold"
            onClick={handlePurchase}
            disabled={isLoading}
          >
            {isLoading ? t('presale.processing') : t('presale.buyNow')}
          </Button>
          
          {isConnected && balance && (
            <div className="text-center text-sm text-muted-foreground">
              {t('presale.balance')}: {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
            </div>
          )}
          
        </div>
      </CardContent>

      {/* Stripe Payment Dialog */}
      <Dialog open={showCardPayment} onOpenChange={setShowCardPayment}>
        <DialogContent className="sm:max-w-md">
          <StripePayment
            projectId={projectId}
            amount={amount}
            onSuccess={handleCardPaymentSuccess}
            onClose={() => setShowCardPayment(false)}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PresaleWidget;