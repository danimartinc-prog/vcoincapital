import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface StripePaymentProps {
  projectId: string;
  amount: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

const StripePayment = ({ projectId, amount, onSuccess, onClose }: StripePaymentProps) => {
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error(t('payments.stripe.invalidAmount'));
      return;
    }

    setIsProcessing(true);

    try {
      const eurAmount = parseFloat(amount);
      const tokens = eurAmount / 0.1; // Assuming 1 VCoin = €0.1

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          amount: eurAmount,
          tokens: tokens,
          projectId
        },
        headers: user ? {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        } : undefined
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        // Open Stripe Checkout in new tab
        window.open(data.url, '_blank');
        onSuccess?.();
      } else {
        throw new Error('No payment URL received');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(t('payments.stripe.error'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">
          {t('payments.stripe.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold">€{amount}</div>
          <div className="text-sm text-muted-foreground">
            {t('payments.stripe.youWillReceive')}: {amount ? (parseFloat(amount) / 0.1).toFixed(2) : "0"} VCoin
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground text-center">
          {t('payments.stripe.redirectMessage')}
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1"
          >
            {t('common.cancel')}
          </Button>
          <Button 
            variant="hero"
            onClick={handlePayment}
            disabled={isProcessing}
            className="flex-1"
          >
            {isProcessing ? t('payments.stripe.processing') : t('payments.stripe.payButton')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StripePayment;