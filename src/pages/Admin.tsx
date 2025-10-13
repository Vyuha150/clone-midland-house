import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Legacy Admin component - redirects to the new modular admin structure
 * This file is kept for backward compatibility but the actual admin functionality
 * has been moved to /admin route with separate pages for better maintainability
 */
const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new admin structure
    navigate("/admin", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Redirecting to Admin Panel...
        </h1>
        <p className="text-muted-foreground">
          Please wait while we redirect you to the new admin interface.
        </p>
      </div>
    </div>
  );
};

export default Admin;
