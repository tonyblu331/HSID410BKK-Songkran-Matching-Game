let cards = [];
let flippedCards = [];
let level = 1;
let numCols, numRows;
let cardWidth, cardHeight;
let matchesFound = 0; 
let canFlip = true; 
const padding = 30;
let progress = 0;
let progressWidth = 25; 
let levelIndicatorHeight = 20; 
let levelIndicatorMargin = 10;
let gameCompleted = false;
let restartButton;
let winningScreen;
let levelProgress;
let levelIndicator;
let backgroundImg;
let cardBackImg;
let waitingForTimeout = false; 

function preload() {
  // Load card and background images
  cardBackImg = loadImage("assets/Card_Back.png");
  backgroundImg = loadImage("assets/Background.jpg");

  // Preload Images
  frontImages = [];
  for (let i = 0; i < 6; i++) {
    frontImages.push(loadImage(`assets/Card_${i}.png`));
  }

  winningScreen.preload();
  levelIndicator.preload(); 
}

function setup() {
  createCanvas(900, 1000);
  textAlign(CENTER, CENTER);

  winningScreen = new WinningScreen();
  levelProgress = new LevelProgress(progressWidth, padding, levelIndicatorHeight); 
  levelIndicator = new LevelIndicator(progressWidth, levelIndicatorMargin, padding, levelIndicatorHeight);

  restartButton = createButton("Restart");
  restartButton.addClass("restart-button");
  restartButton.position(width / 2 - 40, height / 2 + 40);
  restartButton.mousePressed(restartGame);
  restartButton.hide();

  preload();
  startLevel(level);
}

function startLevel(currentLevel) {
  gameCompleted = false;
  canFlip = true; 
  restartButton.hide(); 

  const topMargin = 60;

  // Setup level based grid size
  numCols = 3 + currentLevel - 1;
  numRows = 2;

  cardWidth = (width - (numCols + 1) * padding - progressWidth) / numCols;
  cardHeight = (height - (numRows + 1) * padding - levelIndicatorHeight - topMargin) / numRows;

  cards = [];
  flippedCards = [];
  matchesFound = 0;
  progress = 0;

  // Assign pairs of cards the same id
  let pairIds = [];
  for (let i = 0; i < numCols * numRows / 2; i++) {
    pairIds.push(i, i);
  }
  shuffle(pairIds, true);

  for (let i = 0; i < numRows * numCols; i++) {
    let row = Math.floor(i / numCols);
    let col = i % numCols;
    let x = padding + col * (cardWidth + padding) + progressWidth;
    let y = padding + row * (cardHeight + padding) + levelIndicatorHeight + topMargin;
    cards.push(new Card(x, y, cardWidth, cardHeight, pairIds[i])); // Use pairIds for matching
  }

  shuffle(cards, true); // Shuffle the cards to randomize positions
}

function restartGame() {
  level = 1;
  startLevel(level);
}

function draw() {
  
  if (backgroundImg) {
    image(backgroundImg, 0, 0, width, height);
  } else {
    background(230);
  }

  // Draw the cards on the canvas
  for (let card of cards) {
    if (card.flipping) {
      card.updateFlip();
    }
    card.updateShine();
    card.display();
  }


  if (gameCompleted) {
    winningScreen.show();
    let buttonY = winningScreen.imageY + winningScreen.imageHeight / 2 + padding;
    restartButton.position(width / 2 - restartButton.width / 2, buttonY);
    restartButton.show();
  } else {

    levelProgress.setProgress(progress);
    levelProgress.updateProgress(); 
    levelProgress.draw(); 
    progress = matchesFound / (numCols * numRows);
    levelIndicator.draw(level);
  }
}

function mousePressed() {
  if (gameCompleted || !canFlip || waitingForTimeout) return;

  for (let card of cards) {
    if (card.isUnderMouse(mouseX, mouseY) && !card.flipping && !card.isFlipped) {
      card.startFlip();
      flippedCards.push(card);
      if (flippedCards.length === 2) {
        canFlip = false;
        waitingForTimeout = true; 
        setTimeout(() => {
          checkForMatch();
          canFlip = true; 
          flippedCards = []; 
          waitingForTimeout = false; 
        }, 2000); // Timeout duration
      }
      break;
    }
  }
}

function checkForMatch() {
  let match = flippedCards[0].id === flippedCards[1].id;
  if (match) {
    matchesFound += 2;
    progress = matchesFound / (numCols * numRows);

    flippedCards[0].matched = true;
    flippedCards[1].matched = true;
    flippedCards[0].startShine();
    flippedCards[1].startShine();

    if (matchesFound === numCols * numRows) {
      if (level === 3) {
        gameCompleted = true;
      } else {
        level++;
        startLevel(level);
      }
    }
  } else {
    flippedCards.forEach((card, index) => {
      if (card.isFlipped && card.flipProgress === 1) { 
        card.flipping = true; 
        card.flipProgress = 0; 
        setTimeout(() => {
          card.flipping = false; 
          if (index === flippedCards.length - 1) {
            flippedCards = [];
            canFlip = true; 
          }
        }, 500); // Delay after first flip animation
      }
    });
  }
  canFlip = true; 
}
