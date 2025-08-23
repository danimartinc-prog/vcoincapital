import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

const PresaleWidget = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("ETH");
  
  const presaleData = {
    raised: 2094223.8,
    tokensRemaining: 615841208.07,
    currentPrice: 0.0969,
    nextPrice: 0.0987,
    progress: 89.2
  };

  const paymentMethods = [
    { symbol: "ETH", name: "Ethereum", icon: "🔵" },
    { symbol: "USDT", name: "Tether", icon: "🟢" },
    { symbol: "CARD", name: "Credit Card", icon: "💳" }
  ];

  return (
    <Card className="w-full max-w-md bg-card/90 backdrop-blur-md border-2 border-primary/20 glow-primary">
      <CardHeader className="text-center">
        <CardTitle className="text-xl mb-2">
          <span className="text-primary">Buy Now</span> Before Price Rises
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>USD RAISED SO FAR:</span>
            <span className="text-accent font-bold">${presaleData.raised.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tokens Sold:</span>
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
          <span className="text-sm">1 $RTX = ${presaleData.currentPrice}</span>
          <span className="text-sm text-accent">Next Price: ${presaleData.nextPrice}</span>
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
              {paymentMethod} you pay
            </div>
            <Input
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-center text-lg font-bold"
            />
            <div className="text-sm text-muted-foreground text-center">
              $RTX you receive: {amount ? (parseFloat(amount) / presaleData.currentPrice).toFixed(2) : "0"}
            </div>
          </div>
          
          <Button variant="presale" className="w-full h-12 text-lg font-bold">
            Connect Wallet & Buy
          </Button>
          
          <div className="text-center">
            <Button variant="link" className="text-accent text-sm">
              $250,000 Giveaway
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PresaleWidget;