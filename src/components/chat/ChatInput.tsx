import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Paperclip, Send, Mic, Square, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string, attachments?: File[]) => void;
  disabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  modelIndicator?: string;
}

export function ChatInput({
  onSend,
  disabled = false,
  isLoading = false,
  placeholder = "Type your message...",
  modelIndicator,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim() || attachments.length > 0) {
      onSend(message.trim(), attachments.length > 0 ? attachments : undefined);
      setMessage("");
      setAttachments([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const canSend = (message.trim() || attachments.length > 0) && !disabled && !isLoading;

  return (
    <div className="border-t border-border bg-background p-4">
      <div className="max-w-chat mx-auto">
        {/* Attachments preview */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg text-sm"
              >
                <Paperclip className="h-3.5 w-3.5" />
                <span className="truncate max-w-[150px]">{file.name}</span>
                <button
                  onClick={() => removeAttachment(index)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input area */}
        <div
          className={cn(
            "flex items-end gap-2 p-2 rounded-2xl border border-input bg-background shadow-sm",
            "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            "transition-shadow duration-200"
          )}
        >
          {/* Attachment button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled || isLoading}
                data-usecases="UC_124"
              >
                <Paperclip className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Attach file</TooltipContent>
          </Tooltip>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />

          {/* Text input */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            rows={1}
            className={cn(
              "flex-1 resize-none bg-transparent border-0 outline-none",
              "text-sm placeholder:text-muted-foreground",
              "min-h-[36px] max-h-[200px] py-2",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
            aria-label="Message input"
            data-usecases="UC_122"
          />

          {/* Model indicator */}
          {modelIndicator && (
            <div className="hidden sm:flex items-center px-2 py-1 text-xs text-muted-foreground bg-muted rounded-md">
              {modelIndicator}
            </div>
          )}

          {/* Send button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className={cn(
                  "h-9 w-9 shrink-0 rounded-xl transition-all duration-200",
                  canSend
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-muted text-muted-foreground"
                )}
                onClick={handleSubmit}
                disabled={!canSend}
                data-usecases="UC_122"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isLoading ? "Generating..." : "Send message (Enter)"}
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Helper text */}
        <div className="flex items-center justify-between mt-2 px-2 text-xs text-muted-foreground">
          <span>Press Shift + Enter for new line</span>
          <span>{message.length} characters</span>
        </div>
      </div>
    </div>
  );
}
