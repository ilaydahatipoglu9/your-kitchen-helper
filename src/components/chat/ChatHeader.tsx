import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Menu,
  MoreVertical,
  Edit2,
  Check,
  X,
  Archive,
  Trash2,
  Share,
  Download,
  Tag,
  PanelRightOpen,
  PanelRightClose,
} from "lucide-react";

interface AIModel {
  id: string;
  name: string;
  provider: string;
  description?: string;
}

const availableModels: AIModel[] = [
  { id: "gpt-4", name: "GPT-4", provider: "OpenAI", description: "Most capable model" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", provider: "OpenAI", description: "Fast and efficient" },
  { id: "claude-3-opus", name: "Claude 3 Opus", provider: "Anthropic", description: "Advanced reasoning" },
  { id: "claude-3-sonnet", name: "Claude 3 Sonnet", provider: "Anthropic", description: "Balanced performance" },
  { id: "llama-3", name: "Llama 3", provider: "Meta", description: "Open source" },
];

interface ChatHeaderProps {
  title: string;
  onTitleChange?: (title: string) => void;
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  onMenuClick?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  showContextPanel?: boolean;
  onToggleContextPanel?: () => void;
  isNewConversation?: boolean;
}

export function ChatHeader({
  title,
  onTitleChange,
  selectedModel,
  onModelChange,
  onMenuClick,
  onArchive,
  onDelete,
  showContextPanel,
  onToggleContextPanel,
  isNewConversation = false,
}: ChatHeaderProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleSaveTitle = () => {
    if (editedTitle.trim()) {
      onTitleChange?.(editedTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const handleCancelEdit = () => {
    setEditedTitle(title);
    setIsEditingTitle(false);
  };

  const selectedModelData = availableModels.find((m) => m.id === selectedModel);

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-9 w-9"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Title */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {isEditingTitle ? (
            <div className="flex items-center gap-2 flex-1">
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="h-8 text-lg font-semibold"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveTitle();
                  if (e.key === "Escape") handleCancelEdit();
                }}
                data-usecases="UC_046"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleSaveTitle}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleCancelEdit}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 min-w-0">
              <h2 className="text-lg font-semibold truncate">
                {isNewConversation ? "New Conversation" : title}
              </h2>
              {!isNewConversation && onTitleChange && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 hover:opacity-100"
                      onClick={() => setIsEditingTitle(true)}
                      data-usecases="UC_046"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit title</TooltipContent>
                </Tooltip>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Model Selector */}
        <Select value={selectedModel} onValueChange={onModelChange}>
          <SelectTrigger
            className="w-[180px] h-9"
            data-usecases="UC_053,UC_056"
          >
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            {availableModels.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                <div className="flex flex-col">
                  <span className="font-medium">{model.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {model.provider}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Context Panel Toggle */}
        {onToggleContextPanel && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hidden lg:flex"
                onClick={onToggleContextPanel}
              >
                {showContextPanel ? (
                  <PanelRightClose className="h-5 w-5" />
                ) : (
                  <PanelRightOpen className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {showContextPanel ? "Hide details" : "Show details"}
            </TooltipContent>
          </Tooltip>
        )}

        {/* More Options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem data-usecases="UC_048">
              <Tag className="h-4 w-4 mr-2" />
              Manage Tags
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share className="h-4 w-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Export
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onArchive} data-usecases="UC_030">
              <Archive className="h-4 w-4 mr-2" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onDelete}
              className="text-destructive"
              data-usecases="UC_029"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
