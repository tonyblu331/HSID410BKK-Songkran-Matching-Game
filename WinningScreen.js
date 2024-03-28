class WinningScreen {
  constructor() {
    this.fadeAlpha = 0;
    this.targetAlpha = 170;
    this.easing = 0.05;
    this.bounceSpeed = 0.1;
    this.bounceRange = 20;
    this.imageWidth = 600;
    this.imageHeight = 450;
    this.imageX = width / 2;
    this.imageY = height / 2;
    this.image;
  }

  preload() {
    this.image = loadImage("assets/Winning_Screen.png");
  }

  show() {
    // Fading fill overlay
    noStroke();
    fill(0, 0, 0, this.fadeAlpha);
    rect(0, 0, width, height);
    
    this.fadeAlpha = lerp(this.fadeAlpha, this.targetAlpha, this.easing);

    // Bouncing animation for the image
    this.imageY += this.bounceSpeed;
    if (this.imageY > height / 2 + this.bounceRange || this.imageY < height / 2 - this.bounceRange) {
      this.bounceSpeed *= -1;
    }

    // Draw the winning image
    imageMode(CENTER);
    image(this.image, this.imageX, this.imageY, this.imageWidth, this.imageHeight);

    // Position the restart button below the image
    restartButton.position(width / 2 - restartButton.width / 2, this.imageY + this.imageHeight / 2 + 50); // 20 is the padding below the image
    restartButton.show();
  }
}
