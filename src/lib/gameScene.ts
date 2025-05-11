import Phaser from "phaser";
import bg from "@/assets/elements/bg-ocean.png";
import marlin from "@/assets/elements/marlin.png";
import rock from "@/assets/elements/rock.png";

export default class GameScene extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite;
  obstacles: Phaser.Physics.Arcade.Group;
  score: number = 0;
  gameSpeed: number = 200;
  spawnTimer: Phaser.Time.TimerEvent;
  username: string;
  isGameOver: boolean = false;
  bg: Phaser.GameObjects.TileSprite;
  isPlaying: boolean = false;

  // Callback pour notifier le composant React de l'état du jeu
  private onScoreChange: (score: number) => void;
  private onGameOver: (score: number) => void;

  constructor() {
    super({ key: "GameScene" });
  }

  setCallbacks(
    onScoreChange: (score: number) => void,
    onGameOver: (score: number) => void
  ) {
    this.onScoreChange = onScoreChange;
    this.onGameOver = onGameOver;
  }

  resetGame() {
    this.physics.resume();
    this.obstacles.clear(true, true);

    this.score = 0;
    this.player.clearTint();
    this.isGameOver = false;
    this.gameSpeed = 200;

    this.player.x = this.cameras.main.width / 2;
    this.player.y = this.cameras.main.height - 100;

    if (this.spawnTimer) {
      this.spawnTimer.remove();
    }

    this.spawnTimer = this.time.addEvent({
      delay: 1500,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true,
    });

    if (this.onScoreChange) {
      this.onScoreChange(0);
    }

    this.isPlaying = false;
  }

  preload() {
    this.load.image("fish", marlin);
    this.load.image("obstacle", rock);
    this.load.image("background", bg);
  }

  create() {
    const widthCamera = this.cameras.main.width;
    const heightCamera = this.cameras.main.height;

    this.username = (window as any).telegramUsername || "Guest";

    // Créer le background
    this.bg = this.add
      .tileSprite(0, 0, widthCamera * 2, heightCamera * 2, "background")
      .setOrigin(0, 0);

    this.bg.setScale(
      Math.max(widthCamera / this.bg.width, 0.1),
      Math.max(heightCamera / this.bg.height, 0.1)
    );

    // Créer le joueur (poisson)
    this.player = this.physics.add.sprite(
      widthCamera / 2,
      heightCamera - 100,
      "fish"
    );

    // Ajuster la taille du joueur
    const fishScale = Math.min(widthCamera / 1280, 1) * 0.3; // Réduction de la taille
    this.player.setScale(fishScale);

    // IMPORTANT : Ajuster la hitbox du joueur pour être plus petite
    this.player.setSize(this.player.width * 0.6, this.player.height * 0.6);
    this.player.setOffset(this.player.width * 0.2, this.player.height * 0.2);

    this.player.setCollideWorldBounds(true);

    // Créer le groupe d'obstacles
    this.obstacles = this.physics.add.group();

    // Collision entre le poisson et les obstacles
    this.physics.add.collider(
      this.player,
      this.obstacles,
      this.hitObstacle,
      null,
      this
    );

    // Contrôles tactiles
    this.input.on("pointerdown", (pointer) => {
      this.updatePlayerPosition(pointer.x);
    });

    this.input.on("pointermove", (pointer) => {
      if (pointer.isDown) {
        this.updatePlayerPosition(pointer.x);
      }
    });

    // Contrôles clavier pour les tests
    this.input.keyboard.on("keydown-LEFT", () => {
      this.player.x -= 20;
    });

    this.input.keyboard.on("keydown-RIGHT", () => {
      this.player.x += 20;
    });

    // Mettre le jeu en pause au démarrage
    this.physics.pause();
    this.isPlaying = false;

    this.spawnTimer = this.time.addEvent({
      delay: 1500,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true,
    });
  }

  updatePlayerPosition(x: number) {
    if (this.isGameOver) return;

    this.tweens.add({
      targets: this.player,
      x: Phaser.Math.Clamp(
        x,
        this.player.displayWidth / 2,
        this.cameras.main.width - this.player.displayWidth / 2
      ),
      duration: 100,
      ease: "Power2",
    });
  }

  update() {
    if (this.isGameOver) return;

    // Faire défiler le background
    this.bg.tilePositionY -= 2;

    // Augmenter progressivement le score si on joue
    if (this.isPlaying) {
      this.score += 0.1;

      if (this.onScoreChange) {
        this.onScoreChange(this.score);
      }

      // Augmenter la difficulté avec le temps
      if (
        this.score > 0 &&
        Math.floor(this.score) % 50 === 0 &&
        Math.floor(this.score) > 0
      ) {
        this.gameSpeed += 20;

        this.spawnTimer.remove();
        const newDelay = Math.max(
          400,
          1500 - Math.floor(this.score / 50) * 100
        );
        this.spawnTimer = this.time.addEvent({
          delay: newDelay,
          callback: this.spawnObstacle,
          callbackScope: this,
          loop: true,
        });
      }
    }

    // Supprimer les obstacles qui sont sortis de l'écran
    this.obstacles.getChildren().forEach((obstacle: any) => {
      if (obstacle.y > this.cameras.main.height + obstacle.height) {
        obstacle.destroy();
      }
    });
  }

  spawnObstacle() {
    if (this.isGameOver || !this.isPlaying) return;

    // Position aléatoire en largeur
    const x = Phaser.Math.Between(50, this.cameras.main.width - 50);

    // Créer l'obstacle
    const obstacle = this.obstacles.create(x, -50, "obstacle");

    // Réduire la taille visuelle de l'obstacle
    const gameScale =
      Math.min(this.cameras.main.width / 800, this.cameras.main.height / 1400) *
      0.15; // Réduire davantage la taille visuelle

    obstacle.setScale(gameScale);

    // IMPORTANT : Ajuster la hitbox de l'obstacle pour être beaucoup plus petite
    obstacle.setSize(obstacle.width * 0.5, obstacle.height * 0.5);
    obstacle.setOffset(obstacle.width * 0.25, obstacle.height * 0.25);

    // Définir la vitesse
    obstacle.setVelocityY(this.gameSpeed);
    obstacle.setImmovable(true);
  }

  hitObstacle() {
    if (this.isGameOver) return;

    this.isGameOver = true;
    this.isPlaying = false;
    this.physics.pause();
    this.player.setTint(0xff0000);

    // Arrêter de générer des obstacles
    this.spawnTimer.remove();

    // Notifier React de la fin de partie
    if (this.onGameOver) {
      this.onGameOver(Math.floor(this.score));
    }
  }

  startGame() {
    if (this.isGameOver) {
      this.resetGame();
    }

    this.physics.resume();
    this.isPlaying = true;
  }
}
