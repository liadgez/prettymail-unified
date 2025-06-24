import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PreviewPaneProps {
  content: string;
  previewStyle?: string;
}

const PreviewPane = ({ content, previewStyle }: PreviewPaneProps) => {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Preview</h3>
        <p className="text-sm text-muted-foreground">
          See how your email will look
        </p>
      </div>
      
      <ScrollArea className="flex-1 border rounded-lg p-4 bg-background">
        <div 
          className="email-preview"
          style={{ 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: '1.6',
            color: '#333'
          }}
          dangerouslySetInnerHTML={{ 
            __html: content.replace(/\n/g, '<br />') || '<p class="text-muted-foreground">Start typing to see preview...</p>'
          }}
        />
      </ScrollArea>
    </div>
  );
};

export default PreviewPane;
