import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

const PresaleWidget = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("ETH");
  
  const presaleData = {
    raised: 125000,
    tokensRemaining: 875000,
    currentPrice: 0.10,
    nextPrice: 0.12,
    progress: 12.5
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
          <span className="text-primary">Comprar Ahora</span> Antes de que Suba el Precio
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>EUR RECAUDADOS:</span>
            <span className="text-accent font-bold">€{presaleData.raised.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>VCoin Disponibles:</span>
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
          <span className="text-sm text-accent">Siguiente Precio: €{presaleData.nextPrice}</span>
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
              {paymentMethod} que pagas
            </div>
            <Input
              placeholder="Cantidad"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-center text-lg font-bold"
            />
            <div className="text-sm text-muted-foreground text-center">
              VCoin que recibes: {amount ? (parseFloat(amount) / presaleData.currentPrice).toFixed(2) : "0"}
            </div>
          </div>
          
          <Button 
            variant="hero" 
            className="w-full h-12 text-lg font-bold"
            onClick={() => window.location.href = '/wallet-auth'}
          >
            Conectar Wallet y Comprar
          </Button>
          
          <div className="text-center">
            <Button variant="link" className="text-accent text-sm">
              Sorteo €100,000
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PresaleWidget;