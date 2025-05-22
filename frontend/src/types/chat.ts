// frontend/types/chat.ts

export type Role = "user" | "assistant";

export interface Message {
  id: string;               //UUID o timestamp único
  role: Role;
  text: string;
  createdAt: string;        //ISO string para serializar
}

export interface ChatRequest {
  question: string;
}

export interface ChatResponse {
  answer: string;
}
