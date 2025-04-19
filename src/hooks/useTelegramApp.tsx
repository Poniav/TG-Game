import TelegramWebApp from "@/types/tg-webapp";
import { useEffect, useState } from "react";

interface TelegramWebAppHookResult {
  isReady: boolean;
  isMobile: boolean;
  user: {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
  } | null;
  platform: string;
  colorScheme: string;
  telegramWebApp: TelegramWebApp | null;
}

export function useTelegramWebApp(): TelegramWebAppHookResult {
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<TelegramWebAppHookResult["user"]>(null);
  const [platform, setPlatform] = useState<string>("");
  const [colorScheme, setColorScheme] = useState<string>("light");
  const [telegramWebApp, setTelegramWebApp] = useState<TelegramWebApp | null>(
    null
  );

  useEffect(() => {
    const checkIsMobile = (tg: TelegramWebApp | null): boolean => {
      if (tg && tg.platform) {
        if (
          tg.platform === "android" ||
          tg.platform === "ios" ||
          tg.platform === "tdesktop" ||
          tg.platform === "macos"
        ) {
          return true;
        }
      }

      const isSmallScreen = window.innerWidth <= 768;

      return isSmallScreen;
    };

    const initTelegramWebApp = () => {
      const tg = window.Telegram?.WebApp || null;

      if (!tg) {
        console.warn(
          "Telegram WebApp is not available. Running in standalone mode."
        );
        setIsReady(true);
        setIsMobile(window.innerWidth <= 768);
        setTelegramWebApp(null);
        return;
      }
      tg.showAlert(tg.platform);

      setTelegramWebApp(tg);

      tg.ready();

      const isMobileUser = checkIsMobile(tg);
      setIsMobile(isMobileUser);

      setPlatform(tg.platform || "unknown");
      setColorScheme(tg.colorScheme || "light");

      if (isMobileUser) {
        tg.expand();

        if (tg.isVersionAtLeast("8.0")) {
          tg.requestFullscreen();
        }
      }

      if (tg.isVersionAtLeast("6.1")) {
        tg.setBackgroundColor("#87CEEB");
      }

      if (tg.initDataUnsafe?.user) {
        const userData = tg.initDataUnsafe.user;

        setUser({
          id: userData.id,
          username: userData.username,
          firstName: userData.first_name,
          lastName: userData.last_name,
        });

        // (window as any).telegramUsername =
        //   userData.username || userData.first_name || "Guest";
        // (window as any).telegramUserId = userData.id;
      }

      setIsReady(true);
    };

    const handleResize = () => {
      const tg = window.Telegram?.WebApp;
      const newIsMobile = checkIsMobile(tg || null);

      setIsMobile(newIsMobile);

      if (newIsMobile && tg) {
        tg.expand();
      }
    };

    initTelegramWebApp();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isReady, isMobile, user, platform, colorScheme, telegramWebApp };
}

export default useTelegramWebApp;
