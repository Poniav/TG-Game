import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import Menu from "@/components/Menu";
import Wrapper from "@/lib/wrapper";
import GameScene from "@/lib/gameScene";
import GameHeader from "@/components/game/GameHeader";
import PlayButton from "@/components/game/PlayButton";
import GameOverModal from "@/components/game/GameOverModal";
import {
  loadLives,
  useLife,
  addLives,
  MAX_LIVES,
} from "@/services/livesServices";

const Game = () => {
  const gameContainer = useRef<HTMLDivElement>(null);
  const gameInstance = useRef<Phaser.Game | null>(null);
  const gameScene = useRef<GameScene | null>(null);

  // États
  const [score, setScore] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [lives, setLives] = useState<number>(MAX_LIVES);
  const [finalScore, setFinalScore] = useState<number>(0);

  // Fonction pour gérer la perte d'une vie
  const handleLoseLife = () => {
    const remainingLives = useLife();
    setLives(remainingLives);
  };

  // Initialiser le jeu
  useEffect(() => {
    if (!gameContainer.current) return;

    // Charger le nombre de vies au démarrage
    setLives(loadLives());
    
    // Fonction pour ajuster la taille du jeu au redimensionnement de la fenêtre
    const handleResize = () => {
      if (gameInstance.current) {
        gameInstance.current.scale.resize(window.innerWidth, window.innerHeight - 80);
      }
    };
    
    // Ajouter un écouteur d'événement pour le redimensionnement
    window.addEventListener('resize', handleResize);

    // Créer l'instance du jeu Phaser
    const newGame = new Phaser.Game({
      type: Phaser.CANVAS,
      width: window.innerWidth,
      height: window.innerHeight - 80, // 5rem = ~80px, ajuster la hauteur pour tenir compte du menu
      backgroundColor: "#87CEEB",
      parent: gameContainer.current,
      scene: [GameScene],
      scale: {
        mode: Phaser.Scale.FIT, // Changé à FIT pour s'assurer que le jeu reste dans le conteneur
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      render: {
        pixelArt: false,
        antialias: true,
        roundPixels: true,
      },
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 }, // Important: gravitiy y est mise à 0
          debug: true, // Activer pour voir les collisions
        },
      },
    });

    gameInstance.current = newGame;

    // Cleanup
    return () => {
      // Supprimer l'écouteur d'événement pour éviter les fuites de mémoire
      window.removeEventListener('resize', handleResize);
      
      if (gameInstance.current) {
        gameInstance.current.destroy(true);
        gameInstance.current = null;
      }
    };
  }, []);

  // Configurer les callbacks entre React et Phaser
  useEffect(() => {
    const setupScene = () => {
      if (!gameInstance.current) return;

      if (gameInstance.current.scene.scenes.length > 0) {
        // Récupérer la scène de jeu
        const scene = gameInstance.current.scene.getScene(
          "GameScene"
        ) as GameScene;
        gameScene.current = scene;

        // Configurer les callbacks
        scene.setCallbacks(
          // Callback pour mettre à jour le score
          (newScore: number) => {
            setScore(newScore);
          },
          // Callback pour la fin de partie
          (finalScore: number) => {
            console.log("Game over with score:", finalScore);
            setFinalScore(finalScore);
            setIsPlaying(false);
            setIsGameOver(true);
            handleLoseLife();
          }
        );
      } else {
        // Réessayer si la scène n'est pas encore prête
        setTimeout(setupScene, 100);
      }
    };

    // Démarrer le processus de configuration de la scène
    setupScene();
  }, []);

  // Gestionnaires d'événements
  const handlePlayButton = () => {
    if (!gameScene.current) return;

    console.log("Play button clicked");

    if (isGameOver) {
      // Réinitialiser le jeu
      gameScene.current.resetGame();
      setIsGameOver(false);
    }

    // Démarrer le jeu
    gameScene.current.startGame();
    setIsPlaying(true);
  };

  const handleRestartGame = () => {
    if (!gameScene.current) return;

    console.log("Restart game clicked");

    // Réinitialiser le jeu
    gameScene.current.resetGame();
    setIsGameOver(false);
    setIsPlaying(true);

    // Démarrer le jeu
    gameScene.current.startGame();
  };

  const handleBuyLives = () => {
    // Ajouter toutes les vies (simulé)
    const newLives = addLives();
    setLives(newLives);
    setIsGameOver(false);
  };

  return (
    <div>
      <Wrapper>
        {/* Header avec score et vies */}
        <GameHeader score={score} lives={lives} maxLives={MAX_LIVES} />

        {/* Conteneur du jeu */}
        <div
          ref={gameContainer}
          id="game-container"
          style={{
            width: "100%",
            height: "calc(100vh - 5rem)", /* Soustrait la hauteur du menu (5rem) */
            marginBottom: "5rem", /* Espace pour le menu */
          }}
        />

        {/* Bouton de démarrage (visible uniquement si pas en train de jouer) */}
        {!isPlaying && !isGameOver && <PlayButton onClick={handlePlayButton} />}

        {/* Modale de game over */}
        {isGameOver && (
          <GameOverModal
            score={finalScore}
            lives={lives}
            maxLives={MAX_LIVES}
            onRestart={handleRestartGame}
            onBuyLives={handleBuyLives}
          />
        )}
      </Wrapper>
    </div>
  );
};

export default Game;
