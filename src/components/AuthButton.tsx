import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { User, LogOut } from 'lucide-react';

const AuthButton = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <Button variant="outline" disabled>Loading...</Button>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
          Dashboard
        </Button>
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <User className="w-4 h-4" />
          {user.email}
        </span>
        <Button variant="outline" size="sm" onClick={signOut} className="flex items-center gap-1">
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Link to="/auth">
      <Button variant="default">Sign In</Button>
    </Link>
  );
};

export default AuthButton;