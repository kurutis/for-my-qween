'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Shuffle, 
  Trophy, 
  Timer, 
  Heart, 
  CheckCircle,
  Home,
  Star
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Упрощенная цветовая схема - 16 цветов
const COLORS = [
  '#FF6B6B', '#FFA726', '#FFD166', '#FFEE58',
  '#06D6A0', '#118AB2', '#073B4C', '#7209B7',
  '#F72585', '#4CC9F0', '#4361EE', '#3A0CA3',
  '#9B5DE5', '#F15BB5', '#00BBF9', '#1F2937'
];

const PUZZLE_SIZE = 4;
const EMPTY_VALUE = 0;

type PuzzleState = number[][];

export default function PuzzleGame() {
  const [puzzle, setPuzzle] = useState<PuzzleState>([]);
  const [time, setTime] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Создаем решенный пазл
  const createSolvedPuzzle = useCallback((): PuzzleState => {
    const puzzle: PuzzleState = [];
    let value = 1;
    
    for (let i = 0; i < PUZZLE_SIZE; i++) {
      puzzle[i] = [];
      for (let j = 0; j < PUZZLE_SIZE; j++) {
        if (i === PUZZLE_SIZE - 1 && j === PUZZLE_SIZE - 1) {
          puzzle[i][j] = EMPTY_VALUE;
        } else {
          puzzle[i][j] = value++;
        }
      }
    }
    
    return puzzle;
  }, []);

  // Перемешиваем пазл с гарантированной решаемостью
  const shufflePuzzle = useCallback((puzzle: PuzzleState): PuzzleState => {
    const shuffled = puzzle.map(row => [...row]);
    let emptyRow = PUZZLE_SIZE - 1;
    let emptyCol = PUZZLE_SIZE - 1;
    
    // Делаем 100 случайных, но валидных ходов
    const moves = 100;
    const directions = [
      [-1, 0], // вверх
      [1, 0],  // вниз
      [0, -1], // влево
      [0, 1]   // вправо
    ];
    
    for (let i = 0; i < moves; i++) {
      const possibleMoves = [];
      
      for (const [dx, dy] of directions) {
        const newRow = emptyRow + dx;
        const newCol = emptyCol + dy;
        
        if (newRow >= 0 && newRow < PUZZLE_SIZE && newCol >= 0 && newCol < PUZZLE_SIZE) {
          possibleMoves.push([newRow, newCol]);
        }
      }
      
      if (possibleMoves.length > 0) {
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        const [targetRow, targetCol] = possibleMoves[randomIndex];
        
        // Меняем местами с пустой клеткой
        shuffled[emptyRow][emptyCol] = shuffled[targetRow][targetCol];
        shuffled[targetRow][targetCol] = EMPTY_VALUE;
        
        emptyRow = targetRow;
        emptyCol = targetCol;
      }
    }
    
    return shuffled;
  }, []);

  // Инициализация игры
  const initGame = useCallback(() => {
    setIsLoading(true);
    
    const solvedPuzzle = createSolvedPuzzle();
    const shuffledPuzzle = shufflePuzzle(solvedPuzzle);
    
    setPuzzle(shuffledPuzzle);
    setTime(0);
    setMoves(0);
    setGameCompleted(false);
    
    setTimeout(() => setIsLoading(false), 300);
  }, [createSolvedPuzzle, shufflePuzzle]);

  // Проверка завершения игры
  useEffect(() => {
    if (puzzle.length === 0) return;
    
    const solvedPuzzle = createSolvedPuzzle();
    let isComplete = true;
    
    for (let i = 0; i < PUZZLE_SIZE; i++) {
      for (let j = 0; j < PUZZLE_SIZE; j++) {
        if (puzzle[i][j] !== solvedPuzzle[i][j]) {
          isComplete = false;
          break;
        }
      }
      if (!isComplete) break;
    }
    
    if (isComplete && !gameCompleted) {
      setGameCompleted(true);
      setTimeout(() => {
        router.push('/win');
      }, 2000);
    }
  }, [puzzle, gameCompleted, createSolvedPuzzle, router]);

  // Таймер
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!gameCompleted && puzzle.length > 0) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameCompleted, puzzle.length]);

  // Инициализация при загрузке
  useEffect(() => {
    initGame();
  }, [initGame]);

  // Находим пустую клетку
  const findEmptyCell = useCallback((): [number, number] | null => {
    for (let i = 0; i < PUZZLE_SIZE; i++) {
      for (let j = 0; j < PUZZLE_SIZE; j++) {
        if (puzzle[i][j] === EMPTY_VALUE) {
          return [i, j];
        }
      }
    }
    return null;
  }, [puzzle]);

  // Проверяем, можно ли переместить клетку
  const canMove = useCallback((row: number, col: number): boolean => {
    if (puzzle.length === 0) return false;
    
    const emptyCell = findEmptyCell();
    if (!emptyCell) return false;
    
    const [emptyRow, emptyCol] = emptyCell;
    
    // Проверяем, является ли клетка соседней с пустой
    const isAdjacent = 
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1);
    
    return isAdjacent;
  }, [puzzle, findEmptyCell]);

  // Обработка клика по клетке
  const handleCellClick = useCallback((row: number, col: number) => {
    if (puzzle[row][col] === EMPTY_VALUE || gameCompleted) return;
    
    if (canMove(row, col)) {
      const emptyCell = findEmptyCell();
      if (!emptyCell) return;
      
      const [emptyRow, emptyCol] = emptyCell;
      
      setPuzzle(prev => {
        const newPuzzle = prev.map(r => [...r]);
        
        // Меняем местами клетку и пустую
        newPuzzle[emptyRow][emptyCol] = prev[row][col];
        newPuzzle[row][col] = EMPTY_VALUE;
        
        return newPuzzle;
      });
      
      setMoves(prev => prev + 1);
    }
  }, [puzzle, gameCompleted, canMove, findEmptyCell]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Получаем размер клетки
  const getCellSize = () => {
    if (typeof window === 'undefined') return 80;
    if (window.innerWidth < 640) return 60;
    if (window.innerWidth < 768) return 70;
    if (window.innerWidth < 1024) return 80;
    return 100;
  };

  // Получаем прогресс
  const getProgress = () => {
    if (puzzle.length === 0) return 0;
    
    const solvedPuzzle = createSolvedPuzzle();
    let correctCount = 0;
    
    for (let i = 0; i < PUZZLE_SIZE; i++) {
      for (let j = 0; j < PUZZLE_SIZE; j++) {
        if (puzzle[i][j] === solvedPuzzle[i][j]) {
          correctCount++;
        }
      }
    }
    
    return correctCount;
  };

  // Получаем цвет для клетки
  const getCellColor = (value: number) => {
    if (value === EMPTY_VALUE) return COLORS[15];
    return COLORS[value - 1];
  };

  // Получаем правильную позицию клетки
  const getCorrectPosition = (value: number): [number, number] => {
    if (value === EMPTY_VALUE) {
      return [PUZZLE_SIZE - 1, PUZZLE_SIZE - 1];
    }
    const row = Math.floor((value - 1) / PUZZLE_SIZE);
    const col = (value - 1) % PUZZLE_SIZE;
    return [row, col];
  };

  // Проверяем, находится ли клетка на своем месте
  const isCellCorrect = (row: number, col: number, value: number): boolean => {
    const [correctRow, correctCol] = getCorrectPosition(value);
    return row === correctRow && col === correctCol;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-purple-900/30 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        <Link
          href="/"
          className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 hover:border-white/40 transition-colors group"
        >
          <Home className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">На главную</span>
        </Link>

        <div className="text-center mb-8">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Собери пазл
            </span>
          </motion.h1>
          <p className="text-white/60 mb-6 max-w-2xl mx-auto text-lg">
            Собери этот цветной пазл, чтобы открыть особенное поздравление!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Timer className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/60">Время</p>
                <p className="text-2xl font-bold text-white">{formatTime(time)}</p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/60">Ходы</p>
                <p className="text-2xl font-bold text-white">{moves}</p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/60">Уровень</p>
                <p className="text-2xl font-bold text-white">4×4</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-400" />
                Управление
              </h3>
              <div className="space-y-3">
                <button
                  onClick={initGame}
                  disabled={isLoading}
                  className="w-full p-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 flex items-center gap-2 justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Загрузка...</span>
                    </>
                  ) : (
                    <>
                      <Shuffle className="w-5 h-5" />
                      Перемешать заново
                    </>
                  )}
                </button>
                
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white/80 text-sm">
                    Кликай на квадратики рядом с пустой клеткой, чтобы их переместить
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-white">Правильный порядок</h3>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 16 }).map((_, i) => {
                  const value = i === 15 ? EMPTY_VALUE : i + 1;
                  const color = getCellColor(value);
                  return (
                    <div
                      key={i}
                      className="aspect-square rounded-lg flex items-center justify-center border border-white/20"
                      style={{ 
                        backgroundColor: color,
                        backgroundImage: value === EMPTY_VALUE ? 'linear-gradient(135deg, #374151, #111827)' : 'none'
                      }}
                    >
                      <span className={`font-bold ${value === EMPTY_VALUE ? 'text-gray-400' : 'text-white'} text-sm`}>
                        {value === EMPTY_VALUE ? 'пусто' : value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl border-2 border-white/10 p-6 lg:p-8">
              {isLoading ? (
                <div className="flex items-center justify-center py-32">
                  <div className="text-center">
                    <div className="w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white/60 text-lg">Готовим пазл...</p>
                  </div>
                </div>
              ) : puzzle.length === 0 ? (
                <div className="flex items-center justify-center py-32">
                  <p className="text-white/60 text-lg">Загрузка пазла...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div 
                      className="grid grid-cols-4 gap-3 lg:gap-4 bg-white/5 p-6 lg:p-8 rounded-2xl"
                      style={{
                        minWidth: 'min(100%, 500px)'
                      }}
                    >
                      {puzzle.map((row, rowIndex) => 
                        row.map((value, colIndex) => {
                          const isEmpty = value === EMPTY_VALUE;
                          const clickable = !isEmpty && !gameCompleted && canMove(rowIndex, colIndex);
                          const correct = isCellCorrect(rowIndex, colIndex, value);
                          
                          return (
                            <motion.button
                              key={`${rowIndex}-${colIndex}-${value}`}
                              layout
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2 }}
                              onClick={() => handleCellClick(rowIndex, colIndex)}
                              disabled={!clickable || gameCompleted}
                              className={`
                                flex items-center justify-center 
                                transition-all duration-300 
                                rounded-xl lg:rounded-2xl
                                relative
                                ${isEmpty
                                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 cursor-default border-2 border-dashed border-gray-600'
                                  : clickable 
                                    ? 'hover:scale-105 active:scale-95 cursor-pointer shadow-xl hover:shadow-2xl hover:brightness-110'
                                    : 'cursor-default'
                                }
                                ${correct && !isEmpty
                                  ? 'ring-2 ring-green-500 ring-opacity-50'
                                  : ''
                                }
                              `}
                              style={{
                                width: `${getCellSize()}px`,
                                height: `${getCellSize()}px`,
                                backgroundColor: isEmpty ? undefined : getCellColor(value),
                                minWidth: '60px',
                                minHeight: '60px'
                              }}
                            >
                              {!isEmpty && (
                                <span className={`font-bold text-lg lg:text-xl ${
                                  parseInt(getCellColor(value).replace('#', ''), 16) > 0x888888 
                                    ? 'text-gray-900' 
                                    : 'text-white'
                                }`}>
                                  {value}
                                </span>
                              )}
                              
                              {clickable && (
                                <div className="absolute inset-0 border-2 border-transparent hover:border-white/50 transition-colors rounded-xl lg:rounded-2xl" />
                              )}
                            </motion.button>
                          );
                        })
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-8 max-w-lg mx-auto">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/70">Прогресс</span>
                      <span className="text-white font-semibold">
                        {getProgress()} / 16
                      </span>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-500"
                        style={{
                          width: `${(getProgress() / 16) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                  
                  {gameCompleted && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-6"
                    >
                      <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 mb-3">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <span className="text-green-400 font-semibold text-lg">Пазл собран!</span>
                      </div>
                      <p className="text-white/60 text-lg">
                        Открываем особенное поздравление...
                      </p>
                      <div className="mt-4 flex justify-center">
                        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-6 lg:p-8 border border-purple-500/30">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <Heart className="w-8 h-8 text-pink-400" />
            <h3 className="text-2xl font-bold text-white">Как собрать пазл?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-cyan-400 font-bold">1</span>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Найди пустую клетку</p>
                <p className="text-white/60 text-sm">Она выглядит как серая клетка с пунктирной границей</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-purple-400 font-bold">2</span>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Кликай на соседние клетки</p>
                <p className="text-white/60 text-sm">Только клетки рядом с пустой можно переместить</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-pink-400 font-bold">3</span>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Восстанови порядок</p>
                <p className="text-white/60 text-sm">Зеленый контур показывает правильно стоящие клетки</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}