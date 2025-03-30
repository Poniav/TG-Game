import React, { useState, useRef, useEffect } from "react";
import { chatService, type Message } from "@/services/chatService";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface ChatInterfaceProps {
  apiEndpoint?: string;
  className?: string;
  initialMessages?: Message[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  apiEndpoint,
  className,
  initialMessages = [],
}) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <div
      className={cn(
        "flex flex-col h-full max-h-[600px] rounded-xl overflow-hidden border border-gray-100 shadow-lg glass-effect",
        className
      )}
    >
      {/* Chat header */}
      <div className="p-4 border-b border-gray-100 bg-white/80">
        <h2 className="text-lg font-medium text-gray-800">Chat Assistant</h2>
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
      <div className="p-4 border-t border-gray-100 bg-white/80">
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default ChatInterface;
