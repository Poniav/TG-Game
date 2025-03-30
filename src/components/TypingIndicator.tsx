
import React from 'react';
import { cn } from '@/lib/utils';

interface TypingIndicatorProps {
  className?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ className }) => {
  return (
    <div className={cn('flex items-center space-x-1 py-2 px-3', className)}>
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-typing-dot-1"></div>
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-typing-dot-2"></div>
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-typing-dot-3"></div>
    </div>
  );
};

export default TypingIndicator;
