import React from 'react';

interface ModeSelectorProps {
  currentMode: string;
  onModeSelect: (mode: string) => void;
}

const ModeSelector = ({ currentMode, onModeSelect }: ModeSelectorProps) => {
  return (
    <div className="hidden">
      {/* This component is hidden for now but can be expanded later */}
    </div>
  );
};

export default ModeSelector;
