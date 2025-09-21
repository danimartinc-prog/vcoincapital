import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface ProjectSubmissionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  // Company Information
  companyName: string;
  website: string;
  founded: string;
  location: string;
  
  // Project Details
  projectName: string;
  oneLinePitch: string;
  problemSolution: string;
  targetMarket: string;
  businessModel: string;
  
  // Financial Information
  fundingAmount: string;
  useOfFunds: string;
  revenue: string;
  projectedRevenue: string;
  
  // Team
  founderBackground: string;
  teamSize: string;
  keyTeamMembers: string;
  
  // Traction
  currentTraction: string;
  customers: string;
  partnerships: string;
  
  // Competition & Strategy
  competition: string;
  competitiveAdvantage: string;
  goToMarketStrategy: string;
  
  // Contact
  founderName: string;
  email: string;
  linkedin: string;
  phone: string;
}

const ProjectSubmissionForm = ({ open, onOpenChange }: ProjectSubmissionFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    website: "",
    founded: "",
    location: "",
    projectName: "",
    oneLinePitch: "",
    problemSolution: "",
    targetMarket: "",
    businessModel: "",
    fundingAmount: "",
    useOfFunds: "",
    revenue: "",
    projectedRevenue: "",
    founderBackground: "",
    teamSize: "",
    keyTeamMembers: "",
    currentTraction: "",
    customers: "",
    partnerships: "",
    competition: "",
    competitiveAdvantage: "",
    goToMarketStrategy: "",
    founderName: "",
    email: "",
    linkedin: "",
    phone: "",
  });

  const [files, setFiles] = useState<File[]>([]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit a project.",
        variant: "destructive"
      });
      return;
    }
    
    // Basic validation
    if (!formData.companyName || !formData.email || !formData.founderName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) {
        toast({
          title: "Profile Error",
          description: "User profile not found. Please try signing out and back in.",
          variant: "destructive"
        });
        return;
      }

      // Submit project to database
      const { data: project, error } = await supabase
        .from('projects')
        .insert({
          founder_id: profile.id,
          title: formData.projectName,
          summary: formData.oneLinePitch,
          description: formData.problemSolution,
          category: 'tech', // Default category
          stage: 'idea', // Default stage
          country: formData.location,
          goal_cash_eur: parseFloat(formData.fundingAmount) || 0,
          goal_vcoin: parseFloat(formData.fundingAmount) * 10 || 0, // Simplified conversion
          min_ticket_eur: 1000, // Default minimum
          min_ticket_vcoin: 10000, // Default minimum
          company_name: formData.companyName,
          company_website: formData.website,
          team_size: parseInt(formData.teamSize) || 0,
          revenue_last_year: parseFloat(formData.revenue) || 0,
          use_of_funds: formData.useOfFunds,
          market_analysis: formData.targetMarket,
          competition_analysis: formData.competition,
          documents: files.map(f => ({ name: f.name, size: f.size }))
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Insert contact information into the separate protected table
      const { error: contactError } = await supabase
        .from('project_contacts')
        .insert({
          project_id: project.id,
          contact_person: formData.founderName,
          contact_email: formData.email,
          contact_phone: formData.phone
        });

      if (contactError) {
        console.error('Error inserting contact information:', contactError);
        // Don't throw here as the project was already created successfully
      }
      
      toast({
        title: "Project Submitted!",
        description: "We'll review your submission and get back to you within 3-7 days.",
      });
      
      onOpenChange(false);
      
      // Reset form
      setFormData({
        companyName: "",
        website: "",
        founded: "",
        location: "",
        projectName: "",
        oneLinePitch: "",
        problemSolution: "",
        targetMarket: "",
        businessModel: "",
        fundingAmount: "",
        useOfFunds: "",
        revenue: "",
        projectedRevenue: "",
        founderBackground: "",
        teamSize: "",
        keyTeamMembers: "",
        currentTraction: "",
        customers: "",
        partnerships: "",
        competition: "",
        competitiveAdvantage: "",
        goToMarketStrategy: "",
        founderName: "",
        email: "",
        linkedin: "",
        phone: "",
      });
      setFiles([]);
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "An error occurred while submitting your project.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Submit Your Project</DialogTitle>
          <p className="text-muted-foreground text-center">
            Tell us about your project and upload your pitch deck or business plan
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="fileUpload"
                  multiple
                  accept=".pdf,.ppt,.pptx,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="fileUpload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Upload pitch deck, business plan, or financial projections
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, PPT, DOC formats accepted
                  </p>
                </label>
              </div>
              
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm truncate">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://"
                />
              </div>
              <div>
                <Label htmlFor="founded">Founded</Label>
                <Input
                  id="founded"
                  value={formData.founded}
                  onChange={(e) => handleInputChange("founded", e.target.value)}
                  placeholder="Year"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="City, Country"
                />
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange("projectName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="oneLinePitch">One-line Pitch</Label>
                <Input
                  id="oneLinePitch"
                  value={formData.oneLinePitch}
                  onChange={(e) => handleInputChange("oneLinePitch", e.target.value)}
                  placeholder="Describe your project in one sentence"
                />
              </div>
              <div>
                <Label htmlFor="problemSolution">Problem & Solution</Label>
                <Textarea
                  id="problemSolution"
                  value={formData.problemSolution}
                  onChange={(e) => handleInputChange("problemSolution", e.target.value)}
                  placeholder="What problem are you solving and how?"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="targetMarket">Target Market</Label>
                  <Textarea
                    id="targetMarket"
                    value={formData.targetMarket}
                    onChange={(e) => handleInputChange("targetMarket", e.target.value)}
                    placeholder="Who is your target customer?"
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="businessModel">Business Model</Label>
                  <Textarea
                    id="businessModel"
                    value={formData.businessModel}
                    onChange={(e) => handleInputChange("businessModel", e.target.value)}
                    placeholder="How do you make money?"
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fundingAmount">Funding Amount Needed</Label>
                <Input
                  id="fundingAmount"
                  value={formData.fundingAmount}
                  onChange={(e) => handleInputChange("fundingAmount", e.target.value)}
                  placeholder="$100,000"
                />
              </div>
              <div>
                <Label htmlFor="revenue">Current Revenue (if any)</Label>
                <Input
                  id="revenue"
                  value={formData.revenue}
                  onChange={(e) => handleInputChange("revenue", e.target.value)}
                  placeholder="$0 or current amount"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="useOfFunds">Use of Funds</Label>
                <Textarea
                  id="useOfFunds"
                  value={formData.useOfFunds}
                  onChange={(e) => handleInputChange("useOfFunds", e.target.value)}
                  placeholder="How will you use the funding?"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Team */}
          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="founderBackground">Founder Background</Label>
                <Textarea
                  id="founderBackground"
                  value={formData.founderBackground}
                  onChange={(e) => handleInputChange("founderBackground", e.target.value)}
                  placeholder="Tell us about your experience and expertise"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input
                    id="teamSize"
                    value={formData.teamSize}
                    onChange={(e) => handleInputChange("teamSize", e.target.value)}
                    placeholder="Number of team members"
                  />
                </div>
                <div>
                  <Label htmlFor="keyTeamMembers">Key Team Members</Label>
                  <Textarea
                    id="keyTeamMembers"
                    value={formData.keyTeamMembers}
                    onChange={(e) => handleInputChange("keyTeamMembers", e.target.value)}
                    placeholder="Key roles and experience"
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Traction */}
          <Card>
            <CardHeader>
              <CardTitle>Traction & Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentTraction">Current Traction</Label>
                <Textarea
                  id="currentTraction"
                  value={formData.currentTraction}
                  onChange={(e) => handleInputChange("currentTraction", e.target.value)}
                  placeholder="Users, revenue, partnerships, etc."
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customers">Current Customers</Label>
                  <Input
                    id="customers"
                    value={formData.customers}
                    onChange={(e) => handleInputChange("customers", e.target.value)}
                    placeholder="Number or key customers"
                  />
                </div>
                <div>
                  <Label htmlFor="partnerships">Key Partnerships</Label>
                  <Input
                    id="partnerships"
                    value={formData.partnerships}
                    onChange={(e) => handleInputChange("partnerships", e.target.value)}
                    placeholder="Important partnerships"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="founderName">Founder Name *</Label>
                <Input
                  id="founderName"
                  value={formData.founderName}
                  onChange={(e) => handleInputChange("founderName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => handleInputChange("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Submit Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectSubmissionForm;