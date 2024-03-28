class LevelProgress {
  constructor(progressWidth, padding, levelIndicatorHeight) {
    this.progressWidth = progressWidth;
    this.padding = padding;
    this.levelIndicatorHeight = levelIndicatorHeight;
    this.fillHeight = 0; 
    this.targetFillHeight = 0; 
    this.animationSpeed = 0.03; 
    this.waveFrequency = 0.02; 
    this.waveAmplitude = 10; 
    this.time = 0; 
    this.waveOffset = 0;
  }

  setProgress(progress) {
    this.targetFillHeight = progress * (height - (2 * this.padding + this.levelIndicatorHeight));
  }

  updateProgress() {
    if (this.fillHeight < this.targetFillHeight) {
      this.fillHeight += this.animationSpeed * (this.targetFillHeight - this.fillHeight);
    } else if (this.fillHeight > this.targetFillHeight) {
      this.fillHeight -= this.animationSpeed * (this.fillHeight - this.targetFillHeight);
    }
    this.time += this.animationSpeed;
  }

draw() {
    let progressBarHeight = height - (2 * this.padding + this.levelIndicatorHeight);
    let x = this.padding;
    let y = this.padding + this.levelIndicatorHeight;
    let widthWithMargin = this.progressWidth - levelIndicatorMargin;

    fill(200);
    rect(x, y, widthWithMargin, progressBarHeight);

    fill(0, 128, 255); 
    beginShape();
    for (let i = 0; i <= widthWithMargin; i++) {
        let waveOffset = sin(i * this.waveFrequency + this.time) * this.waveAmplitude;
        let liquidHeight = max(0, this.fillHeight + waveOffset);
        vertex(x + i, y + progressBarHeight - liquidHeight);
    }
    
    vertex(x + widthWithMargin, y + progressBarHeight);
    vertex(x, y + progressBarHeight);
    endShape(CLOSE);
}
}
