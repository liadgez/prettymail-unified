import { useState, useCallback } from 'react';
import { useGmail } from './useGmail';

export function useEmailDrafter() {
  const [inputContent, setInputContent] = useState('');
  const [selectedLayout, setSelectedLayout] = useState<string | null>('standard');
  const [hoveredLayout, setHoveredLayout] = useState<string | null>(null);
  const [isCreatingDraft, setIsCreatingDraft] = useState(false);
  
  const { createDraft } = useGmail();

  const layoutStyles = [
    {
      id: 'standard',
      name: 'Standard',
      description: 'Clean and professional',
      thumbnail: null
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary design',
      thumbnail: null
    }
  ];

  const createGmailDraft = useCallback(async () => {
    if (!inputContent.trim()) return;
    
    setIsCreatingDraft(true);
    try {
      await createDraft({
        to: '',
        subject: 'Draft Email',
        body: inputContent
      });
    } finally {
      setIsCreatingDraft(false);
    }
  }, [inputContent, createDraft]);

  const getPreviewStyle = useCallback(() => {
    return selectedLayout || 'standard';
  }, [selectedLayout]);

  return {
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
  };
}
