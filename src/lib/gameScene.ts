import Phaser from "phaser";

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
    // Charger le poisson (vue du dessus)
    this.load.image("background", "/assets/background.png"); // Un fond bleu simple pour l'océan
    this.load.image("fish", "/assets/Merlin.png"); // Votre première image
    this.load.image("obstacle", "/assets/Rock.png"); // Votre seconde image (rocher)
  }

  create() {
    // Récupérer le nom d'utilisateur Telegram
    this.username = (window as any).telegramUsername || "Guest";

    // Fond d'océan (bleu)
    this.bg = this.add
      .tileSprite(
        0,
        0,
        this.cameras.main.width,
        this.cameras.main.height,
        "background"
      )
      .setOrigin(0, 0);

    // Créer le joueur (poisson)
    this.player = this.physics.add.sprite(
      this.cameras.main.width / 2,
      this.cameras.main.height - 100,
      "fish"
    );
    this.player.setCollideWorldBounds(true);

    // Ajuster la taille du poisson
    // this.player.setDisplaySize(90, 120);
    this.player.setDisplaySize(120, 150);

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

    // Contrôles pour déplacer le poisson
    this.input.on("pointermove", (pointer) => {
      if (!this.isGameOver) {
        this.player.x = Phaser.Math.Clamp(
          pointer.x,
          this.player.width / 2,
          this.cameras.main.width - this.player.width / 2
        );
      }
    });
  }

  update() {
    if (this.isGameOver) return;

    // Augmenter progressivement le score
    this.score += 0.1;
    this.scoreText.setText(`Score: ${Math.floor(this.score)}`);

    this.bg.tilePositionY -= 0.5;

    // Augmenter la difficulté avec le temps
    if (this.score > 0 && this.score % 100 === 0) {
      this.gameSpeed += 10;

      // Créer un nouveau timer avec un délai réduit
      this.spawnTimer.remove();
      const newDelay = Math.max(300, 1500 - Math.floor(this.score / 100) * 50);
      this.spawnTimer = this.time.addEvent({
        delay: newDelay,
        callback: this.spawnObstacle,
        callbackScope: this,
        loop: true,
      });
    }

    // Déplacer le poisson automatiquement vers le haut
    this.player.y -= 1;

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
    const x = Phaser.Math.Between(50, this.cameras.main.width - 50);

    // Créer l'obstacle
    const obstacle = this.obstacles.create(
      x,
      -50, // Juste au-dessus de l'écran
      "obstacle"
    );

    // Ajuster la taille
    obstacle.setDisplaySize(80, 80);

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
