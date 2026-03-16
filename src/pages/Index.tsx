import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Bot, User } from "lucide-react";
import { OnboardingModal } from "../components/OnboardingModal";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function Index() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: "This is a simulated response from the Oceanic AI Assistant. I am ready to help you with your tasks." }
      ]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full relative">
      <OnboardingModal />
      {/* Chat Feed */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8" data-usecases="UC_121">
        <div className="max-w-[800px] mx-auto space-y-6 pb-32">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full mt-20 text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Bot size={40} />
              </div>
              <h2 className="text-3xl font-bold text-foreground">How can I help you today?</h2>
              <p className="text-muted-foreground max-w-md">
                I'm your Oceanic AI Assistant. I can help you write code, analyze data, or answer complex questions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mt-8">
                {[
                  "Explain quantum computing in simple terms",
                  "Write a Python script to scrape a website",
                  "How do I optimize a React application?",
                  "Summarize the latest news in AI"
                ].map((prompt, i) => (
                  <button 
                    key={i}
                    onClick={() => setInput(prompt)}
                    className="p-4 text-left border border-border rounded-xl hover:bg-secondary hover:border-primary/50 transition-all text-sm text-foreground/80"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0 mt-1">
                    <Bot size={16} />
                  </div>
                )}
                <div 
                  className={`px-5 py-3.5 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm ${
                    msg.role === "user" 
                      ? "bg-secondary text-secondary-foreground rounded-tr-sm" 
                      : "bg-card text-card-foreground border border-border rounded-tl-sm"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground shrink-0 mt-1">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))
          )}

          {isTyping && (
            <div className="flex gap-4 animate-in fade-in">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0 mt-1">
                <Bot size={16} />
              </div>
              <div className="px-5 py-4 rounded-2xl bg-card border border-border rounded-tl-sm flex items-center gap-1">
                <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent pt-10 pb-6 px-4 md:px-8">
        <div className="max-w-[800px] mx-auto relative">
          <form 
            onSubmit={handleSend}
            className="relative flex items-end gap-2 bg-card border border-border rounded-2xl p-2 shadow-lg focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent transition-all"
            data-usecases="UC_122"
          >
            <button 
              type="button" 
              className="p-3 text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-secondary shrink-0"
              data-usecases="UC_124"
              title="Attach File"
            >
              <Paperclip size={20} />
            </button>
            
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              placeholder="Message Oceanic AI..."
              className="w-full max-h-32 min-h-[44px] bg-transparent border-none focus:outline-none resize-none py-3 text-sm"
              rows={1}
            />
            
            <button 
              type="submit" 
              disabled={!input.trim()}
              className="p-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <Send size={18} />
            </button>
          </form>
          <div className="text-center mt-2 text-xs text-muted-foreground">
            AI can make mistakes. Consider verifying important information.
          </div>
        </div>
      </div>
    </div>
  );
}
