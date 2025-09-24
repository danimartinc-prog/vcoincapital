import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { usePlatformConfig } from '@/hooks/usePlatformConfig';
import { Wallet, Settings, Copy, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FundsConfigPanel = () => {
  const { configs, loading, updateConfig, getConfigValue } = usePlatformConfig();
  const { toast } = useToast();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValues, setTempValues] = useState<Record<string, string>>({});

  const handleEdit = (key: string) => {
    setEditingField(key);
    setTempValues({ ...tempValues, [key]: getConfigValue(key) });
  };

  const handleSave = async (key: string) => {
    const success = await updateConfig(key, tempValues[key] || '');
    if (success) {
      setEditingField(null);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValues({});
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado",
      description: "Dirección copiada al portapapeles",
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const treasuryAddress = getConfigValue('treasury_wallet_address');
  const presaleContract = getConfigValue('presale_contract_address');
  const vcoinToken = getConfigValue('vcoin_token_address');

  return (
    <div className="space-y-6">
      {/* Dirección Principal de Fondos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Dirección de Recepción de Fondos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="treasury_address">Tu Dirección de Wallet Principal</Label>
            {editingField === 'treasury_wallet_address' ? (
              <div className="flex gap-2 mt-2">
                <Input
                  value={tempValues.treasury_wallet_address || ''}
                  onChange={(e) => setTempValues({ ...tempValues, treasury_wallet_address: e.target.value })}
                  placeholder="0x742d35Cc6635C0532925a3b8D8Cc4e8E6B8B6B8B"
                />
                <Button onClick={() => handleSave('treasury_wallet_address')} size="sm">
                  Guardar
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  Cancelar
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 p-2 bg-muted rounded border font-mono text-sm">
                  {treasuryAddress || 'No configurada'}
                </div>
                {treasuryAddress && (
                  <Button
                    onClick={() => copyToClipboard(treasuryAddress)}
                    variant="ghost"
                    size="sm"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
                <Button onClick={() => handleEdit('treasury_wallet_address')} size="sm">
                  Editar
                </Button>
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              Esta es la dirección donde recibirás todos los fondos de la plataforma. 
              Asegúrate de que tienes control total sobre esta wallet.
            </p>
          </div>

          {treasuryAddress && (
            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">Configuración Activa</span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                Los fondos se están enviando a tu wallet configurada.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Configuración de Contratos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuración de Contratos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Contrato de Presale */}
          <div>
            <Label>Dirección del Contrato de Presale</Label>
            {editingField === 'presale_contract_address' ? (
              <div className="flex gap-2 mt-2">
                <Input
                  value={tempValues.presale_contract_address || ''}
                  onChange={(e) => setTempValues({ ...tempValues, presale_contract_address: e.target.value })}
                  placeholder="0x742d35Cc6635C0532925a3b8D8Cc4e8E6B8B6B8C"
                />
                <Button onClick={() => handleSave('presale_contract_address')} size="sm">
                  Guardar
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  Cancelar
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 p-2 bg-muted rounded border font-mono text-sm">
                  {presaleContract || 'No configurada'}
                </div>
                <Button onClick={() => handleEdit('presale_contract_address')} size="sm">
                  Editar
                </Button>
              </div>
            )}
          </div>

          <Separator />

          {/* Token VCoin */}
          <div>
            <Label>Dirección del Token VCoin</Label>
            {editingField === 'vcoin_token_address' ? (
              <div className="flex gap-2 mt-2">
                <Input
                  value={tempValues.vcoin_token_address || ''}
                  onChange={(e) => setTempValues({ ...tempValues, vcoin_token_address: e.target.value })}
                  placeholder="0x742d35Cc6635C0532925a3b8D8Cc4e8E6B8B6B8B"
                />
                <Button onClick={() => handleSave('vcoin_token_address')} size="sm">
                  Guardar
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  Cancelar
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 p-2 bg-muted rounded border font-mono text-sm">
                  {vcoinToken || 'No configurada'}
                </div>
                <Button onClick={() => handleEdit('vcoin_token_address')} size="sm">
                  Editar
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Configuración de Comisiones */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Comisiones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { key: 'platform_fee_percentage', label: 'Comisión Plataforma (%)', suffix: '%' },
              { key: 'eth_withdrawal_fee', label: 'Comisión ETH', suffix: 'ETH' },
              { key: 'usdt_withdrawal_fee', label: 'Comisión USDT', suffix: 'USDT' }
            ].map(({ key, label, suffix }) => (
              <div key={key}>
                <Label>{label}</Label>
                {editingField === key ? (
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={tempValues[key] || ''}
                      onChange={(e) => setTempValues({ ...tempValues, [key]: e.target.value })}
                      type="number"
                      step="0.01"
                    />
                    <Button onClick={() => handleSave(key)} size="sm">
                      ✓
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      ✕
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="flex-1 justify-center py-2">
                      {getConfigValue(key)} {suffix}
                    </Badge>
                    <Button onClick={() => handleEdit(key)} variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instrucciones */}
      <Card>
        <CardHeader>
          <CardTitle>📋 Instrucciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="space-y-2">
            <p><strong>1. Configura tu dirección principal:</strong> Esta debe ser una wallet que controles completamente (MetaMask, Trust Wallet, etc.)</p>
            <p><strong>2. Despliega los contratos:</strong> Necesitas desplegar el contrato de presale y el token VCoin en la blockchain</p>
            <p><strong>3. Configura las direcciones:</strong> Actualiza las direcciones de los contratos una vez desplegados</p>
            <p><strong>4. Verifica la configuración:</strong> Asegúrate de que todos los fondos lleguen a tu wallet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FundsConfigPanel;