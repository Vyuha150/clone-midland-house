import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";

const ConditionalNavigation = () => {
  const location = useLocation();

  // Don't show navigation on admin routes
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return <Navigation />;
};

export default ConditionalNavigation;
