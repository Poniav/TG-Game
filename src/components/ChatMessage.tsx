
import React from 'react';
import { cn } from '@/lib/utils';
import { type Message } from '@/services/chatService';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        'flex mb-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-2xl py-3 px-4 break-words',
          isUser 
            ? 'bg-chat-user text-gray-800 rounded-tr-sm ml-auto' 
            : 'bg-white text-gray-800 rounded-tl-sm mr-auto border border-gray-100 shadow-sm',
          !isUser && 'border-l-4 border-l-chat-primary'
        )}
      >
        <p className="text-sm md:text-base">{message.content}</p>
        <div 
          className={cn(
            'text-xs text-gray-500 mt-1',
            isUser ? 'text-right' : 'text-left'
          )}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
