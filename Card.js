class Card {
  constructor(x, y, w, h, id) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
    this.isFlipped = false;
    this.flipProgress = 0;
    this.flipping = false;
    this.backImage = cardBackImg;
    this.frontImage = frontImages[id];

    this.flipSpeed = 0.05; 
    this.matched = false; 

    this.showShine = false; 
    this.shineX = 0;
    this.shineY = -this.h; 
    this.shineSpeed = 17; 
  }
  
  isUnderMouse(mx, my) {
    return mx >= this.x && mx <= this.x + this.w && my >= this.y && my <= this.y + this.h;
  }

  startFlip() {
    if (!this.flipping && !this.isFlipped) {
      this.flipping = true;
      this.flipProgress = 0; 
    }
  }

  updateFlip() {
    if (this.flipping) {
      this.flipProgress += this.flipSpeed; 
      if (this.flipProgress >= 1) {
        this.flipProgress = 1;
        this.isFlipped = !this.isFlipped;
        this.flipping = false; 
      }
    }
  }

  startShine() {
    this.showShine = true;
    this.shineY = -this.h; 
  }

  updateShine() {
    if (!this.showShine) return;
    this.shineY += this.shineSpeed;

    if (this.shineY > this.h) {
      this.showShine = false;
      this.shineY = -this.h;
    }
  }

  display() {
    push();
    translate(this.x + this.w / 2, this.y + this.h / 2);

    noStroke();
  const mouseOver = this.isUnderMouse(mouseX, mouseY) && !this.matched;

  if (mouseOver && !this.matched) { 
    scale(1.02);
    drawingContext.shadowOffsetX = 5; 
    drawingContext.shadowOffsetY = 5;
    drawingContext.shadowBlur = 10; 
    drawingContext.shadowColor = 'rgba(0, 0, 0, 0.5)';
  }


    rectMode(CENTER);
    let flipScale = cos(PI * this.flipProgress); 
    //  Horizontal flip
    if (!this.isFlipped) {
      flipScale *= 1;
    }
    
    scale(flipScale, 1);

    // Show card back
    if (!this.isFlipped) {
      if (this.backImage) {
        imageMode(CENTER);
        image(this.backImage, 0, 0, this.w, this.h);
      } else {
        fill(150);
        rect(0, 0, this.w, this.h, 10);
      }
    } else { // Show card front
      if (this.frontImage) {
        imageMode(CENTER);
        image(this.frontImage, 0, 0, this.w, this.h);
      } else {
        fill(150);
        rect(0, 0, this.w, this.h, 10);
      }
    }

    // Shine 
    if (this.showShine) {
      // Adjust these parameters to control the width and angle of the shine
      let shineHeight = this.h * 0.05;
      let gradient = drawingContext.createLinearGradient(
        -this.w / 2 - shineHeight, this.shineY - this.h / 2 - shineHeight,
        this.w / 2 + shineHeight, this.shineY + this.h / 2 + shineHeight
      );

      // Gradient for a silverish golden shine
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)'); // Transparent start
      gradient.addColorStop(0.3, 'rgba(241, 233, 191, 0)'); // Silverish golden, starting to appear
      gradient.addColorStop(0.5, 'rgba(241, 233, 191, 0.6)'); // Silverish golden at peak brightness, lower opacity
      gradient.addColorStop(0.7, 'rgba(241, 233, 191, 0)'); // Silverish golden, fading away
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent end


      drawingContext.fillStyle = gradient;
      rectMode(CENTER);
      rect(0, 0, this.w, this.h);
    }
    
    pop();

    if (mouseOver) {
      drawingContext.shadowOffsetX = 0;
      drawingContext.shadowOffsetY = 0;
      drawingContext.shadowBlur = 0;
      drawingContext.shadowColor = 'rgba(0, 0, 0, 0)';
    }
  }

  reset() {
    this.isFlipped = false;
  }

  displayBack() {
    imageMode(CENTER);
    image(this.backImage, this.x + this.w / 2, this.y + this.h / 2, this.w, this.h);
  }
}
