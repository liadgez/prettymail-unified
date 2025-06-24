export interface EmailDraft {
  to: string;
  subject: string;
  content: string;
  isHtml?: boolean;
}

export interface EmailMessage {
  id: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  snippet: string;
  body?: string;
}

export interface GmailProfile {
  emailAddress: string;
  messagesTotal: number;
  threadsTotal: number;
}

export interface GmailAPIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  description?: string;
  content: string;
  category: string;
  tags?: string[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailGenerationRequest {
  prompt: string;
  context?: string;
  tone?: 'professional' | 'casual' | 'friendly' | 'formal';
  length?: 'short' | 'medium' | 'long';
  template?: string;
}

export interface EmailGenerationResponse {
  subject: string;
  content: string;
  suggestions?: string[];
}
