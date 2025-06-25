import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface InputPaneProps {
  content: string;
  onContentChange: (content: string) => void;
}

const InputPane = ({ content, onContentChange }: InputPaneProps) => {
  return (
    <div className="flex flex-col h-full p-6 bg-[#2c2c2e] rounded-b-xl border-r border-white/10">
      <div className="space-y-4">
        <div>
          <Label htmlFor="email-content" className="text-white font-medium font-system">Email Content</Label>
          <Textarea
            id="email-content"
            placeholder="Start typing your email..."
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="min-h-[300px] resize-none bg-[#232326] text-white font-system rounded-lg border border-white/10 focus:border-[#0a84ff] focus:ring-2 focus:ring-[#0a84ff] transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default InputPane;
