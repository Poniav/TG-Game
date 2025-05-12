import Menu from "@/components/Menu";
import { useTelegramWebApp } from "@/hooks/useTelegramApp";
import { useEffect, useRef } from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { isMobile, telegramWebApp } = useTelegramWebApp();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mettre à jour le CSS pour empêcher le comportement de roulage/pull-to-refresh
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      html, body {
        overscroll-behavior: none !important;
        touch-action: pan-x pan-y !important;
        height: 100% !important;
        width: 100% !important;
        position: fixed !important;
        overflow: auto !important;
      }
      #root {
        height: 100% !important;
        width: 100% !important;
        overflow: auto !important;
      }
    `;
    document.head.appendChild(styleElement);

    // Intercepter les événements de défilement pour éviter la rétraction
    const preventSwipeDown = (e: TouchEvent) => {
      // Empêcher le comportement de swipe down qui rétracte l'app
      if (document.scrollingElement && document.scrollingElement.scrollTop <= 0 && e.touches) {
        e.preventDefault();
      }
    };
    
    // Ajouter les gestionnaires d'événements
    document.addEventListener('touchstart', preventSwipeDown, { passive: false });
    document.addEventListener('touchmove', preventSwipeDown, { passive: false });
    
    // Fixer pour Telegram WebApp
    if (telegramWebApp) {
      // Empêcher l'application de se rétracter
      telegramWebApp.disableClosingConfirmation();
      telegramWebApp.expand(); // Étendre l'app à sa taille maximale
      telegramWebApp.setBackgroundColor("#ffffff");
      
      // Désactiver le gesture de retour qui fait se rétracter l'app
      if (telegramWebApp.BackButton) {
        telegramWebApp.BackButton.hide();
      }
      
      // Intercepter les événements de viewport changed pour maintenir l'expansion
      const handleViewportChanged = () => {
        if (telegramWebApp) {
          telegramWebApp.expand();
        }
      };
      
      if (telegramWebApp.onEvent) {
        telegramWebApp.onEvent('viewportChanged', handleViewportChanged);
      }
    }

    // Fonction de nettoyage
    return () => {
      // Supprimer l'élément de style
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
      
      // Supprimer les écouteurs d'événements
      document.removeEventListener('touchstart', preventSwipeDown);
      document.removeEventListener('touchmove', preventSwipeDown);
      
      // Nettoyage des événements Telegram WebApp
      if (telegramWebApp && telegramWebApp.offEvent) {
        telegramWebApp.offEvent('viewportChanged');
      }
    };
  }, [telegramWebApp]);

  return (
    <div 
      className="app-wrapper" 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        width: '100%',
        overflow: 'hidden'
      }}
    >
      <div 
        ref={contentRef}
        className="app-content" 
        style={{ 
          height: '100%',
          width: '100%',
          paddingBottom: '5rem',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
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