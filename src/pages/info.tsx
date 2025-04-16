import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import GameScene from "@/lib/gameScene";
import Menu from "@/components/Menu";
import Home from "@/components/Home";

const Info = () => {
  const [telegramData, setTelegramData] = useState<any>(null);

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
    }
  }, []);

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
      <Menu />
    </div>
  );
};

export default Info;
