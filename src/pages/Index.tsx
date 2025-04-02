import { useEffect, useRef } from "react";
import Phaser from "phaser";
import GameScene from "@/lib/game";

const Index = () => {
  const gameContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameContainer.current) return;

    const tg = (window as any).Telegram?.WebApp;
    tg?.ready();

    const user = tg?.initDataUnsafe?.user;
    const username = user?.username || user?.first_name || "Guest";

    // Stocker dans window pour l'utiliser dans Phaser ensuite
    (window as any).telegramUsername = username;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: "#87CEEB",
      parent: gameContainer.current,
      scene: [GameScene],
    });

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {typeof window !== "undefined" &&
          JSON.stringify(
            (window as any).Telegram?.WebApp?.initDataUnsafe,
            null,
            2
          )}
      </pre>
      {/* <div ref={gameContainer} id="game-container" /> */}
    </div>
  );
};

export default Index;
