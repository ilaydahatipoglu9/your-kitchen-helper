import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppLayout } from "@/components/layout/AppLayout";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessage, Message, ToolInvocation } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { WelcomeScreen } from "@/components/chat/WelcomeScreen";
import { ContextPanel } from "@/components/chat/ContextPanel";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";
import { toast } from "sonner";

// Mock data for demonstration
const mockMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "Can you help me understand how React hooks work?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    role: "assistant",
    content: `React Hooks are functions that let you "hook into" React state and lifecycle features from function components. Here are the most commonly used hooks:

**useState** - Allows you to add state to functional components:
\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

**useEffect** - Lets you perform side effects in function components:
\`\`\`javascript
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);
\`\`\`

**useContext** - Subscribes to React context without nesting:
\`\`\`javascript
const theme = useContext(ThemeContext);
\`\`\`

Would you like me to explain any of these in more detail?`,
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
    model: "GPT-4",
  },
  {
    id: "3",
    role: "user",
    content: "Yes, can you show me a practical example of useEffect with cleanup?",
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
  },
  {
    id: "4",
    role: "assistant",
    content: `Here's a practical example of useEffect with cleanup - a component that subscribes to window resize events:

\`\`\`javascript
import { useState, useEffect } from 'react';

function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    // Effect: Subscribe to resize events
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup: Unsubscribe when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty deps = run once on mount

  return (
    <div>
      Window size: {size.width} x {size.height}
    </div>
  );
}
\`\`\`

The cleanup function (returned from useEffect) is crucial for:
- Preventing memory leaks
- Removing event listeners
- Canceling subscriptions
- Clearing timers

Would you like to see more examples?`,
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    model: "GPT-4",
    toolInvocations: [
      {
        id: "tool-1",
        name: "code_analyzer",
        status: "completed",
        parameters: { language: "javascript" },
        result: "Code syntax validated successfully",
      },
    ],
  },
];

export default function ChatPage() {
  const { conversationId } = useParams<{ conversationId?: string }>();
  const [messages, setMessages] = useState<Message[]>(
    conversationId ? mockMessages : []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [showContextPanel, setShowContextPanel] = useState(false);
  const [conversationTitle, setConversationTitle] = useState(
    conversationId ? "React Hooks Discussion" : "New Conversation"
  );
  const [inputValue, setInputValue] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem("onboarding_completed"));
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isNewConversation = messages.length === 0;

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Keyboard shortcut for new conversation (Cmd/Ctrl + N)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "n") {
        e.preventDefault();
        // Navigate to new conversation
        window.location.href = "/chat";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem("onboarding_completed", "true");
    toast.success("Welcome! You're all set to start chatting.");
  };

  const handleSendMessage = async (content: string, attachments?: File[]) => {
    if (!content.trim() && !attachments?.length) return;

    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response with streaming
    setTimeout(() => {
      const aiMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: generateMockResponse(content),
        timestamp: new Date(),
        model: getModelName(selectedModel),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);

      // Update conversation title if it's a new conversation
      if (isNewConversation) {
        const newTitle = content.slice(0, 50) + (content.length > 50 ? "..." : "");
        setConversationTitle(newTitle);
      }
    }, 1500);
  };

  const handleSelectPrompt = (prompt: string) => {
    setInputValue(prompt);
    // Focus the input - this would need a ref passed to ChatInput
  };

  const handleCopyMessage = (content: string) => {
    toast.success("Message copied to clipboard");
  };

  const handleRegenerateMessage = (messageId: string) => {
    toast.info("Regenerating response...");
    // Implementation would go here
  };

  const handleTitleChange = (newTitle: string) => {
    setConversationTitle(newTitle);
    toast.success("Title updated");
  };

  const handleArchive = () => {
    toast.success("Conversation archived");
  };

  const handleDelete = () => {
    toast.success("Conversation deleted");
  };

  return (
    <AppLayout>
      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />

      <div className="flex flex-col h-full">
        {/* Header */}
        <ChatHeader
          title={conversationTitle}
          onTitleChange={handleTitleChange}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          onArchive={handleArchive}
          onDelete={handleDelete}
          showContextPanel={showContextPanel}
          onToggleContextPanel={() => setShowContextPanel(!showContextPanel)}
          isNewConversation={isNewConversation}
        />

        {/* Main chat area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Messages area */}
          <div
            className={cn(
              "flex-1 flex flex-col overflow-hidden transition-all duration-300",
              showContextPanel && "lg:mr-[320px]"
            )}
          >
            {isNewConversation ? (
              <WelcomeScreen
                onSelectPrompt={handleSelectPrompt}
                userName="John"
              />
            ) : (
              <ScrollArea className="flex-1" ref={scrollAreaRef}>
                <div
                  className="max-w-chat mx-auto"
                  role="log"
                  aria-label="Chat messages"
                  aria-live="polite"
                >
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      onCopy={handleCopyMessage}
                      onRegenerate={handleRegenerateMessage}
                    />
                  ))}

                  {isLoading && (
                    <TypingIndicator modelName={getModelName(selectedModel)} />
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            )}

            {/* Input area */}
            <ChatInput
              onSend={handleSendMessage}
              isLoading={isLoading}
              modelIndicator={getModelName(selectedModel)}
              placeholder={
                isNewConversation
                  ? "Start a conversation..."
                  : "Type your message..."
              }
            />
          </div>

          {/* Context Panel */}
          <ContextPanel
            isOpen={showContextPanel}
            onClose={() => setShowContextPanel(false)}
            modelConfig={{
              temperature: 0.7,
              maxTokens: 4096,
              topP: 1,
            }}
            toolExecutions={
              messages.some((m) => m.toolInvocations?.length)
                ? [
                    {
                      id: "exec-1",
                      name: "code_analyzer",
                      timestamp: new Date(Date.now() - 1000 * 60 * 2),
                      duration: 245,
                      status: "success",
                    },
                  ]
                : []
            }
            conversationMetadata={
              !isNewConversation
                ? {
                    id: conversationId || "new",
                    createdAt: new Date(Date.now() - 1000 * 60 * 10),
                    updatedAt: new Date(),
                    messageCount: messages.length,
                    tags: ["react", "hooks", "javascript"],
                  }
                : undefined
            }
          />
        </div>
      </div>
    </AppLayout>
  );
}

function getModelName(modelId: string): string {
  const models: Record<string, string> = {
    "gpt-4": "GPT-4",
    "gpt-3.5-turbo": "GPT-3.5",
    "claude-3-opus": "Claude 3 Opus",
    "claude-3-sonnet": "Claude 3 Sonnet",
    "llama-3": "Llama 3",
  };
  return models[modelId] || modelId;
}

function generateMockResponse(userMessage: string): string {
  const responses = [
    "That's a great question! Let me explain...\n\nBased on your query, here are some key points to consider:\n\n1. **First point**: This is important because it establishes the foundation.\n\n2. **Second point**: Building on the first, this adds more context.\n\n3. **Third point**: Finally, this ties everything together.\n\nWould you like me to elaborate on any of these points?",
    "I'd be happy to help with that!\n\nHere's a code example that demonstrates the concept:\n\n```javascript\nfunction example() {\n  const result = doSomething();\n  return result;\n}\n```\n\nThis approach is commonly used because it provides clarity and maintainability. Let me know if you have any questions!",
    "Interesting question! Here's what I think:\n\nThe key insight here is understanding the underlying principles. When you approach this problem, consider:\n\n- The context and requirements\n- The trade-offs involved\n- The long-term implications\n\nIs there a specific aspect you'd like to explore further?",
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}
