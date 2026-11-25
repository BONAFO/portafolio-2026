"use client";

import { useEffect, useRef, useState } from "react";
import "./Snake.css";

const GRID_SIZE = 20;
const BOARD_SIZE = 400;
const INITIAL_SNAKE = [
  { x: 8, y: 10 },
  { x: 7, y: 10 },
  { x: 6, y: 10 },
];

const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

function createFood(snake) {
  let food;

  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (
    snake.some((segment) => segment.x === food.x && segment.y === food.y)
  );

  return food;
}

function useSnakeGame() {
  const canvasRef = useRef(null);

  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 14, y: 10 });
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const snakeRef = useRef(INITIAL_SNAKE);
  const foodRef = useRef({ x: 14, y: 10 });
  const directionRef = useRef({ x: 1, y: 0 });
  const nextDirectionRef = useRef({ x: 1, y: 0 });

  function changeDirection(direction) {
    const current = directionRef.current;

    if (direction.x + current.x === 0 && direction.y + current.y === 0) {
      return;
    }

    nextDirectionRef.current = direction;
  }

  function startGame() {
    const initialFood = createFood(INITIAL_SNAKE);

    snakeRef.current = INITIAL_SNAKE;
    foodRef.current = initialFood;
    directionRef.current = { x: 1, y: 0 };
    nextDirectionRef.current = { x: 1, y: 0 };

    setSnake(INITIAL_SNAKE);
    setFood(initialFood);
    setScore(0);
    setGameOver(false);
    setStarted(true);
  }

  useEffect(() => {
    function handleKeyDown(event) {
      const direction =
        DIRECTIONS[event.key] || DIRECTIONS[event.key.toLowerCase()];

      if (!direction) return;

      event.preventDefault();
      changeDirection(direction);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!started || gameOver) return;

    const interval = setInterval(() => {
      directionRef.current = nextDirectionRef.current;

      const direction = directionRef.current;
      const currentSnake = snakeRef.current;
      const currentFood = foodRef.current;

      const head = {
        x: currentSnake[0].x + direction.x,
        y: currentSnake[0].y + direction.y,
      };

      const ateFood = head.x === currentFood.x && head.y === currentFood.y;

      const collisionBody = ateFood ? currentSnake : currentSnake.slice(0, -1);

      const hitWall =
        head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE;

      const hitSnake = collisionBody.some(
        (segment) => segment.x === head.x && segment.y === head.y,
      );

      if (hitWall || hitSnake) {
        setGameOver(true);
        return;
      }

      const newSnake = [head, ...currentSnake];

      if (!ateFood) {
        newSnake.pop();
      } else {
        const newFood = createFood(newSnake);

        foodRef.current = newFood;
        setFood(newFood);
        setScore((previous) => previous + 10);
      }

      snakeRef.current = newSnake;
      setSnake(newSnake);
    }, 115);

    return () => clearInterval(interval);
  }, [started, gameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");

    context.fillStyle = "#080d0a";
    context.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);

    // Grilla
    context.strokeStyle = "rgba(76, 175, 80, 0.10)";
    context.lineWidth = 1;

    for (let i = 0; i <= GRID_SIZE; i++) {
      const position = i * GRID_SIZE;

      context.beginPath();
      context.moveTo(position, 0);
      context.lineTo(position, BOARD_SIZE);
      context.stroke();

      context.beginPath();
      context.moveTo(0, position);
      context.lineTo(BOARD_SIZE, position);
      context.stroke();
    }

    // Comida
    context.fillStyle = "#ff4545";
    context.shadowColor = "#ff3030";
    context.shadowBlur = 12;

    context.fillRect(
      food.x * GRID_SIZE + 3,
      food.y * GRID_SIZE + 3,
      GRID_SIZE - 6,
      GRID_SIZE - 6,
    );

    context.shadowBlur = 0;

    // Culebra
    snake.forEach((segment, index) => {
      context.fillStyle = index === 0 ? "#b5ff72" : "#43dc66";
      context.shadowColor = "#39ff68";
      context.shadowBlur = index === 0 ? 12 : 5;

      context.fillRect(
        segment.x * GRID_SIZE + 2,
        segment.y * GRID_SIZE + 2,
        GRID_SIZE - 4,
        GRID_SIZE - 4,
      );
    });

    context.shadowBlur = 0;
  }, [snake, food]);

  return {
    canvasRef,
    score,
    started,
    gameOver,
    startGame,
    changeDirection,
  };
}

