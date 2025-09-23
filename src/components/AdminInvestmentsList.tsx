import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAdmin } from '@/hooks/useAdmin';
import { format } from 'date-fns';

interface Investment {
  id: string;
  amount_eur: number;
  amount_vcoin: number;
  status: string;
  transaction_hash?: string;
  created_at: string;
  profiles?: {
    full_name: string;
    email: string;
  };
  projects?: {
    title: string;
  };
}

export const AdminInvestmentsList = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const { getAllInvestments } = useAdmin();

  useEffect(() => {
    const loadInvestments = async () => {
      const data = await getAllInvestments();
      setInvestments(data);
      setLoading(false);
    };

    loadInvestments();
  }, [getAllInvestments]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Investments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Investments</CardTitle>
        <CardDescription>
          View all investment transactions on the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Investor</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Amount (EUR)</TableHead>
              <TableHead>VCoin</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Transaction</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investments.map((investment) => (
              <TableRow key={investment.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{investment.profiles?.full_name || 'N/A'}</div>
                    <div className="text-sm text-muted-foreground">{investment.profiles?.email}</div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {investment.projects?.title || 'N/A'}
                </TableCell>
                <TableCell>€{investment.amount_eur.toLocaleString()}</TableCell>
                <TableCell>{investment.amount_vcoin.toLocaleString()} VCoin</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(investment.status)}>
                    {investment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {investment.transaction_hash ? (
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {investment.transaction_hash.slice(0, 10)}...
                    </code>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  {format(new Date(investment.created_at), 'MMM dd, yyyy')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};