export type Role = "user" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  avatarUrl?: string;
};

export type Conversation = {
  id: string;
  title: string;
  updatedAt: number;
  tags: string[];
  archived?: boolean;
};

export type MessageRole = "user" | "assistant";

export type Attachment = {
  id: string;
  name: string;
  size: number;
  type: string;
};

export type Message = {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  createdAt: number;
  attachments?: Attachment[];
  status?: "sending" | "sent" | "error";
};

export type Model = {
  id: string;
  label: string;
  description?: string;
};

export type Tool = {
  id: string;
  label: string;
  description?: string;
};
