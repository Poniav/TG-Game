import Menu from "@/components/Menu";
import { useTelegramWebApp } from "@/hooks/useTelegramApp";
import { useEffect, useRef } from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { isMobile, telegramWebApp } = useTelegramWebApp();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.body.style.touchAction = "none";
    document.documentElement.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overscrollBehavior = "";
    };
  }, []);

  return (
    <div className="app-wrapper">
      <div className="app-content">
        {children}
        <Menu />
      </div>
    </div>
  );
};

export default Wrapper;
