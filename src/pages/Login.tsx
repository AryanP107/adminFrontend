import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";  // Import axios

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Send request to backend API
      const response = await axios.post("http://localhost:3001/admin/signin", {
        email,
        password,
      });

      const { token } = response.data;  // Assuming the token is in the response

      // Store token in localStorage
      localStorage.setItem("token", token);

      toast({
        title: "Login successful",
        description: "Welcome to the admin portal",
      });

      // Call onLogin callback (if any) and navigate to home page
      onLogin();
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);

      toast({
        title: "Login failed",
        description: "Invalid credentials or server error.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
