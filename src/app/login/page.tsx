"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") { // Demo password
      localStorage.setItem("isLoggedIn", "true");
      router.push("/");
    } else {
      alert("Wrong password! Use: admin123");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Card className="w-[350px]">
        <CardHeader><CardTitle className="text-center">CRM Login</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input placeholder="Username (admin)" disabled value="admin" />
            <Input 
              type="password" 
              placeholder="Password (admin123)" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}