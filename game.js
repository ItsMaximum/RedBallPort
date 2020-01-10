const gameState = {
  speed: 240,
  ups: 380,
  width: 2000,
  height: 600,
};

const config = {
  type: Phaser.AUTO,
  width: 550,
  height: 400,
  fps: {target: 60},
  backgroundColor: "518EF2",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 350 },
      enableBody: true,

    }
  },
  scene: [Level1, Level2, Level3, Level4]
};

const game = new Phaser.Game(config);
