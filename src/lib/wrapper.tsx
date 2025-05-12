import Menu from "@/components/Menu";
import { useTelegramWebApp } from "@/hooks/useTelegramApp";
import { useEffect, useRef } from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { isMobile, telegramWebApp } = useTelegramWebApp();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fix pour le comportement de défilement sur mobile
    document.body.style.position = "relative";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.body.style.overflow = "auto";
    document.body.style.touchAction = "auto";
    document.documentElement.style.overscrollBehavior = "touch";
    
    // Fixer pour Telegram WebApp
    if (telegramWebApp) {
      telegramWebApp.enableClosingConfirmation();
      telegramWebApp.expand();
      
      // Pour éviter les problèmes de défilement dans la WebApp Telegram
      telegramWebApp.onEvent('viewportChanged', () => {
        if (contentRef.current) {
          // Forcer un recalcul de la disposition
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 50);
        }
      });
    }

    return () => {
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overscrollBehavior = "";
      
      // Nettoyage des événements Telegram WebApp
      if (telegramWebApp) {
        telegramWebApp.offEvent('viewportChanged');
      }
    };
  }, []);

  return (
    <div className="app-wrapper" style={{ position: 'relative', minHeight: '100vh' }}>
      <div 
        ref={contentRef}
        className="app-content" 
        style={{ 
          paddingBottom: '5rem',
          height: '100%',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {children}
        <Menu />
      </div>
    </div>
  );
};

export default Wrapper;
