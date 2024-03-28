class LevelIndicator {
  constructor(progressWidth, levelIndicatorMargin, padding, levelIndicatorHeight) {
    this.progressWidth = progressWidth;
    this.levelIndicatorMargin = levelIndicatorMargin;
    this.padding = padding;
    this.levelIndicatorHeight = levelIndicatorHeight;
    this.level = 1; 
    this.levelImages = [];
    this.activeIndex = 0;
    this.unlockedLevels = 1; 
  }

 // Image Preload
  preload() {
    for (let i = 1; i <= 3; i++) {
      this.levelImages.push(loadImage(`assets/Level_${i}.png`));
    }
  }

  draw(currentLevel) {
    this.level = currentLevel; 
    let indicatorWidth = (width - this.progressWidth - this.padding * 2 - this.levelIndicatorMargin * 2) / 3;
    let indicatorX = this.progressWidth + this.levelIndicatorMargin + this.padding;
    let indicatorY = this.padding;

    for (let i = 0; i < 3; i++) {
      let img = this.levelImages[i];
      let circleDiameter = 60;
      let circleX = indicatorX + indicatorWidth / 2;
      let circleY = indicatorY + this.levelIndicatorHeight / 2;

    
      push();
      fill(255); 
      noStroke();
      ellipse(circleX, circleY, circleDiameter); 
      pop();

   
      let transparency = (i < currentLevel) ? 255 : 20; 


      push();
      tint(255, transparency); 
      imageMode(CENTER);
      image(img, circleX, circleY, circleDiameter - 20, circleDiameter - 20);
      pop();

     
      if (i === currentLevel - 1) {  
        push();
        noFill();
        stroke(255, 165, 0); 
        strokeWeight(4); 
        ellipse(circleX, circleY, circleDiameter); 
        pop();
      }

      indicatorX += indicatorWidth + this.levelIndicatorMargin;
    }
  }
  
  setActiveIndex(index) {
    this.activeIndex = index;
    if (index >= this.unlockedLevels) {
      this.unlockedLevels = index + 1;
    }
  }
}
