import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAppStore } from "@/lib/appStore";
import { ArrowRight, PlayCircle } from "lucide-react";

export function OnboardingEmptyState() {
  const { actions } = useAppStore();
  const [tourOpen, setTourOpen] = React.useState(false);
  const [step, setStep] = React.useState(0);

  const steps = [
    {
      title: "Welcome to your workspace",
      body: "Use the sidebar to create new chats and switch between conversations.",
    },
    {
      title: "Pick a model",
      body: "Use the model selector in the topbar to match speed vs reasoning.",
    },
    {
      title: "Attach files",
      body: "Add an attachment to provide documents or screenshots as context.",
    },
  ];

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-10">
      <Card className="w-full max-w-xl bg-background/60 p-8 text-center">
        <div className="mx-auto mb-3 h-12 w-12 rounded-2xl bg-primary/15 text-primary grid place-items-center">
          <PlayCircle />
        </div>
        <h2 className="text-lg font-semibold">Start a new conversation</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Ask anything—from planning and writing to studying and brainstorming.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <Button onClick={actions.createConversation} data-usecases="UC_143">
            New chat <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => setTourOpen(true)} data-usecases="UC_140">
            Start welcome tour
          </Button>
        </div>

        <div className="mt-6 grid gap-2 text-left text-sm text-muted-foreground">
          <div className="rounded-md border bg-background/50 p-3">
            Try: <span className="text-foreground">“Summarize this article and extract action items.”</span>
          </div>
          <div className="rounded-md border bg-background/50 p-3">
            Try: <span className="text-foreground">“Help me draft a polite follow‑up email.”</span>
          </div>
        </div>
      </Card>

      <Dialog open={tourOpen} onOpenChange={setTourOpen}>
        <DialogContent data-usecases="UC_140,UC_141,UC_142,UC_144">
          <DialogHeader>
            <DialogTitle>{steps[step]?.title}</DialogTitle>
            <DialogDescription>{steps[step]?.body}</DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-between gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              data-usecases="UC_142"
            >
              Previous
            </Button>
            <div className="text-xs text-muted-foreground">
              Step {step + 1} of {steps.length}
            </div>
            {step < steps.length - 1 ? (
              <Button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))} data-usecases="UC_142">
                Next
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setTourOpen(false);
                  setStep(0);
                }}
                data-usecases="UC_142"
              >
                Done
              </Button>
            )}
          </div>

          <div className="pt-2">
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                setTourOpen(false);
                setStep(0);
              }}
              data-usecases="UC_140"
            >
              Dismiss tour
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
