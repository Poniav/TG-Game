import Phaser from "phaser";
import bg from "@/assets/bg-ocean.png";
import marlin from "@/assets/marlin.png";
import rock from "@/assets/rock.png";
export default class GameScene extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite;
  obstacles: Phaser.Physics.Arcade.Group;
  score: number = 0;
  scoreText: Phaser.GameObjects.Text;
  gameSpeed: number = 200;
  spawnTimer: Phaser.Time.TimerEvent;
  username: string;
  isGameOver: boolean = false;
  bg: Phaser.GameObjects.TileSprite;

  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image("fish", marlin);
    this.load.image("obstacle", rock);
    this.load.image("background", bg);
  }

  create() {
    const widthCamera = this.cameras.main.width;
    const heightCamera = this.cameras.main.height;

    // Récupérer le nom d'utilisateur Telegram
    this.username = (window as any).telegramUsername || "Guest";

    // Créer le background adapté à l'écran
    this.bg = this.add
      .tileSprite(0, 0, widthCamera * 2, heightCamera * 2, "background")
      .setOrigin(0, 0);

    // Ajuster l'échelle du background pour qu'il couvre l'écran
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
    this.player.setCollideWorldBounds(true);

    // Ajuster la taille du poisson
    const fishScale = Math.min(widthCamera / 1280, 1) * 0.4; // Adaptation selon la taille d'écran
    this.player.setScale(fishScale);

    // Créer le groupe d'obstacles
    this.obstacles = this.physics.add.group();

    // Affichage du score
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "24px",
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 3,
    });

    // Timer pour générer des obstacles
    this.spawnTimer = this.time.addEvent({
      delay: 1500,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true,
    });

    // Collision entre le poisson et les obstacles
    this.physics.add.collider(
      this.player,
      this.obstacles,
      this.hitObstacle,
      null,
      this
    );

    // Contrôles tactiles améliorés
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
  }

  updatePlayerPosition(x: number) {
    if (this.isGameOver) return;

    // Animation fluide vers la position cible
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

    // Augmenter progressivement le score
    this.score += 0.1;
    this.scoreText.setText(`Score: ${Math.floor(this.score)}`);

    // Augmenter la difficulté avec le temps
    if (this.score > 0 && this.score % 50 === 0) {
      // Réduit à 50 pour que la difficulté augmente plus vite
      this.gameSpeed += 20;

      // Nouveau timer avec délai réduit
      this.spawnTimer.remove();
      const newDelay = Math.max(400, 1500 - Math.floor(this.score / 50) * 100);
      this.spawnTimer = this.time.addEvent({
        delay: newDelay,
        callback: this.spawnObstacle,
        callbackScope: this,
        loop: true,
      });
    }

    // Le poisson se déplace automatiquement vers le haut
    // (Pas besoin de coder ça explicitement car le fond défilant donne déjà cette impression)

    // Supprimer les obstacles qui sont sortis de l'écran
    this.obstacles.getChildren().forEach((obstacle: any) => {
      if (obstacle.y > this.cameras.main.height + obstacle.height) {
        obstacle.destroy();
      }
    });
  }

  spawnObstacle() {
    if (this.isGameOver) return;

    // Position aléatoire en largeur
    const x = Phaser.Math.Between(
      this.player.displayWidth,
      this.cameras.main.width - this.player.displayWidth
    );

    // Adapter la taille de l'obstacle à l'écran
    const gameScale = Math.min(
      this.cameras.main.width / 800,
      this.cameras.main.height / 1400
    );
    const obstacle = this.obstacles.create(x, -50, "obstacle");
    obstacle.setScale(gameScale * 0.2); // Taille encore plus réduite

    // Définir la vitesse (vers le bas de l'écran)
    obstacle.setVelocityY(this.gameSpeed);
    obstacle.setImmovable(true);
  }

  hitObstacle() {
    this.isGameOver = true;
    this.physics.pause();
    this.player.setTint(0xff0000);

    // Arrêter de générer des obstacles
    this.spawnTimer.remove();

    // Afficher Game Over
    this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "GAME OVER",
        {
          fontSize: "48px",
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 6,
        }
      )
      .setOrigin(0.5);

    // Bouton pour rejouer
    const restartButton = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 + 80,
        "Rejouer",
        {
          fontSize: "32px",
          color: "#ffffff",
          backgroundColor: "#0000aa",
          padding: { x: 20, y: 10 },
        }
      )
      .setOrigin(0.5)
      .setInteractive();

    restartButton.on("pointerdown", () => {
      this.scene.restart();
    });

    // Envoyer le score
    console.log(`Score final: ${Math.floor(this.score)} par ${this.username}`);
  }
}