export function SnakeDesktop() {
  const { canvasRef, score, started, gameOver, startGame } = useSnakeGame();

  return (
    <main className="snake-game">
      <div className="snake-machine">
        <header className="snake-header">
          <div>
            <span className="snake-overline">ARCADE CLASSICS / 001</span>
            <h1>SNAKE</h1>
          </div>

          <div className="snake-score">
            <span>SCORE</span>
            <strong>{String(score).padStart(4, "0")}</strong>
          </div>
        </header>

        <div className="snake-screen">
          <canvas ref={canvasRef} width={BOARD_SIZE} height={BOARD_SIZE} />

          {(!started || gameOver) && (
            <div className="snake-overlay">
              <span className="snake-overlay-label">
                {gameOver ? "GAME OVER" : "READY PLAYER ONE"}
              </span>

              <h2>{gameOver ? "FIN DEL JUEGO" : "¿ESTÁS LISTO?"}</h2>

              <p>
                {gameOver
                  ? `PUNTUACIÓN FINAL: ${score}`
                  : "COMÉ, CRECÉ Y NO TE CHOQUES."}
              </p>

              <button onClick={startGame}>
                {gameOver ? "VOLVER A JUGAR" : "INICIAR PARTIDA"}
              </button>
            </div>
          )}
        </div>

        <footer className="snake-footer">
          <span>↑ ↓ ← → / WASD</span>
          <span>MOVE TO SURVIVE</span>
          <span>INSERT COIN TO PLAY</span>
        </footer>
      </div>
    </main>
  );
}

export function SnakeMobile() {
  const { canvasRef, score, started, gameOver, startGame, changeDirection } =
    useSnakeGame();

  return (
    <main className="snake-mobile">
      <header className="snake-mobile-header">
        <div>
          <span>ARCADE CLASSICS / 001</span>
          <h1>SNAKE</h1>
        </div>

        <div className="snake-mobile-score">
          <span>SCORE</span>
          <strong>{String(score).padStart(4, "0")}</strong>
        </div>
      </header>

      <div className="snake-mobile-screen">
        <canvas ref={canvasRef} width={BOARD_SIZE} height={BOARD_SIZE} />

        {(!started || gameOver) && (
          <div className="snake-mobile-overlay">
            <span>{gameOver ? "GAME OVER" : "READY PLAYER ONE"}</span>

            <h2>{gameOver ? "FIN DEL JUEGO" : "¿JUGAMOS?"}</h2>

            <p>
              {gameOver
                ? `PUNTUACIÓN: ${score}`
                : "COMÉ, CRECÉ Y NO TE CHOQUES."}
            </p>

            <button onClick={startGame}>
              {gameOver ? "REINTENTAR" : "INICIAR"}
            </button>
          </div>
        )}
      </div>

      <div className="snake-mobile-controls">
        <button
          aria-label="Arriba"
          onClick={() => changeDirection({ x: 0, y: -1 })}
        >
          ▲
        </button>

        <div>
          <button
            aria-label="Izquierda"
            onClick={() => changeDirection({ x: -1, y: 0 })}
          >
            ◀
          </button>

          <button
            aria-label="Abajo"
            onClick={() => changeDirection({ x: 0, y: 1 })}
          >
            ▼
          </button>

          <button
            aria-label="Derecha"
            onClick={() => changeDirection({ x: 1, y: 0 })}
          >
            ▶
          </button>
        </div>
      </div>

      <footer className="snake-mobile-footer">TOUCH TO MOVE / SURVIVE</footer>
    </main>
  );
}
