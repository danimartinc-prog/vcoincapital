import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import vcoinLogo from "@/assets/vcoin-logo.png";
import SEO from "@/components/SEO";

const PaymentSuccess = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    // Here you could verify the payment with Stripe if needed
    console.log("Payment session ID:", sessionId);
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <SEO page="paymentSuccess" />
      <div className="w-full max-w-md">
        <Card className="bg-card/90 backdrop-blur-md border-2 border-primary/20 glow-primary">
          <CardHeader className="text-center">
            <div className="flex flex-col items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <img src={vcoinLogo} alt="VCoin" className="w-12 h-12" />
            </div>
            <CardTitle className="text-2xl text-green-500">
              {t('paymentSuccess.title')}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <p className="text-muted-foreground">
              {t('paymentSuccess.message')}
            </p>
            
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">
                {t('paymentSuccess.transactionId')}
              </p>
              <p className="text-xs font-mono break-all">
                {sessionId || t('paymentSuccess.processing')}
              </p>
            </div>
            
            <div className="space-y-3">
              <Button asChild variant="hero" className="w-full">
                <Link to="/dashboard">
                  {t('paymentSuccess.goToDashboard')}
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full">
                <Link to="/">
                  {t('paymentSuccess.backToHome')}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;