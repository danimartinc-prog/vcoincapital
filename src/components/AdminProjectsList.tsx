import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAdmin } from '@/hooks/useAdmin';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface Project {
  id: string;
  title: string;
  status: string;
  category: string;
  goal_cash_eur: number;
  raised_amount: number;
  created_at: string;
  profiles?: {
    full_name: string;
    email: string;
  };
}

export const AdminProjectsList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { getAllProjects, updateProjectStatus } = useAdmin();

  useEffect(() => {
    const loadProjects = async () => {
      const data = await getAllProjects();
      setProjects(data);
      setLoading(false);
    };

    loadProjects();
  }, [getAllProjects]);

  const handleStatusUpdate = async (projectId: string, newStatus: string) => {
    const success = await updateProjectStatus(projectId, newStatus);
    if (success) {
      setProjects(projects.map(p => 
        p.id === projectId ? { ...p, status: newStatus } : p
      ));
      toast.success('Project status updated successfully');
    } else {
      toast.error('Failed to update project status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'approved': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'completed': return 'bg-purple-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
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
        <CardTitle>All Projects</CardTitle>
        <CardDescription>
          Manage and approve submitted projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Founder</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Goal</TableHead>
              <TableHead>Raised</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  {project.title}
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{project.profiles?.full_name || 'N/A'}</div>
                    <div className="text-sm text-muted-foreground">{project.profiles?.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{project.category}</Badge>
                </TableCell>
                <TableCell>€{project.goal_cash_eur.toLocaleString()}</TableCell>
                <TableCell>€{project.raised_amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(project.created_at), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {project.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(project.id, 'approved')}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleStatusUpdate(project.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {project.status === 'approved' && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(project.id, 'active')}
                      >
                        Activate
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};