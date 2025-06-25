import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Mail, Settings, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import ChatSidebar from './chat/ChatSidebar';
import InputPane from './email/InputPane';
import PreviewPane from './email/PreviewPane';
import LayoutGallery from './email/LayoutGallery';
import ModeSelector from './chat/ModeSelector';
import { useAuth } from '@/contexts/AuthContext';
import { useEmailDrafter } from '@/hooks/useEmailDrafter';
import { useGmail } from '@/hooks/useGmail';

const EmailDrafterInterface = () => {
  const { user, isAuthenticated, signIn, signOut } = useAuth();
  const { createDraft, sendEmail, isLoading: gmailLoading, error } = useGmail();
  
  const {
    inputContent,
    setInputContent,
    selectedLayout,
    setSelectedLayout,
    hoveredLayout,
    setHoveredLayout,
    isCreatingDraft,
    layoutStyles,
    createGmailDraft,
    getPreviewStyle
  } = useEmailDrafter();

  // Handle window resize for full screen experience
  useEffect(() => {
    const handleResize = () => {
      // Force re-render of layout on resize
      const root = document.getElementById('root');
      if (root) {
        root.style.height = `${window.innerHeight}px`;
        root.style.width = `${window.innerWidth}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const quickInsert = (text: string) => {
    setInputContent(text);
  };

  const handleCreateDraft = async () => {
    if (!inputContent.trim() || isCreatingDraft || !isAuthenticated) {
      return;
    }
    await createGmailDraft();
  };

  // Show authentication screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold font-system text-foreground">PrettyMail</h1>
            <p className="text-muted-foreground font-system">Beautiful email drafts for Gmail</p>
          </div>
          <Button onClick={signIn} size="lg" className="w-full bg-primary text-primary-foreground font-system">
            <Mail className="w-4 h-4 mr-2" />
            Sign in with Google
          </Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        {/* Sidebar */}
        <div className="hidden md:block">
          <ChatSidebar onQuickInsert={quickInsert} />
        </div>
        {/* Main Content Area */}
        <SidebarInset className="flex-1 flex flex-col min-w-0">
          {/* Header with macOS-style blur */}
          <div className="flex items-center justify-between gap-3 p-4 border-b border-white/10 bg-[#2c2c2e]/80 backdrop-blur-apple flex-shrink-0">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="hover:bg-white/10 transition-colors text-white" />
              <Mail className="w-5 h-5 text-[#0a84ff]" />
              <h1 className="text-lg font-medium text-white font-system">Gmail Drafter</h1>
            </div>
            <Button variant="ghost" size="sm" className="hover:bg-white/10 transition-colors text-white">
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Main Content - Vertical Stack Layout */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Input Pane - Top Section */}
            <div className="flex-1 min-h-0 bg-[#2c2c2e] border-b border-white/10">
              <InputPane 
                content={inputContent}
                onContentChange={setInputContent}
              />
            </div>
            {/* Preview Pane - Bottom Section */}
            <div className="flex-1 min-h-0 bg-[#2c2c2e]">
              <PreviewPane 
                content={inputContent}
                previewStyle={getPreviewStyle()}
              />
            </div>
          </div>

          {/* Action Bar with macOS-style styling */}
          <div className="flex items-center justify-between p-4 border-t border-white/10 bg-[#2c2c2e]/80 backdrop-blur-apple flex-shrink-0">
            <div className="text-sm text-white/60 font-medium font-system">
              {inputContent.trim() ? `${inputContent.trim().split(' ').length} words` : 'Select a layout and start typing...'}
            </div>
            <Button 
              onClick={handleCreateDraft}
              disabled={!inputContent.trim() || isCreatingDraft}
              className="gap-2 bg-[#0a84ff] hover:bg-[#0a84ff]/90 text-white shadow-apple transition-all duration-200 disabled:opacity-50 font-system"
            >
              <Mail className="w-4 h-4" />
              {isCreatingDraft ? 'Creating Draft...' : 'Create Gmail Draft'}
            </Button>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default EmailDrafterInterface;
