import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/useAuth";
import { api } from "@/lib/api";

const Profile: React.FC = () => {
  const { user, refresh } = useAuth();

  const handleSignOut = async () => {
    await fetch(api("/api/auth/signout"), {
      method: "POST",
      credentials: "include",
    });
    await refresh();
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <h2 className="text-lg font-semibold">Not signed in</h2>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <p className="mb-2">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="mb-4">
          <strong>Role:</strong> {user.role || "user"}
        </p>
        <Button onClick={handleSignOut}>Sign out</Button>
      </Card>
    </div>
  );
};

export default Profile;
