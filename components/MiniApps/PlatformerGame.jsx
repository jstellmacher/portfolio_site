import React, { useEffect, useRef, useState } from 'react';

class GameObject {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Player extends GameObject {
  constructor(x, y) {
    super(x, y, 40, 40, 'blue');
    this.velocityY = 0;
    this.velocityX = 0;
    this.jumping = false;
  }

  jump() {
    if (!this.jumping) {
      this.velocityY = -15;
      this.jumping = true;
    }
  }

  update(platforms) {
    this.velocityY += 0.8; // Gravity
    this.y += this.velocityY;
    this.x += this.velocityX;

    // Check for collisions with platforms
    for (let platform of platforms) {
      if (this.isColliding(platform)) {
        if (this.velocityY > 0) {
          // Landing on a platform
          this.y = platform.y - this.height;
          this.velocityY = 0;
          this.jumping = false;
        } else if (this.velocityY < 0) {
          // Hitting a platform from below
          this.y = platform.y + platform.height;
          this.velocityY = 0;
        }
      }
    }

    // Simple ground collision
    if (this.y > 450 - this.height) {
      this.y = 450 - this.height;
      this.velocityY = 0;
      this.jumping = false;
    }
  }

  isColliding(platform) {
    return (
      this.x < platform.x + platform.width &&
      this.x + this.width > platform.x &&
      this.y < platform.y + platform.height &&
      this.y + this.height > platform.y
    );
  }
}

class GameModel {
  constructor() {
    this.player = new Player(100, 0);
    this.platforms = [
      new GameObject(0, 400, 800, 50, 'green'),
      new GameObject(200, 300, 200, 20, 'gray'),
      new GameObject(500, 200, 200, 20, 'gray'),
      new GameObject(100, 100, 200, 20, 'gray'),
    ];
    this.victoryPlatform = this.platforms[this.platforms.length - 1];
    this.hasWon = false;
  }

  update() {
    this.player.update(this.platforms);
    
    // Check for victory condition
    if (this.player.isColliding(this.victoryPlatform) && !this.hasWon) {
      this.hasWon = true;
    }
  }
}

class GameView {
  constructor(canvas, model) {
    this.ctx = canvas.getContext('2d');
    this.model = model;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.model.player.draw(this.ctx);
    for (let platform of this.model.platforms) {
      platform.draw(this.ctx);
    }

    if (this.model.hasWon) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.fillStyle = 'white';
      this.ctx.font = '48px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('You are the winner!', this.width / 2, this.height / 2);
    }
  }
}

class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.keys = {};

    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  handleKeyDown(e) {
    this.keys[e.code] = true;
  }

  handleKeyUp(e) {
    this.keys[e.code] = false;
  }

  update() {
    this.model.player.velocityX = 0;
    if (this.keys['ArrowLeft']) this.model.player.velocityX = -5;
    if (this.keys['ArrowRight']) this.model.player.velocityX = 5;
    if (this.keys['Space']) this.model.player.jump();

    this.model.update();

    // Keep player within bounds
    if (this.model.player.x < 0) this.model.player.x = 0;
    if (this.model.player.x > this.view.width - this.model.player.width) {
      this.model.player.x = this.view.width - this.model.player.width;
    }

    this.view.render();
  }
}

const PlatformerGame = () => {
  const canvasRef = useRef(null);
  const [hasWon, setHasWon] = useState(false);
  const gameRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const model = new GameModel();
    const view = new GameView(canvas, model);
    const controller = new GameController(model, view);

    gameRef.current = { model, view, controller };

    let animationFrameId;

    const gameLoop = () => {
      controller.update();
      if (model.hasWon !== hasWon) {
        setHasWon(model.hasWon);
      }
      animationFrameId = window.requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [hasWon]);

  const resetGame = () => {
    if (gameRef.current) {
      const { model, view, controller } = gameRef.current;
      model.player = new Player(100, 0);
      model.hasWon = false;
      setHasWon(false);
    }
  };

  return (
    <div className="w-full bg-gray-100 p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Platformer Game</h1>
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={450} 
          className="absolute top-0 left-0 w-full h-full border-2 border-gray-300 rounded"
        />
        {hasWon && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">You are the winner!</h2>
              <button
                onClick={resetGame}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
      <p className="mt-4 text-center text-gray-700">
        Use arrow keys to move left and right. Press space to jump.
      </p>
    </div>
  );
};

export default PlatformerGame;
