import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Lock, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { useInvestment } from '@/hooks/useInvestment';
import { useWalletAuth } from '@/hooks/useWalletAuth';
import { formatCurrency } from '@/lib/formatters';

interface CreditCardPaymentProps {
  projectId: string;
  amount: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

const CreditCardPayment = ({ projectId, amount, onSuccess, onClose }: CreditCardPaymentProps) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: '',
    country: 'ES'
  });
  const [processing, setProcessing] = useState(false);
  
  const { createInvestment } = useInvestment();
  const { user } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    }
    return v;
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      handleInputChange('cardNumber', formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) {
      handleInputChange('expiryDate', formatted);
    }
  };

  const validateForm = () => {
    const { cardNumber, expiryDate, cvv, holderName } = formData;
    
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 13) {
      toast.error('Please enter a valid card number');
      return false;
    }
    
    if (!expiryDate || expiryDate.length !== 5) {
      toast.error('Please enter a valid expiry date');
      return false;
    }
    
    if (!cvv || cvv.length < 3) {
      toast.error('Please enter a valid CVV');
      return false;
    }
    
    if (!holderName.trim()) {
      toast.error('Cardholder name is required');
      return false;
    }
    
    return true;
  };

  const simulatePayment = async (): Promise<{ success: boolean; transactionId?: string }> => {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate random success/failure for demo
    const success = Math.random() > 0.1; // 90% success rate
    
    if (success) {
      return {
        success: true,
        transactionId: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
    } else {
      throw new Error('Payment was rejected. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in to continue');
      return;
    }
    
    if (!validateForm()) return;
    
    setProcessing(true);
    
    try {
      // Simulate payment processing
      toast.info('Processing payment...');
      const paymentResult = await simulatePayment();
      
      if (paymentResult.success) {
        // Calculate VCoin amount (mock conversion rate: 1 EUR = 100 VCoin)
        const eurAmount = parseFloat(amount);
        const vcoinAmount = eurAmount * 100;
        
        // Record investment
        const investment = await createInvestment(
          projectId,
          eurAmount,
          vcoinAmount,
          paymentResult.transactionId,
          'EUR'
        );
        
        if (investment) {
          toast.success(`Investment successful! You received ${vcoinAmount} VCoin`);
          onSuccess?.();
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error instanceof Error ? error.message : 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const getCardType = (number: string) => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return 'Visa';
    if (/^5[1-5]/.test(cleaned)) return 'Mastercard';
    if (/^3[47]/.test(cleaned)) return 'Amex';
    return 'Card';
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Credit Card Payment
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          Secure Payment
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount Display */}
          <div className="p-3 bg-muted rounded-lg text-center">
            <div className="text-lg font-bold">{formatCurrency(parseFloat(amount))}</div>
            <div className="text-sm text-muted-foreground">
              You will receive: {(parseFloat(amount) * 100).toLocaleString()} VCoin
            </div>
          </div>
          
          {/* Card Number */}
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative">
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                className="pr-20"
              />
              {formData.cardNumber && (
                <Badge variant="outline" className="absolute right-2 top-1/2 -translate-y-1/2">
                  {getCardType(formData.cardNumber)}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleExpiryChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                maxLength={4}
                value={formData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </div>
          
          {/* Cardholder Name */}
          <div className="space-y-2">
            <Label htmlFor="holderName">Cardholder Name</Label>
            <Input
              id="holderName"
              placeholder="JOHN DOE"
              value={formData.holderName}
              onChange={(e) => handleInputChange('holderName', e.target.value.toUpperCase())}
            />
          </div>
          
          {/* Country */}
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ES">Spain</SelectItem>
                <SelectItem value="FR">France</SelectItem>
                <SelectItem value="DE">Germany</SelectItem>
                <SelectItem value="IT">Italy</SelectItem>
                <SelectItem value="PT">Portugal</SelectItem>
                <SelectItem value="NL">Netherlands</SelectItem>
                <SelectItem value="BE">Belgium</SelectItem>
                <SelectItem value="AT">Austria</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Security Notice */}
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
            <Lock className="h-3 w-3" />
            Your payment information is secure and encrypted
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={processing}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={processing}
              className="flex-1"
            >
              {processing ? 'Processing...' : 'Pay Now'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreditCardPayment;