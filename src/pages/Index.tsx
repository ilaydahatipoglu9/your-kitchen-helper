import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirect to chat page
  return <Navigate to="/chat" replace />;
};

export default Index;
