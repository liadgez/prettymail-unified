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
            <h1 className="text-2xl font-bold">PrettyMail</h1>
            <p className="text-muted-foreground">Beautiful email drafts for Gmail</p>
          </div>
          <Button onClick={signIn} size="lg" className="w-full">
            <Mail className="w-4 h-4 mr-2" />
            Sign in with Google
          </Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <div className="hidden md:block">
          <ChatSidebar onQuickInsert={quickInsert} />
        </div>
        
        <SidebarInset>
          <div className="flex flex-col h-screen">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 p-4 border-b border-border bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <Mail className="w-5 h-5 text-primary" />
                <h1 className="text-lg font-semibold">PrettyMail</h1>
              </div>
              
              <div className="flex items-center gap-2">
                {user && (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.picture} />
                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground hidden sm:inline">
                      {user.email}
                    </span>
                  </div>
                )}
                <Button onClick={signOut} variant="ghost" size="sm">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="flex-1 flex flex-col md:grid md:grid-cols-1 lg:grid-cols-2 min-h-0 email-editor-container">
              {/* Input Pane */}
              <InputPane 
                content={inputContent}
                onContentChange={setInputContent}
              />
              
              {/* Preview Pane */}
              <PreviewPane 
                content={inputContent}
                previewStyle={getPreviewStyle()}
              />
            </div>

            {/* Layout Gallery */}
            <LayoutGallery
              layouts={layoutStyles}
              selectedLayout={selectedLayout}
              onLayoutSelect={setSelectedLayout}
              onLayoutHover={setHoveredLayout}
              disabled={!inputContent.trim()}
            />

            {/* Action Bar */}
            <div className="flex items-center justify-between p-4 border-t border-border bg-background">
              <div className="text-sm text-muted-foreground">
                {inputContent.trim() ? `${inputContent.trim().split(' ').length} words` : 'Start typing to enable layouts'}
              </div>
              
              <Button 
                onClick={handleCreateDraft}
                disabled={!inputContent.trim() || isCreatingDraft || gmailLoading}
                className="gap-2"
              >
                <Mail className="w-4 h-4" />
                {isCreatingDraft || gmailLoading ? 'Creating Draft...' : 'Create Gmail Draft'}
              </Button>
            </div>

            {/* Hidden Mode Selector for Future Use */}
            <div className="hidden">
              <ModeSelector currentMode="" onModeSelect={() => {}} />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default EmailDrafterInterface;
