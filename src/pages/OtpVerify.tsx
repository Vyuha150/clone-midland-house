import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import useAuth from "@/context/useAuth";

const OtpVerify = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { refresh } = useAuth();
  const [searchParams] = useSearchParams();

  // prefill email if provided via query
  useState(() => {
    const e = searchParams.get("email") || "";
    if (e) setEmail(e);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !otp || !name || !password) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      // call signup with otp
      const res = await fetch(api("/api/auth/signup"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      toast({ title: "Success", description: "Account created" });
      try {
        await refresh();
      } catch (e) {
        /* ignore */
      }
      navigate("/");
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "message" in err
          ? (err as { message?: string }).message
          : "Failed";
      toast({ title: "Error", description: message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Verify & Register
          </h1>
          <p className="text-muted-foreground mt-2">
            Enter the OTP sent to your email and complete registration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Name
            </label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              OTP
            </label>
            <Input value={otp} onChange={(e) => setOtp(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>

          <Button type="submit" className="w-full">
            Complete Registration
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default OtpVerify;
