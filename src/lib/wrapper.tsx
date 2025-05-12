import Menu from "@/components/Menu";
import { useTelegramWebApp } from "@/hooks/useTelegramApp";
import { useEffect, useRef } from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { isMobile, telegramWebApp } = useTelegramWebApp();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configuration minimale pour le défilement sans affecter Telegram
    document.body.style.overscrollBehavior = "none";
    document.documentElement.style.overscrollBehavior = "none";
    
    // Fixer pour Telegram WebApp avec des modifications minimales
    if (telegramWebApp) {
      // Maximiser l'application sans changer sa couleur
      telegramWebApp.expand();
      
      // Restaurer la fonctionnalité de défilement sans interférer avec Telegram
      const mainElement = document.querySelector('body');
      if (mainElement) {
        mainElement.style.height = '100%';
        mainElement.style.width = '100%';
        mainElement.style.overflow = 'auto';
      }
    }

    // Fonction de nettoyage
    return () => {
      document.body.style.overscrollBehavior = "";
      document.documentElement.style.overscrollBehavior = "";
      
      const mainElement = document.querySelector('body');
      if (mainElement) {
        mainElement.style.height = '';
        mainElement.style.width = '';
        mainElement.style.overflow = '';
      }
    };
  }, [telegramWebApp]);

  return (
    <div 
      className="app-wrapper" 
      style={{ 
        position: 'relative',
        minHeight: '100vh'
      }}
    >
      <div 
        ref={contentRef}
        className="app-content" 
        style={{ 
          paddingBottom: '5rem',
          position: 'relative'
        }}
      >
        {children}
        <Menu />
      </div>
    </div>
  );
};

export default Wrapper;