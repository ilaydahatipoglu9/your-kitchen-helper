import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Anchor, Key, LogIn, UserPlus } from "lucide-react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4" data-usecases="UC_138">
      <div className="w-full max-w-md bg-card rounded-xl shadow-lg border border-border overflow-hidden">
        <div className="p-8 text-center bg-primary/5 border-b border-border">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 shadow-md">
            <Anchor className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">OceanDrive</h1>
          <p className="text-muted-foreground mt-2">Maritime Serenity File Manager</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="mariner@oceandrive.com"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Password</label>
                {isLogin && (
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                    data-usecases="UC_004"
                  >
                    <Key className="w-3 h-3" />
                    Forgot?
                  </button>
                )}
              </div>
              <input
                type="password"
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 font-medium mt-6"
              data-usecases={isLogin ? "UC_005" : "UC_001"}
            >
              {isLogin ? (
                <>
                  <LogIn className="w-4 h-4" /> Sign In
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" /> Create Account
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
