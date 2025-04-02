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

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    tg?.ready();

    const user = tg?.initDataUnsafe?.user;

    if (user) {
      // Envoie les infos à Webhook.site
      fetch("https://webhook.site/4949a2aa-ba38-477a-9683-c4cfcf8887df", {
        method: "POST",
        body: JSON.stringify({
          telegram_id: user.id,
          username: user.username,
          full: tg.initDataUnsafe,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }, []);

  return (
    <div>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          backgroundColor: "#f5f5f5",
          padding: "10px",
        }}
      >
        {typeof window !== "undefined" &&
        (window as any).Telegram?.WebApp?.initDataUnsafe
          ? JSON.stringify(
              (window as any).Telegram.WebApp.initDataUnsafe,
              null,
              2
            )
          : "❌ Aucune donnée Telegram reçue. Lance bien l'app depuis un bouton WebApp dans Telegram."}
      </pre>
      {/* <div ref={gameContainer} id="game-container" /> */}
    </div>
  );
};

export default Index;
