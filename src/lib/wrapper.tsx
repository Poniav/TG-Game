import Menu from "@/components/Menu";
import { useTelegramWebApp } from "@/hooks/useTelegramApp";
import { useEffect, useRef } from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { isMobile, telegramWebApp } = useTelegramWebApp();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.position = "relative";
    document.body.style.width = "100%";
    document.body.style.height = "auto";
    document.body.style.touchAction = "auto";
    document.documentElement.style.overscrollBehavior = "auto";

    return () => {
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overscrollBehavior = "";
    };
  }, []);

  return (
    <div className="app-wrapper" style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="app-content" style={{ paddingBottom: '5rem' }}>
        {children}
        <Menu />
      </div>
    </div>
  );
};

export default Wrapper;
