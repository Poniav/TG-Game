import { env } from "../env";
export interface Message {
  id: string;
  content: string;
  role: "user" | "bot";
  timestamp: Date;
}

export interface ChatResponse {
  answer: string;
  id: string;
}

class ChatService {
  private baseUrl: string;

  constructor(baseUrl: string = "/api/chat") {
    this.baseUrl = baseUrl;
  }

  /**
   * Sends a message to the backend API and returns the response
   */
  async sendMessage(message: string): Promise<ChatResponse> {
    try {
      // Here you would replace this with your actual API endpoint
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.VITE_ADMIN_API_KEY,
        },
        body: JSON.stringify({ question: message }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    }
  }

  /**
   * Configure the base URL for the chat service
   */
  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  /**
   * Generate a unique ID for messages
   */
  generateId(): string {
    return Math.random().toString(36).substring(2, 11);
  }
}

// Export a singleton instance
export const chatService = new ChatService();
