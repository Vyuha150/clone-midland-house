import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Loading = ({ className, size = "md" }: LoadingProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-muted border-t-primary",
          sizeClasses[size]
        )}
      />
    </div>
  );
};

export const PageLoading = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <img 
            src="/lovable-uploads/674c43b8-f787-4efc-831c-9e061904f904.png"
            alt="Mid-Land Real Estate Services"
            className="h-24 w-auto mx-auto animate-pulse"
          />
        </div>
        <Loading size="lg" />
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};