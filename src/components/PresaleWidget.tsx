import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useReownWallet } from '@/hooks/useReownWallet';
import { useWalletInvestment } from '@/hooks/useWalletInvestment';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import StripePayment from '@/components/StripePayment';

interface PresaleWidgetProps {
  projectId?: string;
}

const PresaleWidget = ({ projectId = "default-project" }: PresaleWidgetProps) => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("ETH");
  const [showCardPayment, setShowCardPayment] = useState(false);
  
  const { 
    account, 
    isConnected, 
    buyWithETH, 
    buyWithUSDT 
  } = useReownWallet();
  
  const { createWalletInvestment, isSubmitting } = useWalletInvestment();
  
  const presaleData = {
    raised: 125000,
    tokensRemaining: 8750000,
    currentPrice: 0.1,
    nextPrice: 0.12,
    progress: 12.5
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

  // Transaction handling will be done in the payment methods directly

  const handleTransactionConfirmed = async (txHash: string) => {
    if (!txHash || !amount || !account) return;
    
    const tokensAmount = parseFloat(calculateTokens(amount));
    const eurAmount = parseFloat(getEurEquivalent(amount));
    
    await createWalletInvestment(
      projectId,
      eurAmount,
      tokensAmount,
      txHash,
      paymentMethod as 'ETH' | 'USDT' | 'CARD'
    );
    
    setAmount("");
    toast.success(`Transaction confirmed! You will receive ${tokensAmount} VCoin`);
  };

  const handlePurchase = async () => {
    console.log('Purchase initiated:', { amount, paymentMethod, isConnected, account });
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      if (paymentMethod === "ETH" || paymentMethod === "USDT") {
        console.log('Processing crypto payment:', { paymentMethod, amount });
        let txHash: string | null = null;
        if (paymentMethod === "ETH") {
          txHash = await buyWithETH(parseFloat(amount));
        } else {
          txHash = await buyWithUSDT(parseFloat(amount));
        }
        
        if (txHash) {
          await handleTransactionConfirmed(txHash);
        }
      } else if (paymentMethod === "CARD") {
        console.log('Processing card payment:', { amount });
        // For card payments, create investment directly
        const tokensAmount = parseFloat(calculateTokens(amount));
        const eurAmount = parseFloat(getEurEquivalent(amount));
        
        await createWalletInvestment(
          projectId,
          eurAmount,
          tokensAmount,
          `card_${Date.now()}`, // Generate unique transaction ID for card payments
          'CARD'
        );
        
        setAmount("");
        toast.success(`Payment successful! You will receive ${tokensAmount} VCoin`);
      }
    } catch (error) {
      console.error("Error processing purchase:", error);
      toast.error('Error processing purchase. Please try again.');
    }
  };

  const isLoading = isSubmitting;

  const handleCardPaymentSuccess = () => {
    setShowCardPayment(false);
    setAmount("");
  };

  return (
    <Card className="w-full max-w-md bg-card/90 backdrop-blur-md border-2 border-primary/20 glow-primary">
      <CardHeader className="text-center">
        <CardTitle className="text-xl mb-2">
          VCoin Presale
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>EUR RAISED:</span>
            <span className="text-accent font-bold">€{presaleData.raised.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>VCoin Available:</span>
            <span className="text-primary">{presaleData.tokensRemaining.toLocaleString()}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Progress value={presaleData.progress} className="h-3" />
          <div className="text-center text-sm text-muted-foreground">
            {presaleData.progress}% Sold
          </div>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
          <span className="text-sm">1 VCoin = €{presaleData.currentPrice}</span>
          <span className="text-sm text-accent">Next Price: €{presaleData.nextPrice}</span>
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
              {paymentMethod === "CARD" ? 'EUR you pay' : 
               paymentMethod === "ETH" ? 'ETH you pay' : 'USDT you pay'}
            </div>
            <Input
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-center text-lg font-bold"
            />
            <div className="text-sm text-muted-foreground text-center">
              You get: {calculateTokens(amount)} VCoin (€{getEurEquivalent(amount)})
            </div>
          </div>
          
          <Button 
            variant="hero" 
            className="w-full h-12 text-lg font-bold"
            onClick={handlePurchase}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Buy Now'}
          </Button>
          
          {isConnected && account && (
            <div className="text-center text-sm text-muted-foreground">
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
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