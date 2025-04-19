import { createContext, useContext } from "react";
import TelegramWebApp from "@/types/tg-webapp";

export interface TelegramWebAppContextType {
  isReady: boolean;
  isMobile: boolean;
  user: {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
  } | null;
  platform: string;
  telegramWebApp: TelegramWebApp | null;
}

export const TelegramWebAppContext = createContext<
  TelegramWebAppContextType | undefined
>(undefined);

export const useTelegramWebAppContext = () => {
  const context = useContext(TelegramWebAppContext);
  if (context === undefined) {
    throw new Error(
      "useTelegramWebAppContext must be used within a TelegramWebAppProvider"
    );
  }
  return context;
};
