import { useEffect, useRef, useState } from "react";
import Home from "@/components/Home";
import Wrapper from "@/lib/wrapper";
import "@/assets/css/app.css";
const Index = () => {
  const [telegramData, setTelegramData] = useState<any>(null);

  // Effet pour initialiser Telegram WebApp et récupérer les données utilisateur
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;

    if (tg) {
      // Indiquer à Telegram que l'application est prête
      tg.ready();

      tg.expand();
      if (tg.isVersionAtLeast("8.0")) {
        tg.requestFullscreen();
      }

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
    <Wrapper>
      <Home />
    </Wrapper>
  );
};

export default Index;
