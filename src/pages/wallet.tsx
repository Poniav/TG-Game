import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import GameScene from "@/lib/gameScene";
import Menu from "@/components/Menu";
import Home from "@/components/Home";
import useTelegramWebApp from "@/hooks/useTelegramApp";

const Wallet = () => {
  const { telegramWebApp } = useTelegramWebApp();

  useEffect(() => {
    telegramWebApp?.showAlert("test");
  }, [telegramWebApp]);

  return (
    <div>
      <h1>Wallet</h1>
      <pre>{JSON.stringify(telegramWebApp, null, 2)}</pre>
      <pre>{JSON.stringify(telegramWebApp?.platform, null, 2)}</pre>
      <Menu />
    </div>
  );
};

export default Wallet;
