import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAdmin } from '@/hooks/useAdmin';
import { format } from 'date-fns';

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export const AdminUsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { getAllUsers } = useAdmin();

  useEffect(() => {
    const loadUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
      setLoading(false);
    };

    loadUsers();
  }, [getAllUsers]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'founder': return 'bg-blue-500';
      case 'user': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
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
        <CardTitle>All Users</CardTitle>
        <CardDescription>
          View all registered users on the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.full_name || 'N/A'}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge className={getRoleColor(user.role)}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(user.created_at), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>
                  {format(new Date(user.updated_at), 'MMM dd, yyyy')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};