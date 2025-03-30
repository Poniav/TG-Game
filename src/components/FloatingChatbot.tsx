import React, { useState, useRef, useEffect } from "react";
import { chatService, type Message } from "@/services/chatService";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { MessageCircle, X, Bot } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface FloatingChatbotProps {
  apiEndpoint?: string;
  className?: string;
  initialMessages?: Message[];
}

const FloatingChatbot: React.FC<FloatingChatbotProps> = ({
  apiEndpoint,
  className,
  initialMessages = [],
}) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      content:
        "👋 Bonjour ! Je suis Bugali Assistant. Comment puis-je vous aider aujourd'hui ?",
      role: "bot",
      timestamp: new Date(),
    },
    ...initialMessages,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Configure the API endpoint if provided
  useEffect(() => {
    if (apiEndpoint) {
      chatService.setBaseUrl(apiEndpoint);
    }
  }, [apiEndpoint]);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message to the chat
    const userMessage: Message = {
      id: chatService.generateId(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send the message to the backend
      const response = await chatService.sendMessage(content);

      // Add bot response to the chat
      const botMessage: Message = {
        id: response.id || chatService.generateId(),
        content: response.answer,
        role: "bot",
        timestamp: new Date(),
      };

      // Add a small delay to make the interaction feel more natural
      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);

      toast({
        title: "Message failed to send",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating button when chat is closed */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
          onClick={toggleChat}
        >
          <Bot className="w-6 h-6" />
        </motion.button>
      )}

      {/* Chat interface when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.25 }}
            className={cn(
              "flex flex-col w-[350px] h-[500px] rounded-2xl overflow-hidden border border-gray-100 shadow-xl glass-effect",
              className
            )}
          >
            {/* Chat header */}
            <div className="p-4 border-b border-gray-100 bg-blue-600 text-white flex items-center justify-between">
              <h2 className="text-lg font-medium">Bugali Assistant</h2>
              <button
                onClick={toggleChat}
                className="text-white hover:bg-blue-700 rounded-full p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 chat-scrollbar bg-gray-50/50">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400 text-sm">
                    Send a message to start the conversation
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-chat-bot rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm">
                        <TypingIndicator />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Chat input */}
            <div className="p-3 border-t border-gray-100 bg-white/80">
              <ChatInput
                onSendMessage={handleSendMessage}
                disabled={isLoading}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingChatbot;
