import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Github, ArrowRight, Shield } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showMfa, setShowMfa] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin && !showMfa) {
      setShowMfa(true);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card text-card-foreground rounded-xl shadow-lg border border-border p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary mb-2">Oceanic Chat</h1>
          <p className="text-muted-foreground">
            {showMfa ? "Two-Factor Authentication" : isLogin ? "Welcome back to your workspace" : "Create your account"}
          </p>
        </div>

        {showMfa ? (
          <form onSubmit={handleSubmit} className="space-y-4" data-usecases="UC_009">
            <div>
              <label className="block text-sm font-medium mb-1">Authentication Code</label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  type="text" 
                  placeholder="000000" 
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              Verify <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4" data-usecases={isLogin ? "UC_007,UC_233" : "UC_001"}>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    type="email" 
                    placeholder="you@example.com" 
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium">Password</label>
                  {isLogin && (
                    <button type="button" className="text-xs text-primary hover:underline" data-usecases="UC_004">
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                {isLogin ? "Sign In" : "Create Account"} <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="mt-6" data-usecases="UC_008">
              <button 
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-input bg-background py-2 rounded-md hover:bg-secondary transition-colors"
              >
                <Github size={18} />
                GitHub
              </button>
            </div>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button 
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-medium hover:underline"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
