import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Wallet, 
  TrendingUp, 
  Coins, 
  Copy,
  History,
  ShoppingBag,
  Trophy,
  Bell,
  Gift,
  Bitcoin,
  DollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAccount } from 'wagmi';
import { Navigate } from 'react-router-dom';
import { usePresaleContract } from '@/hooks/usePresaleContract';
import { formatEther, parseEther } from 'viem';

const WalletDashboard = () => {
  const { address, isConnected } = useAccount();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('ETH');
  const [promoCode, setPromoCode] = useState('');
  
  // Use presale contract hooks
  const { 
    buyWithETH, 
    buyWithUSDT, 
    tokenPrice, 
    totalRaised, 
    tokensRemaining,
    calculateTokensForETH,
    isPending,
    isConfirming,
    isConfirmed 
  } = usePresaleContract();

  // Mock data - replace with real data later
  const [vcoinBalance, setVcoinBalance] = useState('15,823.31');
  const [tokenValue, setTokenValue] = useState('$2136.147');
  const [progressPercentage, setProgressPercentage] = useState(56.31);

  if (!isConnected) {
    return <Navigate to="/auth" replace />;
  }

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Welcome to Your Dashboard!
          </h1>
          <p className="text-muted-foreground">
            Manage your VCoin investments and track your portfolio
          </p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card/90 backdrop-blur-md border-primary/20 glow-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Your Total VCoin Balance
              </CardTitle>
              <Coins className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{vcoinBalance}</div>
            </CardContent>
          </Card>

          <Card className="bg-card/90 backdrop-blur-md border-primary/20 glow-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Your Tokens Worth at Launch
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{tokenValue}</div>
            </CardContent>
          </Card>

          <Card className="bg-card/90 backdrop-blur-md border-primary/20 glow-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Receiving Wallet Address
              </CardTitle>
              <Wallet className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  {address ? formatAddress(address) : 'No address'}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyAddress}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-card/50 backdrop-blur-md">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="buy-now" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Buy Now
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="updates" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Project Updates
            </TabsTrigger>
            <TabsTrigger value="claim" className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Claim
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* User Email Section */}
            <Card className="bg-card/90 backdrop-blur-md border-primary/20">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address (for notifications)
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline">Save</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Presale Progress */}
            <Card className="bg-card/90 backdrop-blur-md border-primary/20">
              <CardHeader>
                <CardTitle>VCoin Presale Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-accent font-medium">Until Price Increase</span>
                    <span className="text-muted-foreground">Block 8</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="text-sm text-accent font-medium">{progressPercentage}%</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">USDT Raised:</span>
                    <Badge variant="secondary">{totalRaised ? `$${totalRaised.toLocaleString()}` : '$26,451,818.11'}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">Tokens Sold:</span>
                    <Badge variant="secondary">{tokensRemaining ? (1000000000 - Number(tokensRemaining)).toLocaleString() : '669,705,878.04'}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="buy-now" className="space-y-6">
            <Card className="bg-card/90 backdrop-blur-md border-primary/20">
              <CardHeader>
                <CardTitle>Buy VCoin Tokens</CardTitle>
                <p className="text-sm text-muted-foreground">
                  1 VCoin = $0.1130 • Current Block: Block 8
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Payment Method</label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ETH">
                          <div className="flex items-center gap-2">
                            <Bitcoin className="w-4 h-4" />
                            ETH
                          </div>
                        </SelectItem>
                        <SelectItem value="USDT">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            USDT
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Enter amount in USD</label>
                    <Input
                      placeholder="Enter Amount"
                      className="text-lg"
                      value={purchaseAmount}
                      onChange={(e) => setPurchaseAmount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount of {paymentMethod} you pay</label>
                    <Input
                      placeholder="0.0000"
                      className="text-lg"
                      value={purchaseAmount && paymentMethod === 'ETH' ? 
                        (parseFloat(purchaseAmount) / 2000).toFixed(4) : // Assuming ETH = $2000
                        purchaseAmount
                      }
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount of VCoin you receive</label>
                    <Input
                      placeholder="0"
                      className="text-lg"
                      value={purchaseAmount ? 
                        (parseFloat(purchaseAmount) / 0.113).toFixed(2) : // VCoin price = $0.113
                        ''
                      }
                      readOnly
                    />
                  </div>

                  <Button 
                    className="w-full text-lg py-6 bg-gradient-primary hover:opacity-90"
                    disabled={!purchaseAmount || isPending || isConfirming}
                    onClick={async () => {
                      if (!purchaseAmount) return;
                      
                      try {
                        if (paymentMethod === 'ETH') {
                          const ethAmount = (parseFloat(purchaseAmount) / 2000).toString();
                          await buyWithETH(ethAmount);
                        } else {
                          await buyWithUSDT(purchaseAmount);
                        }
                        
                        toast({
                          title: "Transaction initiated",
                          description: "Your purchase is being processed",
                        });
                      } catch (error) {
                        toast({
                          title: "Transaction failed",
                          description: "Please try again",
                          variant: "destructive"
                        });
                      }
                    }}
                  >
                    {isPending || isConfirming ? 'Processing...' : 'Buy Now'}
                  </Button>

                  <Separator />

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Apply Your Promo Code?</label>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="bg-card/90 backdrop-blur-md border-primary/20">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No transactions yet</p>
                  <p className="text-sm">Your transaction history will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="bg-card/90 backdrop-blur-md border-primary/20">
              <CardHeader>
                <CardTitle>Investor Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Leaderboard coming soon</p>
                  <p className="text-sm">See top investors and rankings</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="updates" className="space-y-6">
            <Card className="bg-card/90 backdrop-blur-md border-primary/20">
              <CardHeader>
                <CardTitle>Project Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No updates yet</p>
                  <p className="text-sm">Project updates and announcements will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="claim" className="space-y-6">
            <Card className="bg-card/90 backdrop-blur-md border-primary/20">
              <CardHeader>
                <CardTitle>Claim Tokens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Gift className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No tokens to claim yet</p>
                  <p className="text-sm">Available tokens will appear here when ready</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WalletDashboard;