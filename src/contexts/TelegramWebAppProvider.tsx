import React, { ReactNode, useEffect } from "react";
import { TelegramWebAppContext } from "./TelegramWebAppContext";
import useTelegramWebAppHook from "@/hooks/useTelegramApp";

interface TelegramWebAppProviderProps {
  children: ReactNode;
}

export const TelegramWebAppProvider: React.FC<TelegramWebAppProviderProps> = ({
  children,
}) => {
  const webAppData = useTelegramWebAppHook();

  useEffect(() => {
    if (webAppData.isReady) {
      document.documentElement.classList.add(
        webAppData.isMobile ? "is-mobile" : "is-desktop"
      );
    }

    return () => {
      document.documentElement.classList.remove("is-mobile", "is-desktop");
    };
  }, [webAppData.isReady, webAppData.isMobile]);

  return (
    <TelegramWebAppContext.Provider value={webAppData}>
      {children}
    </TelegramWebAppContext.Provider>
  );
};

export default TelegramWebAppProvider;
