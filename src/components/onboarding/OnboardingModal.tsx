import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MessageSquare,
  Sparkles,
  Wrench,
  History,
  ChevronRight,
  ChevronLeft,
  Check,
} from "lucide-react";

interface OnboardingStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  image?: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Welcome to AI Chat",
    description:
      "Your intelligent assistant for coding, writing, analysis, and more. Let's take a quick tour of the key features.",
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "Multiple AI Models",
    description:
      "Choose from various AI models like GPT-4, Claude, and Llama. Each model has unique strengths - select the best one for your task.",
  },
  {
    icon: <Wrench className="h-8 w-8" />,
    title: "Tool-Enabled Assistance",
    description:
      "The AI can use external tools to help you - from code analysis to web searches. You'll see tool invocations displayed in the chat.",
  },
  {
    icon: <History className="h-8 w-8" />,
    title: "Conversation History",
    description:
      "All your conversations are saved automatically. Use the sidebar to search, organize with tags, and revisit past chats anytime.",
  },
];

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function OnboardingModal({
  isOpen,
  onClose,
  onComplete,
}: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md"
        data-usecases="UC_140,UC_141,UC_142"
      >
        <DialogHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
            {step.icon}
          </div>
          <DialogTitle className="text-xl">{step.title}</DialogTitle>
          <DialogDescription className="text-base">
            {step.description}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 py-4">
          {onboardingSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                index === currentStep
                  ? "w-6 bg-primary"
                  : index < currentStep
                  ? "bg-primary/50"
                  : "bg-muted"
              )}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {currentStep > 0 ? (
            <Button variant="outline" onClick={handlePrevious}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          ) : (
            <Button variant="ghost" onClick={handleSkip}>
              Skip tour
            </Button>
          )}
          <Button onClick={handleNext} className="flex-1 sm:flex-none">
            {isLastStep ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Get Started
              </>
            ) : (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
