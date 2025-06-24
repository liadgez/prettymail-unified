import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface EmailDraft {
  to?: string;
  subject?: string;
  body: string;
}

interface GmailMessage {
  id?: string;
  threadId?: string;
  snippet?: string;
  payload?: any;
}

export const useGmail = () => {
  const { user, accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEmailMessage = ({ to = '', subject = 'Draft from PrettyMail', body }: EmailDraft): string => {
    const message = [
      `To: ${to}`,
      `Subject: ${subject}`,
      'Content-Type: text/html; charset=utf-8',
      '',
      body
    ].join('\r\n');
    
    return btoa(message)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  const createDraft = async (draftData: EmailDraft): Promise<any> => {
    if (!accessToken) {
      throw new Error('Not authenticated');
    }

    setIsLoading(true);
    setError(null);

    try {
      const encodedMessage = createEmailMessage(draftData);
      
      const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/drafts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            raw: encodedMessage
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Gmail API error: ${response.status}`);
      }

      const result = await response.json();
      
      toast({
        title: "Draft created successfully!",
        description: "Your email draft has been saved to Gmail.",
      });

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create draft';
      setError(errorMessage);
      
      toast({
        title: "Failed to create draft",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmail = async (emailData: EmailDraft): Promise<any> => {
    if (!accessToken) {
      throw new Error('Not authenticated');
    }

    setIsLoading(true);
    setError(null);

    try {
      const encodedMessage = createEmailMessage(emailData);
      
      const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          raw: encodedMessage
        }),
      });

      if (!response.ok) {
        throw new Error(`Gmail API error: ${response.status}`);
      }

      const result = await response.json();
      
      toast({
        title: "Email sent successfully!",
        description: "Your email has been sent.",
      });

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send email';
      setError(errorMessage);
      
      toast({
        title: "Failed to send email",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const listMessages = async (query = '', maxResults = 10): Promise<GmailMessage[]> => {
    if (!accessToken) {
      throw new Error('Not authenticated');
    }

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        maxResults: maxResults.toString(),
        ...(query && { q: query })
      });

      const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?${params}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Gmail API error: ${response.status}`);
      }

      const result = await response.json();
      return result.messages || [];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to list messages';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createDraft,
    sendEmail,
    listMessages,
    isLoading,
    error,
    isAuthenticated: !!accessToken,
    user
  };
};
