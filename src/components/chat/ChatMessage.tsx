import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Copy,
  MoreHorizontal,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Bot,
  User,
  Wrench,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  model?: string;
  toolInvocations?: ToolInvocation[];
  isStreaming?: boolean;
}

export interface ToolInvocation {
  id: string;
  name: string;
  status: "pending" | "running" | "completed" | "error";
  parameters?: Record<string, unknown>;
  result?: string;
  error?: string;
}

interface ChatMessageProps {
  message: Message;
  onCopy?: (content: string) => void;
  onRegenerate?: (messageId: string) => void;
}

export function ChatMessage({ message, onCopy, onRegenerate }: ChatMessageProps) {
  const [showActions, setShowActions] = useState(false);
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    onCopy?.(message.content);
  };

  return (
    <div
      className={cn(
        "group flex gap-4 px-4 py-6 animate-fade-up",
        isUser && "flex-row-reverse",
        isSystem && "justify-center"
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      data-usecases="UC_121"
    >
      {/* Avatar */}
      {!isSystem && (
        <div className="flex-shrink-0">
          {isUser ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-accent text-accent-foreground">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      )}

      {/* Message Content */}
      <div
        className={cn(
          "flex flex-col max-w-[80%] md:max-w-[70%]",
          isUser && "items-end",
          isSystem && "items-center max-w-full"
        )}
      >
        {/* Role label and model indicator */}
        {!isSystem && (
          <div
            className={cn(
              "flex items-center gap-2 mb-1 text-xs text-muted-foreground",
              isUser && "flex-row-reverse"
            )}
          >
            <span className="font-medium">
              {isUser ? "You" : "AI Assistant"}
            </span>
            {message.model && !isUser && (
              <span className="px-1.5 py-0.5 rounded bg-muted text-[10px]">
                {message.model}
              </span>
            )}
            <span>{formatTime(message.timestamp)}</span>
          </div>
        )}

        {/* Message bubble */}
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser && "bg-chat-user text-chat-user-foreground rounded-tr-md",
            !isUser && !isSystem && "bg-chat-ai text-chat-ai-foreground rounded-tl-md",
            isSystem && "bg-chat-system text-chat-system-foreground text-center py-2 px-4 rounded-full text-xs"
          )}
        >
          {message.isStreaming ? (
            <div className="flex items-center gap-1">
              <span>{message.content}</span>
              <span className="inline-flex gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-typing-dot" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-typing-dot" style={{ animationDelay: "200ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-typing-dot" style={{ animationDelay: "400ms" }} />
              </span>
            </div>
          ) : (
            <MessageContent content={message.content} />
          )}
        </div>

        {/* Tool Invocations */}
        {message.toolInvocations && message.toolInvocations.length > 0 && (
          <div className="mt-3 space-y-2 w-full">
            {message.toolInvocations.map((tool) => (
              <ToolInvocationCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}

        {/* Actions */}
        {!isSystem && !message.isStreaming && (
          <div
            className={cn(
              "flex items-center gap-1 mt-2 transition-opacity duration-200",
              showActions ? "opacity-100" : "opacity-0",
              isUser && "flex-row-reverse"
            )}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={handleCopy}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy</TooltipContent>
            </Tooltip>

            {!isUser && (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onRegenerate?.(message.id)}
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Regenerate</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <ThumbsUp className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Good response</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <ThumbsDown className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Bad response</TooltipContent>
                </Tooltip>
              </>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isUser ? "end" : "start"}>
                <DropdownMenuItem onClick={handleCopy}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy message
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}

function MessageContent({ content }: { content: string }) {
  // Simple markdown-like rendering for code blocks
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2">
      {parts.map((part, index) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const codeContent = part.slice(3, -3);
          const firstNewline = codeContent.indexOf("\n");
          const language = firstNewline > 0 ? codeContent.slice(0, firstNewline).trim() : "";
          const code = firstNewline > 0 ? codeContent.slice(firstNewline + 1) : codeContent;

          return (
            <pre
              key={index}
              className="bg-muted/50 rounded-lg p-3 overflow-x-auto text-xs font-mono"
            >
              {language && (
                <div className="text-[10px] text-muted-foreground mb-2 uppercase tracking-wider">
                  {language}
                </div>
              )}
              <code>{code}</code>
            </pre>
          );
        }

        return (
          <p key={index} className="whitespace-pre-wrap">
            {part}
          </p>
        );
      })}
    </div>
  );
}

function ToolInvocationCard({ tool }: { tool: ToolInvocation }) {
  const statusIcons = {
    pending: <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />,
    running: <Loader2 className="h-4 w-4 animate-spin text-primary" />,
    completed: <CheckCircle className="h-4 w-4 text-success" />,
    error: <AlertCircle className="h-4 w-4 text-destructive" />,
  };

  return (
    <div
      className="border border-tool-border bg-tool rounded-lg p-3 text-tool-foreground"
      data-usecases="UC_098,UC_099"
    >
      <div className="flex items-center gap-2">
        <Wrench className="h-4 w-4" />
        <span className="font-medium text-sm">{tool.name}</span>
        {statusIcons[tool.status]}
      </div>

      {tool.parameters && Object.keys(tool.parameters).length > 0 && (
        <div className="mt-2 text-xs">
          <span className="text-muted-foreground">Parameters: </span>
          <code className="bg-muted/30 px-1 py-0.5 rounded">
            {JSON.stringify(tool.parameters)}
          </code>
        </div>
      )}

      {tool.result && (
        <div className="mt-2 text-xs">
          <span className="text-muted-foreground">Result: </span>
          <span>{tool.result}</span>
        </div>
      )}

      {tool.error && (
        <div className="mt-2 text-xs text-destructive">
          <span className="font-medium">Error: </span>
          <span>{tool.error}</span>
        </div>
      )}
    </div>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
