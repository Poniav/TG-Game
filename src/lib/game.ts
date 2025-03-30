import Phaser from "phaser";

let score = 0;

class GameScene extends Phaser.Scene {
  private scoreText!: HTMLDivElement;

  constructor() {
    super("GameScene");
  }

  preload() {
    const svgData = `
<svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="30" fill="#f5c67a" stroke="#000" stroke-width="2"/>
  <circle cx="22" cy="24" r="4" fill="#000"/>
  <circle cx="42" cy="24" r="4" fill="#000"/>
  <path d="M24 40 Q32 48 40 40" stroke="#000" stroke-width="2" fill="none"/>
  <path d="M12 12 L22 18" stroke="#000" stroke-width="2"/>
  <path d="M52 12 L42 18" stroke="#000" stroke-width="2"/>
</svg>
`;

    const base64 = btoa(svgData);
    const dataURL = `data:image/svg+xml;base64,${base64}`;

    this.load.image("cat", dataURL);
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    const cat = this.add.image(width / 2, height / 2, "cat").setScale(0.2);
    cat.setInteractive();

    this.input.on("gameobjectdown", () => {
      score++;
      this.scoreText.textContent = `Score: ${score}`;
    });

    this.createScoreText();
  }

  createScoreText() {
    this.scoreText = document.createElement("div");
    this.scoreText.id = "score";
    this.scoreText.textContent = `Score: ${score}`;
    Object.assign(this.scoreText.style, {
      position: "absolute",
      top: "10px",
      left: "10px",
      color: "white",
      fontSize: "24px",
      background: "rgba(0,0,0,0.5)",
      padding: "5px 10px",
      borderRadius: "5px",
    });
    document.body.appendChild(this.scoreText);
  }
}

export default GameScene;
