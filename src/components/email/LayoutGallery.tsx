import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Layout {
  id: string;
  name: string;
  description: string;
  thumbnail: React.ReactNode;
}

interface LayoutGalleryProps {
  layouts: Layout[];
  selectedLayout: string | null;
  onLayoutSelect: (layoutId: string) => void;
  onLayoutHover: (layoutId: string | null) => void;
  disabled?: boolean;
}

const LayoutGallery = ({ 
  layouts, 
  selectedLayout, 
  onLayoutSelect, 
  onLayoutHover, 
  disabled 
}: LayoutGalleryProps) => {
  const defaultLayouts = [
    {
      id: 'standard',
      name: 'Standard',
      description: 'Clean and professional',
      thumbnail: (
        <div className="w-full h-8 bg-gradient-to-r from-blue-100 to-blue-200 rounded flex items-center justify-center">
          <div className="w-6 h-1 bg-blue-500 rounded"></div>
        </div>
      )
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary design',
      thumbnail: (
        <div className="w-full h-8 bg-gradient-to-r from-purple-100 to-purple-200 rounded flex items-center justify-center">
          <div className="w-6 h-1 bg-purple-500 rounded"></div>
        </div>
      )
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and clean',
      thumbnail: (
        <div className="w-full h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded flex items-center justify-center">
          <div className="w-6 h-1 bg-gray-500 rounded"></div>
        </div>
      )
    }
  ];

  const activeLayouts = layouts.length > 0 ? layouts : defaultLayouts;

  return (
    <div className="border-t p-4">
      <div className="mb-3">
        <h3 className="text-sm font-medium">Email Layouts</h3>
        <p className="text-xs text-muted-foreground">
          Choose a style for your email
        </p>
      </div>
      
      <div className="flex gap-2 overflow-x-auto">
        {activeLayouts.map((layout) => (
          <Button
            key={layout.id}
            variant={selectedLayout === layout.id ? "default" : "outline"}
            size="sm"
            disabled={disabled}
            className="flex-shrink-0 h-auto p-3 flex flex-col items-center gap-2 min-w-[100px]"
            onClick={() => onLayoutSelect(layout.id)}
            onMouseEnter={() => onLayoutHover(layout.id)}
            onMouseLeave={() => onLayoutHover(null)}
          >
            {layout.thumbnail}
            <div className="text-center">
              <div className="text-xs font-medium">{layout.name}</div>
              <div className="text-xs text-muted-foreground">{layout.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LayoutGallery;
