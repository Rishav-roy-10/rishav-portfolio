import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Github, Eye, EyeOff, Copy, Edit2, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const PasswordManager = () => {
  const [passwords, setPasswords] = useState([]);
  const [formData, setFormData] = useState({
    website: "",
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { toast } = useToast();

  // Load passwords from localStorage on component mount
  useEffect(() => {
    const savedPasswords = localStorage.getItem("passwords");
    if (savedPasswords) {
      setPasswords(JSON.parse(savedPasswords));
    }
  }, []);

  // Save passwords to localStorage whenever passwords state changes
  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(passwords));
  }, [passwords]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.website || !formData.username || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (editingId) {
      // Update existing password
      setPasswords(passwords.map(pass => 
        pass.id === editingId 
          ? { ...pass, ...formData }
          : pass
      ));
      setEditingId(null);
      toast({
        title: "Success",
        description: "Password updated successfully"
      });
    } else {
      // Add new password
      const newPassword = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      setPasswords([...passwords, newPassword]);
      toast({
        title: "Success",
        description: "Password saved successfully"
      });
    }

    // Reset form
    setFormData({
      website: "",
      username: "",
      password: ""
    });
    setShowPassword(false);
  };

  const handleEdit = (password) => {
    setFormData({
      website: password.website,
      username: password.username,
      password: password.password
    });
    setEditingId(password.id);
  };

  const handleDelete = (id) => {
    setPasswords(passwords.filter(pass => pass.id !== id));
    toast({
      title: "Success",
      description: "Password deleted successfully"
    });
  };

  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied",
        description: `${type} copied to clipboard`
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const formatUrl = (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-xl font-bold">
                <span className="text-foreground">Pass</span>
                <span className="text-destructive">MA</span>
              </Link>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Password Manager</h1>
          <p className="text-muted-foreground text-lg">Your own password manager</p>
        </div>

        {/* Form Section */}
        <Card className="p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <Input
                id="website"
                name="website"
                type="text"
                placeholder="Enter website URL"
                value={formData.website}
                onChange={handleInputChange}
                className="h-12"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="h-12 pr-10"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <div className="h-5 w-5 text-primary bg-primary/10 rounded-full flex items-center justify-center">
                      <div className="h-3 w-3 bg-primary rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button type="submit" className="px-8 py-3 h-12">
                <Plus className="h-5 w-5 mr-2" />
                {editingId ? "Update" : "Submit"}
              </Button>
            </div>
          </form>
        </Card>

        {/* Passwords Table */}
        {passwords.length > 0 && (
          <Card className="p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Site</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Password</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {passwords.map((password) => (
                    <TableRow key={password.id}>
                      <TableCell>
                        <button
                          onClick={() => handleCopy(password.website, "Website")}
                          className="text-primary hover:underline flex items-center"
                        >
                          {password.website}
                          <Copy className="h-4 w-4 ml-1 opacity-50" />
                        </button>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleCopy(password.username, "Username")}
                          className="flex items-center hover:bg-secondary rounded px-2 py-1"
                        >
                          {password.username}
                          <Copy className="h-4 w-4 ml-1 opacity-50" />
                        </button>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleCopy(password.password, "Password")}
                          className="flex items-center hover:bg-secondary rounded px-2 py-1"
                        >
                          ********
                          <Copy className="h-4 w-4 ml-1 opacity-50" />
                        </button>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(password)}
                            className="h-8 w-8"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(password.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}

        {passwords.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No passwords saved yet. Add your first password above!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PasswordManager;