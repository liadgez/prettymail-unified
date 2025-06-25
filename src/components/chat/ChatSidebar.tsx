import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar';
import { MessageCircle, Sparkles, FileText, Briefcase } from 'lucide-react';

interface ChatSidebarProps {
  onQuickInsert?: (text: string) => void;
}

const ChatSidebar = ({ onQuickInsert }: ChatSidebarProps) => {
  const quickInserts = [
    {
      icon: <Briefcase className="w-4 h-4" />,
      label: "Business Email",
      text: "I hope this email finds you well. I wanted to reach out regarding..."
    },
    {
      icon: <MessageCircle className="w-4 h-4" />,
      label: "Follow Up",
      text: "I wanted to follow up on our previous conversation about..."
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      label: "Thank You",
      text: "Thank you for taking the time to..."
    },
    {
      icon: <FileText className="w-4 h-4" />,
      label: "Request",
      text: "I would appreciate if you could help me with..."
    }
  ];

  return (
    <Sidebar className="w-72 bg-[#1e1e1e] border-r border-white/10">
      <SidebarHeader className="p-6 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white font-system">Quick Start</h2>
        <p className="text-sm text-white/60 font-system">
          Get started with email templates
        </p>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <ScrollArea className="h-full">
          <div className="space-y-2">
            {quickInserts.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start h-auto p-3 flex-col items-start bg-[#232326] text-white font-system rounded-lg border border-white/10 hover:bg-[#232326]/80 transition-all"
                onClick={() => onQuickInsert?.(item.text)}
              >
                <div className="flex items-center gap-2 mb-1">
                  {item.icon}
                  <span className="font-medium text-white font-system">{item.label}</span>
                </div>
                <p className="text-xs text-white/60 text-left line-clamp-2 font-system">
                  {item.text}
                </p>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
};

export default ChatSidebar;
