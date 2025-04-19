import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import GameScene from "@/lib/gameScene";
import Menu from "@/components/Menu";
import Wrapper from "@/lib/wrapper";

const Game = () => {
  const gameContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameContainer.current) return;

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
  }, []);

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
