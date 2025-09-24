import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Shield, Wallet, CheckCircle, Copy } from 'lucide-react';

const WalletAdminSetup = () => {
  const { address, isConnected } = useAccount();
  const { toast } = useToast();
  const [isAssigning, setIsAssigning] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(false);

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Dirección copiada",
        description: "La dirección de tu wallet ha sido copiada al portapapeles",
      });
    }
  };

  const checkAdminStatus = async () => {
    if (!address) return;
    
    setChecking(true);
    try {
      const { data, error } = await supabase.functions.invoke('wallet-admin', {
        body: {
          action: 'check_admin',
          wallet_address: address
        }
      });

      if (error) throw error;
      setIsAdmin(data.isAdmin || false);
    } catch (error) {
      console.error('Error checking admin status:', error);
    } finally {
      setChecking(false);
    }
  };

  const assignAdminRole = async () => {
    if (!address) {
      toast({
        title: "Error",
        description: "No hay wallet conectada",
        variant: "destructive",
      });
      return;
    }

    setIsAssigning(true);
    try {
      const { data, error } = await supabase.functions.invoke('wallet-admin', {
        body: {
          action: 'assign_admin',
          wallet_address: address
        }
      });

      if (error) throw error;

      setIsAdmin(true);
      toast({
        title: "¡Éxito!",
        description: "Permisos de administrador asignados correctamente",
      });
    } catch (error: any) {
      console.error('Error assigning admin role:', error);
      toast({
        title: "Error",
        description: error.message || "No se pudo asignar el rol de administrador",
        variant: "destructive",
      });
    } finally {
      setIsAssigning(false);
    }
  };

  if (!isConnected || !address) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <Wallet className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="text-muted-foreground">
              Conecta tu wallet para configurar permisos de administrador
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Configuración de Administrador
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Tu Wallet Conectada:</label>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 p-2 bg-muted rounded border font-mono text-sm">
              {address.slice(0, 6)}...{address.slice(-4)}
            </div>
            <Button onClick={copyAddress} variant="ghost" size="sm">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Dirección completa: {address}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">Estado de administrador:</span>
          {checking ? (
            <Badge variant="outline">Verificando...</Badge>
          ) : isAdmin ? (
            <Badge variant="default" className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Administrador
            </Badge>
          ) : (
            <Badge variant="outline">Sin permisos</Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={checkAdminStatus} 
            variant="outline" 
            disabled={checking}
            size="sm"
          >
            {checking ? 'Verificando...' : 'Verificar Estado'}
          </Button>
          
          {!isAdmin && (
            <Button 
              onClick={assignAdminRole} 
              disabled={isAssigning}
              size="sm"
            >
              {isAssigning ? 'Asignando...' : 'Asignar Admin'}
            </Button>
          )}
        </div>

        {isAdmin && (
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">¡Permisos Configurados!</span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              Ya tienes acceso completo al panel de administración y configuración de fondos.
            </p>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          <p><strong>Nota:</strong> Una vez que tengas permisos de admin, podrás acceder a:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Panel de administración completo</li>
            <li>Configuración de fondos y wallets</li>
            <li>Gestión de usuarios y proyectos</li>
            <li>Configuración de contratos</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletAdminSetup;