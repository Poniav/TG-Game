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
      let isMobile = false;
      if (tg && tg.platform) {
        if (tg.platform === "android" || tg.platform === "ios") {
          isMobile = true;
        }
      }

      return isMobile;
    };

    const updateSafeAreaVars = (tg: TelegramWebApp) => {
      if (tg.safeAreaInset) {
        document.documentElement.style.setProperty(
          "--tg-safe-area-top",
          `${tg.safeAreaInset.top}px`
        );
        document.documentElement.style.setProperty(
          "--tg-safe-area-bottom",
          `${tg.safeAreaInset.bottom}px`
        );
        document.documentElement.style.setProperty(
          "--tg-safe-area-left",
          `${tg.safeAreaInset.left}px`
        );
        document.documentElement.style.setProperty(
          "--tg-safe-area-right",
          `${tg.safeAreaInset.right}px`
        );
      }
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

      setTelegramWebApp(tg);

      tg.ready();

      const isMobileUser = checkIsMobile(tg);
      setIsMobile(isMobileUser);

      setPlatform(tg.platform || "unknown");
      setColorScheme(tg.colorScheme || "dark");

      if (isMobileUser) {
        tg.expand();
        tg.disableVerticalSwipes();
        if (tg.isVersionAtLeast("8.0")) {
          tg.requestFullscreen();
          tg.lockOrientation();
        }
        updateSafeAreaVars(tg);
      }

      if (tg.isVersionAtLeast("6.1")) {
        tg.setBackgroundColor("#000000");
        // TODO: add custom header color
        // tg.setHeaderColor("#000000");
      }

      if (tg.isVersionAtLeast("7.10")) {
        tg.setBottomBarColor("#FFFFFF");
      }

      if (tg.initDataUnsafe?.user) {
        const userData = tg.initDataUnsafe.user;

        setUser({
          id: userData.id,
          username: userData.username,
          firstName: userData.first_name,
          lastName: userData.last_name,
        });
      }

      setIsReady(true);
    };

    const handleResize = () => {
      const tg = window.Telegram?.WebApp;
      const newIsMobile = checkIsMobile(tg || null);

      setIsMobile(newIsMobile);

      if (newIsMobile && tg) {
        tg.expand();
        tg.disableVerticalSwipes();
      }
    };

    initTelegramWebApp();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isReady, isMobile, user, platform, colorScheme, telegramWebApp };
}

export default useTelegramWebApp;
