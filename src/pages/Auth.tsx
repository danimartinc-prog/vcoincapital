import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { User, Session } from '@supabase/supabase-js';
import vcoinLogo from "@/assets/vcoin-logo.png";
import Header from '@/components/Header';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Auth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName
        }
      }
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Please check your email to confirm your account"
      });
    }
    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    const redirectUrl = `${window.location.origin}/auth`;
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Password reset email sent. Check your inbox."
      });
    }
    setLoading(false);
  };

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 pt-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src={vcoinLogo} alt="VCoin" className="w-16 h-16 mx-auto mb-4 animate-float" />
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Welcome to VCoin
            </h1>
            <p className="text-muted-foreground mt-2">
              Join the future of startup funding
            </p>
          </div>

          <Card className="border-2 border-primary/20 bg-card/90 backdrop-blur-md glow-primary">
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>Sign in or create your account</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="signin">{t('auth.signIn')}</TabsTrigger>
                  <TabsTrigger value="signup">{t('auth.signUp')}</TabsTrigger>
                  <TabsTrigger value="reset">{t('auth.resetPassword')}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin">
                  <SignInForm onSignIn={signIn} loading={loading} />
                </TabsContent>
                
                <TabsContent value="signup">
                  <SignUpForm onSignUp={signUp} loading={loading} />
                </TabsContent>

                <TabsContent value="reset">
                  <ResetPasswordForm onReset={resetPassword} loading={loading} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="text-center mt-4">
            <button 
              onClick={() => window.history.back()}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
            >
              Back to home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SignInForm = ({ onSignIn, loading }: { onSignIn: (email: string, password: string) => void; loading: boolean }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="signin-email">{t('auth.email')}</Label>
        <Input
          id="signin-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="signin-password">{t('auth.password')}</Label>
        <Input
          id="signin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? t('auth.loading') : t('auth.signIn')}
      </Button>
    </form>
  );
};

const SignUpForm = ({ onSignUp, loading }: { onSignUp: (email: string, password: string, fullName: string) => void; loading: boolean }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp(email, password, fullName);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="signup-name">{t('dashboard.name')}</Label>
        <Input
          id="signup-name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="signup-email">{t('auth.email')}</Label>
        <Input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="signup-password">{t('auth.password')}</Label>
        <Input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? t('auth.loading') : t('auth.signUp')}
      </Button>
    </form>
  );
};

const ResetPasswordForm = ({ onReset, loading }: { onReset: (email: string) => void; loading: boolean }) => {
  const [email, setEmail] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReset(email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="reset-email">{t('auth.email')}</Label>
        <Input
          id="reset-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder={t('auth.enterEmailForReset')}
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? t('auth.loading') : t('auth.sendResetLink')}
      </Button>
    </form>
  );
};

export default Auth;