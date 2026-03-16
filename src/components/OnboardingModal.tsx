import React, { useState, useEffect } from "react";
import { Ship, ArrowRight, Check } from "lucide-react";

export const OnboardingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Simulate checking if user is new
    const hasSeenOnboarding = localStorage.getItem("oceanic_onboarding");
    if (!hasSeenOnboarding) {
      setIsOpen(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem("oceanic_onboarding", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-card text-card-foreground w-full max-w-md rounded-2xl shadow-2xl border border-border p-8 animate-in zoom-in-95 duration-300">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <Ship size={32} />
          </div>
        </div>
        
        {step === 0 ? (
          <div className="text-center space-y-4" data-usecases="UC_140">
            <h2 className="text-2xl font-bold">Welcome Aboard</h2>
            <p className="text-muted-foreground">
              Oceanic Chat is your professional AI assistant. Let's take a quick tour to get you familiar with the workspace.
            </p>
            <button 
              onClick={() => setStep(1)}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 font-medium mt-6"
            >
              Start Tour <ArrowRight size={18} />
            </button>
            <button 
              onClick={handleComplete}
              className="text-sm text-muted-foreground hover:text-foreground mt-4"
            >
              Skip for now
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4" data-usecases="UC_142">
            <h2 className="text-2xl font-bold">You're All Set!</h2>
            <p className="text-muted-foreground">
              You can access your conversation history in the sidebar, change AI models in the header, and manage settings from your profile.
            </p>
            <button 
              onClick={handleComplete}
              className="w-full bg-success text-success-foreground py-3 rounded-xl hover:bg-success/90 transition-colors flex items-center justify-center gap-2 font-medium mt-6"
            >
              Finish Setup <Check size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
