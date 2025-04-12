import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import GameScene from "@/lib/gameScene";

const Index = () => {
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
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: "#87CEEB",
      parent: gameContainer.current,
      scene: [GameScene],
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 300 },
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
      {/* Affichage des données Telegram (à supprimer en production) */}
      {/* <pre
        style={{
          whiteSpace: "pre-wrap",
          backgroundColor: "#f5f5f5",
          padding: "10px",
          fontSize: "12px",
          maxHeight: "200px",
          overflow: "auto",
          marginBottom: "10px",
        }}
      >
        {telegramData
          ? JSON.stringify(telegramData, null, 2)
          : "❌ Aucune donnée Telegram reçue. Lance bien l'app depuis un bouton WebApp dans Telegram."}
      </pre> */}

      {/* Conteneur du jeu */}
      <div
        ref={gameContainer}
        id="game-container"
        style={{
          width: "100%",
          height: "calc(100vh - 20px)", // Utiliser presque toute la hauteur de l'écran
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
};

export default Index;
