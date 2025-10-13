import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();

  const requestOtp = async () => {
    if (!email)
      return toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive",
      });
    const res = await fetch(api("/api/auth/request-password-otp"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok)
      return toast({
        title: "Error",
        description: data.message || "Failed",
        variant: "destructive",
      });
    toast({ title: "OTP sent", description: data.message });
    setStep(2);
  };

  const resetPassword = async () => {
    if (!otp || !newPassword)
      return toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
    const res = await fetch(api("/api/auth/reset-password"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, otp, newPassword }),
    });
    const data = await res.json();
    if (!res.ok)
      return toast({
        title: "Error",
        description: data.message || "Failed",
        variant: "destructive",
      });
    toast({ title: "Success", description: "Password reset. Please login." });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Forgot Password
          </h1>
          <p className="text-muted-foreground mt-2">
            Reset your password using a one-time code
          </p>
        </div>

        {step === 1 ? (
          <div className="space-y-4">
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
            <Button className="w-full" onClick={requestOtp}>
              Request OTP
            </Button>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Remembered?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                OTP
              </label>
              <Input value={otp} onChange={(e) => setOtp(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                New Password
              </label>
              <Input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
              />
            </div>
            <Button className="w-full" onClick={resetPassword}>
              Reset Password
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ForgotPassword;
