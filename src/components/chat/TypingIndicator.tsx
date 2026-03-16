import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

interface TypingIndicatorProps {
  modelName?: string;
}

export function TypingIndicator({ modelName }: TypingIndicatorProps) {
  return (
    <div className="flex gap-4 px-4 py-6 animate-fade-up" data-usecases="UC_123">
      <div className="flex-shrink-0">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-accent text-accent-foreground">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
          <span className="font-medium">AI Assistant</span>
          {modelName && (
            <span className="px-1.5 py-0.5 rounded bg-muted text-[10px]">
              {modelName}
            </span>
          )}
          <span>is typing</span>
        </div>

        <div className="bg-chat-ai text-chat-ai-foreground rounded-2xl rounded-tl-md px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full bg-current animate-typing-dot"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-2 h-2 rounded-full bg-current animate-typing-dot"
              style={{ animationDelay: "200ms" }}
            />
            <span
              className="w-2 h-2 rounded-full bg-current animate-typing-dot"
              style={{ animationDelay: "400ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
