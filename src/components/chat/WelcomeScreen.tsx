import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageSquare,
  Code,
  FileText,
  Lightbulb,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface SuggestedPrompt {
  icon: React.ReactNode;
  title: string;
  description: string;
  prompt: string;
}

const suggestedPrompts: SuggestedPrompt[] = [
  {
    icon: <Code className="h-5 w-5" />,
    title: "Write Code",
    description: "Help me write a function or debug code",
    prompt: "Help me write a function that ",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Explain Concepts",
    description: "Break down complex topics simply",
    prompt: "Explain to me how ",
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Brainstorm Ideas",
    description: "Generate creative solutions",
    prompt: "Help me brainstorm ideas for ",
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: "Draft Content",
    description: "Write emails, articles, or documents",
    prompt: "Help me write ",
  },
];

interface WelcomeScreenProps {
  onSelectPrompt: (prompt: string) => void;
  userName?: string;
}

export function WelcomeScreen({ onSelectPrompt, userName }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4 py-12">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo and greeting */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            {userName ? `Hello, ${userName}!` : "Welcome to AI Chat"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            I'm your AI assistant. I can help you with coding, writing, analysis,
            and much more. How can I assist you today?
          </p>
        </div>

        {/* Suggested prompts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {suggestedPrompts.map((prompt, index) => (
            <Card
              key={index}
              className={cn(
                "cursor-pointer transition-all duration-200",
                "hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5",
                "group"
              )}
              onClick={() => onSelectPrompt(prompt.prompt)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {prompt.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {prompt.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {prompt.description}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features highlight */}
        <div className="pt-8 border-t border-border">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">
            What I can help you with
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Code Generation",
              "Data Analysis",
              "Writing Assistance",
              "Problem Solving",
              "Learning & Education",
              "Creative Tasks",
            ].map((feature) => (
              <span
                key={feature}
                className="px-3 py-1.5 rounded-full bg-muted text-sm text-muted-foreground"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Keyboard shortcut hint */}
        <p className="text-xs text-muted-foreground">
          Press{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">
            Ctrl
          </kbd>{" "}
          +{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">
            N
          </kbd>{" "}
          to start a new conversation
        </p>
      </div>
    </div>
  );
}
