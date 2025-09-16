import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAccount, useBalance } from 'wagmi';
import { toast } from 'sonner';
import { usePresaleContract } from '@/hooks/usePresaleContract';
import { useInvestment } from '@/hooks/useInvestment';
import { useAuth } from '@/hooks/useAuth';
import { Wallet, CreditCard, Shield, Zap, Clock } from 'lucide-react';
import CreditCardPayment from '@/components/CreditCardPayment';

interface PaymentMethodsProps {
  projectId: string;
}

const PaymentMethods = ({ projectId }: PaymentMethodsProps) => {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('crypto');
  
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { user } = useAuth();
  
  const {
    buyWithETH,
    buyWithUSDT,
    calculateTokensForETH,
    isPending,
    isConfirming
  } = usePresaleContract();

  const paymentMethods = [
    {
      id: 'crypto',
      title: 'Criptomonedas',
      description: 'ETH, USDT - Procesamiento instantáneo',
      icon: Wallet,
      features: ['Sin comisiones adicionales', 'Transacción inmediata', 'Compatible con Web3'],
      badge: 'Recomendado',
      badgeVariant: 'default' as const
    },
    {
      id: 'card',
      title: 'Tarjeta de Crédito/Débito',
      description: 'Visa, Mastercard, American Express',
      icon: CreditCard,
      features: ['Procesamiento rápido', 'Familiar y fácil', 'Sin wallet necesario'],
      badge: 'Próximamente',
      badgeVariant: 'secondary' as const
    }
  ];

  const cryptoOptions = [
    { symbol: 'ETH', name: 'Ethereum', icon: '🔵', fee: '0%' },
    { symbol: 'USDT', name: 'Tether USD', icon: '🟢', fee: '0%' }
  ];

  const handleCryptoPurchase = async (crypto: string) => {
    if (!isConnected || !user) {
      window.location.href = '/auth';
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Por favor, introduce una cantidad válida');
      return;
    }

    try {
      if (crypto === 'ETH') {
        await buyWithETH(amount);
      } else if (crypto === 'USDT') {
        await buyWithUSDT(amount);
      }
      toast.info('Transacción enviada. Esperando confirmación...');
    } catch (error) {
      console.error('Error en la compra:', error);
      toast.error('Error al procesar la compra');
    }
  };

  const isLoading = isPending || isConfirming;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Payment Method Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <Card 
            key={method.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedMethod === method.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedMethod(method.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <method.icon className="h-5 w-5" />
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                </div>
                <Badge variant={method.badgeVariant}>{method.badge}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{method.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {method.features.map((feature, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Interface */}
      <Card>
        <CardContent className="p-6">
          <Tabs value={selectedMethod} onValueChange={setSelectedMethod}>
            <TabsContent value="crypto" className="space-y-6">
              {/* Amount Input */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Cantidad a Invertir</Label>
                  <Input
                    id="amount"
                    placeholder="0.1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg text-center"
                  />
                  {amount && (
                    <div className="text-center text-sm text-muted-foreground">
                      Recibirás: {calculateTokensForETH(amount)} VCoin
                    </div>
                  )}
                </div>

                {/* Crypto Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cryptoOptions.map((crypto) => (
                    <Button
                      key={crypto.symbol}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center gap-2"
                      onClick={() => handleCryptoPurchase(crypto.symbol)}
                      disabled={isLoading || !amount}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{crypto.icon}</span>
                        <span className="font-semibold">{crypto.symbol}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{crypto.name}</span>
                      <Badge variant="outline" className="text-xs">
                        Comisión: {crypto.fee}
                      </Badge>
                    </Button>
                  ))}
                </div>

                {/* Wallet Info */}
                {isConnected && balance && (
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <div className="text-sm text-muted-foreground">Balance disponible</div>
                    <div className="font-semibold">
                      {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                    </div>
                  </div>
                )}

                {/* Security Notice */}
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  Transacciones seguras en blockchain
                </div>
              </div>
            </TabsContent>

            <TabsContent value="card" className="space-y-6">
              <CreditCardPayment
                projectId={projectId}
                amount={amount || '100'}
                onSuccess={() => {
                  toast.success('¡Inversión realizada con éxito!');
                  setAmount('');
                }}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Payment Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center p-4">
          <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
          <h3 className="font-semibold mb-1">Procesamiento Rápido</h3>
          <p className="text-sm text-muted-foreground">
            Confirmación en segundos con blockchain
          </p>
        </Card>
        
        <Card className="text-center p-4">
          <Shield className="h-8 w-8 mx-auto mb-2 text-accent" />
          <h3 className="font-semibold mb-1">100% Seguro</h3>
          <p className="text-sm text-muted-foreground">
            Encriptación de nivel bancario
          </p>
        </Card>
        
        <Card className="text-center p-4">
          <Clock className="h-8 w-8 mx-auto mb-2 text-secondary-foreground" />
          <h3 className="font-semibold mb-1">24/7 Disponible</h3>
          <p className="text-sm text-muted-foreground">
            Invierte en cualquier momento
          </p>
        </Card>
      </div>
    </div>
  );
};

export default PaymentMethods;