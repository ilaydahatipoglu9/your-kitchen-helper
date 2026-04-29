import { Navigate } from "react-router-dom";

// This file redirects to the home page
// It's kept for backwards compatibility
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
