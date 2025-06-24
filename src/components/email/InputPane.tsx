import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface InputPaneProps {
  content: string;
  onContentChange: (content: string) => void;
}

const InputPane = ({ content, onContentChange }: InputPaneProps) => {
  return (
    <div className="flex flex-col h-full p-4 border-r">
      <div className="space-y-4">
        <div>
          <Label htmlFor="email-content">Email Content</Label>
          <Textarea
            id="email-content"
            placeholder="Start typing your email..."
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="min-h-[400px] resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default InputPane;
