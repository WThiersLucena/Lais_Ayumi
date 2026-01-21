import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Position {
  x: number;
  y: number;
}

@Component({
  selector: 'app-snake-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snake-game.component.html',
  styleUrl: './snake-game.component.scss'
})
export class SnakeGameComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('gameCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  gridSize = 20;
  cellSize = 20;
  canvasWidth = 400;
  canvasHeight = 400;
  
  snake: Position[] = [{ x: 10, y: 10 }];
  food: Position = { x: 15, y: 15 };
  direction: 'up' | 'down' | 'left' | 'right' = 'right';
  nextDirection: 'up' | 'down' | 'left' | 'right' = 'right';
  score = 0;
  highScore = 0;
  gameRunning = false;
  gameOver = false;
  gameLoop: any;
  gameSpeed = 150; // Velocidade padrão em ms

  ngOnInit(): void {
    this.loadHighScore();
    this.calculateGameSpeed();
  }

  private calculateGameSpeed(): void {
    if (typeof window !== 'undefined') {
      // Em telas menores (mobile), reduz velocidade em 5%
      if (window.innerWidth <= 768) {
        this.gameSpeed = Math.round(150 * 1.05); // 5% mais lento = 157.5ms ≈ 158ms
      } else {
        this.gameSpeed = 150;
      }
    }
  }

  ngAfterViewInit(): void {
    // Aguarda o próximo ciclo para garantir que o canvas está disponível
    setTimeout(() => {
      if (this.canvasRef?.nativeElement) {
        this.startGame();
        this.draw();
      }
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
    }
  }

  loadHighScore(): void {
    const saved = localStorage.getItem('snake-game-highscore');
    if (saved) {
      this.highScore = parseInt(saved, 10);
    }
  }

  saveHighScore(): void {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('snake-game-highscore', this.highScore.toString());
    }
  }

  startGame(): void {
    this.snake = [{ x: 10, y: 10 }];
    this.direction = 'right';
    this.nextDirection = 'right';
    this.score = 0;
    this.gameOver = false;
    this.gameRunning = true;
    this.generateFood();
    
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
    }
    
    this.gameLoop = setInterval(() => {
      if (this.gameRunning && !this.gameOver) {
        this.move();
        this.draw();
      }
    }, this.gameSpeed);
  }

  generateFood(): void {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * this.gridSize),
        y: Math.floor(Math.random() * this.gridSize)
      };
    } while (this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    this.food = newFood;
  }

  move(): void {
    this.direction = this.nextDirection;
    const head = { ...this.snake[0] };

    switch (this.direction) {
      case 'up':
        head.y -= 1;
        break;
      case 'down':
        head.y += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'right':
        head.x += 1;
        break;
    }

    // Verifica colisão com paredes
    if (head.x < 0 || head.x >= this.gridSize || head.y < 0 || head.y >= this.gridSize) {
      this.endGame();
      return;
    }

    // Verifica colisão com o próprio corpo
    if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      this.endGame();
      return;
    }

    this.snake.unshift(head);

    // Verifica se comeu a comida
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 3;
      this.generateFood();
    } else {
      this.snake.pop();
    }
  }

  endGame(): void {
    this.gameRunning = false;
    this.gameOver = true;
    this.saveHighScore();
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.gameRunning || this.gameOver) return;

    switch (event.key) {
      case 'ArrowUp':
        if (this.direction !== 'down') {
          this.nextDirection = 'up';
        }
        event.preventDefault();
        break;
      case 'ArrowDown':
        if (this.direction !== 'up') {
          this.nextDirection = 'down';
        }
        event.preventDefault();
        break;
      case 'ArrowLeft':
        if (this.direction !== 'right') {
          this.nextDirection = 'left';
        }
        event.preventDefault();
        break;
      case 'ArrowRight':
        if (this.direction !== 'left') {
          this.nextDirection = 'right';
        }
        event.preventDefault();
        break;
    }
  }

  handleSwipe(direction: 'up' | 'down' | 'left' | 'right'): void {
    if (!this.gameRunning || this.gameOver) return;

    if (
      (direction === 'up' && this.direction !== 'down') ||
      (direction === 'down' && this.direction !== 'up') ||
      (direction === 'left' && this.direction !== 'right') ||
      (direction === 'right' && this.direction !== 'left')
    ) {
      this.nextDirection = direction;
    }
  }

  restartGame(): void {
    this.startGame();
    setTimeout(() => {
      if (this.canvasRef?.nativeElement) {
        this.draw();
      }
    }, 50);
  }

  draw(): void {
    if (!this.canvasRef) return;
    
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpa o canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenha a grade
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    for (let i = 0; i <= this.gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * this.cellSize, 0);
      ctx.lineTo(i * this.cellSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * this.cellSize);
      ctx.lineTo(canvas.width, i * this.cellSize);
      ctx.stroke();
    }

    // Desenha a comida (vermelha)
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(
      this.food.x * this.cellSize + 1,
      this.food.y * this.cellSize + 1,
      this.cellSize - 2,
      this.cellSize - 2
    );

    // Desenha a cobrinha (verde)
    ctx.fillStyle = '#4ade80';
    this.snake.forEach((segment, index) => {
      if (index === 0) {
        // Cabeça da cobrinha (um pouco mais escura)
        ctx.fillStyle = '#22c55e';
      } else {
        ctx.fillStyle = '#4ade80';
      }
      ctx.fillRect(
        segment.x * this.cellSize + 1,
        segment.y * this.cellSize + 1,
        this.cellSize - 2,
        this.cellSize - 2
      );
    });
  }
}
