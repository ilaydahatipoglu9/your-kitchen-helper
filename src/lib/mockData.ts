import type { Conversation, Message, Model, Tool, User } from "@/lib/types";

export const mockUser: User = {
  id: "u_1",
  name: "Marina",
  email: "marina@example.com",
  roles: ["user"],
};

export const mockModels: Model[] = [
  { id: "gpt-4o-mini", label: "GPT-4o mini", description: "Fast, balanced" },
  { id: "gpt-4.1", label: "GPT-4.1", description: "High reasoning" },
];

export const mockTools: Tool[] = [
  { id: "none", label: "No tools" },
  { id: "web", label: "Web" },
  { id: "files", label: "Files" },
];

export const mockConversations: Conversation[] = [
  {
    id: "c_1",
    title: "Trip planning: Lisbon",
    updatedAt: Date.now() - 1000 * 60 * 12,
    tags: ["travel", "itinerary"],
  },
  {
    id: "c_2",
    title: "Draft a project brief",
    updatedAt: Date.now() - 1000 * 60 * 60 * 5,
    tags: ["work"],
  },
  {
    id: "c_3",
    title: "Study notes: calculus",
    updatedAt: Date.now() - 1000 * 60 * 60 * 26,
    tags: ["school"],
  },
];

export const mockMessages: Message[] = [
  {
    id: "m_1",
    conversationId: "c_1",
    role: "user",
    content: "Plan a 3-day Lisbon itinerary with food and museums.",
    createdAt: Date.now() - 1000 * 60 * 11,
    status: "sent",
  },
  {
    id: "m_2",
    conversationId: "c_1",
    role: "assistant",
    content:
      "Absolutely. Day 1: Baixa/Chiado + Time Out Market…\n\nTell me your pace (relaxed vs packed) and any dietary preferences.",
    createdAt: Date.now() - 1000 * 60 * 10,
    status: "sent",
  },
];
