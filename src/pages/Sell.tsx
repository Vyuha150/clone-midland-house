import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Sell = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Lock Icon */}
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Lock className="h-8 w-8 text-primary" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-2xl font-bold text-foreground mb-4">Login Required</h1>
        <p className="text-muted-foreground mb-8">
          Please log in to access this feature. Create an account if you don't have one yet.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link to="/login">Login</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link to="/register">Create Account</Link>
          </Button>
        </div>

        {/* Back to Home */}
        <div className="mt-6">
          <Link to="/" className="text-sm text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sell;