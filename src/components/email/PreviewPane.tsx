import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PreviewPaneProps {
  content: string;
  previewStyle?: string;
}

const PreviewPane = ({ content, previewStyle }: PreviewPaneProps) => {
  return (
    <div className="flex flex-col h-full p-6 bg-[#2c2c2e] rounded-b-xl">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white font-system">Preview</h3>
        <p className="text-sm text-white/60 font-system">
          See how your email will look
        </p>
      </div>
      <ScrollArea className="flex-1 border border-white/10 rounded-lg p-4 bg-[#232326]">
        <div 
          className="email-preview text-white font-system"
          style={{ 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: '1.6',
            color: '#fff',
            ...previewStyle ? { ...previewStyle } : {}
          }}
          dangerouslySetInnerHTML={{ 
            __html: content.replace(/\n/g, '<br />') || '<p class="text-white/40">Start typing to see preview...</p>'
          }}
        />
      </ScrollArea>
    </div>
  );
};

export default PreviewPane;
