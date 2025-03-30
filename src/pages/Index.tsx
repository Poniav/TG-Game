import { useEffect, useRef } from "react";
import Phaser from "phaser";
import GameScene from "@/lib/game";

const Index = () => {
  const gameContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameContainer.current) return;

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
      <div ref={gameContainer} id="game-container" />
    </div>
  );
};

export default Index;
