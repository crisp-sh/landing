"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"

const COLOR = "#FFFFFF"
const HIT_COLOR = "#333333"
const BACKGROUND_COLOR = "#000000"
const BALL_COLOR = "#FFFFFF"
const PADDLE_COLOR = "#FFFFFF"
const LETTER_SPACING = 1
const WORD_SPACING = 4

const PIXEL_MAP = {
  P: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ],
  R: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  O: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  M: [
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
  ],
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  I: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  G: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  S: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  A: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  L: [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  Y: [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  U: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  D: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  E: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  B: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  C: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  F: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ],
  H: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  J: [
    [1, 1, 1, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  K: [
    [1, 0, 0, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
  ],
  Q: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1],
  ],
  V: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  W: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  X: [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  Z: [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  "-": [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  ".": [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
  ],
}

interface Pixel {
  x: number
  y: number
  size: number
  hit: boolean
}

interface Ball {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
}

interface Paddle {
  x: number
  y: number
  width: number
  height: number
  targetY: number
  isVertical: boolean
}

interface PromptingIsAllYouNeedProps {
  remainingBlocksToEnd?: number; // Prop to define when the game ends
}

export function PromptingIsAllYouNeed({ remainingBlocksToEnd = 5 }: PromptingIsAllYouNeedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const ballRef = useRef<Ball>({ x: 0, y: 0, dx: 0, dy: 0, radius: 0 })
  const paddlesRef = useRef<Paddle[]>([])
  const scaleRef = useRef(1)
  const [gameState, setGameState] = useState<'playing' | 'gameOver'>('playing')
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const animationFrameIdRef = useRef<number | null>(null)

  // Define initializeGame within component scope and memoize it
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const initializeGame = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return

    const scale = scaleRef.current
    const LARGE_PIXEL_SIZE = 8 * scale
    const SMALL_PIXEL_SIZE = 4 * scale
    const LINE_HEIGHT = 5; // Use a constant for pixel height of letters
    const BALL_SPEED = 6 * scale
    setGameState('playing')

    pixelsRef.current = []
    const words = ["PROMPTING", "IS ALL YOU NEED", "-  ONLYPROMPT"]

    const calculateWordWidth = (word: string, pixelSize: number) => {
      // Add safety check for undefined word
      if (typeof word !== 'string') {
        return 0;
      }
      return (
        word.split("").reduce((width, letter) => {
          const letterMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]
          const letterWidth = letterMap?.[0]?.length ?? 0
          return width + letterWidth * pixelSize + LETTER_SPACING * pixelSize
        }, 0) -
        LETTER_SPACING * pixelSize
      )
    }

    const totalWidthLarge = calculateWordWidth(words[0], LARGE_PIXEL_SIZE)
    const totalWidthSecond = calculateWordWidth(words[1], SMALL_PIXEL_SIZE); // Calculate width for the second line phrase
    const totalWidthThird = calculateWordWidth(words[2], SMALL_PIXEL_SIZE);

    // Find max width among all lines to determine scaling factor
    const maxWidth = Math.max(totalWidthLarge, totalWidthSecond, totalWidthThird);
    const scaleFactor = canvas.width > 0 ? (canvas.width * 0.8) / maxWidth : 1; // Prevent division by zero

    const adjustedLargePixelSize = Math.max(1, LARGE_PIXEL_SIZE * scaleFactor); // Ensure pixel size is at least 1
    const adjustedSmallPixelSize = Math.max(1, SMALL_PIXEL_SIZE * scaleFactor);

    const largeTextHeight = LINE_HEIGHT * adjustedLargePixelSize
    const smallTextHeight = LINE_HEIGHT * adjustedSmallPixelSize // Height for 2nd and 3rd lines
    const spaceBetweenLines = 5 * Math.max(adjustedLargePixelSize, adjustedSmallPixelSize) / 2; // Use average/max pixel size for spacing? Or just fixed value?
    const totalTextHeight = largeTextHeight + spaceBetweenLines + smallTextHeight + spaceBetweenLines + smallTextHeight; // Add height for 3rd line and spacing

    let startY = (canvas.height - totalTextHeight) / 2

    // Use for...of loops as preferred by linter
    for (const [wordIndex, word] of words.entries()) {
      // Determine pixel size and recalculate word width with adjusted size
      const pixelSize = wordIndex === 0 ? adjustedLargePixelSize : adjustedSmallPixelSize;
      const currentWordTotalWidth = calculateWordWidth(word, pixelSize);

      const startX = (canvas.width - currentWordTotalWidth) / 2

      // Handle different line structures
      if (wordIndex === 1) { // Second line potentially has multiple words
        let currentX = startX; // Use a separate tracker for X position within the line
        const subWords = word.split(" ");
        for (const [subWordIndex, subWord] of subWords.entries()) {
          for (const letter of subWord.split("")) {
            const pixelMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]
            if (!pixelMap) continue;
            const letterWidth = pixelMap[0]?.length ?? 0;

            for (let i = 0; i < LINE_HEIGHT; i++) { // Use LINE_HEIGHT
              for (let j = 0; j < letterWidth; j++) { // Use letterWidth
                if (pixelMap[i]?.[j]) { // Check bounds
                  const x = currentX + j * pixelSize
                  const y = startY + i * pixelSize
                  pixelsRef.current.push({ x, y, size: pixelSize, hit: false }) // Ensure hit is false
                }
              }
            }
            currentX += (letterWidth + LETTER_SPACING) * pixelSize;
          }
          // Add word spacing only between words, not after the last one
          if (subWordIndex < subWords.length - 1) {
              currentX += (WORD_SPACING - LETTER_SPACING) * pixelSize; // Use current pixelSize
          }
        }
      } else { // First and Third lines are treated as single words/phrases
        let currentX = startX;
        for (const letter of word.split("")) {
          const pixelMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]
          if (!pixelMap) continue;
          const letterWidth = pixelMap[0]?.length ?? 0;

          for (let i = 0; i < LINE_HEIGHT; i++) { // Use LINE_HEIGHT
            for (let j = 0; j < letterWidth; j++) { // Use letterWidth
              if (pixelMap[i]?.[j]) { // Check bounds
                const x = currentX + j * pixelSize
                const y = startY + i * pixelSize
                pixelsRef.current.push({ x, y, size: pixelSize, hit: false }) // Ensure hit is false
              }
            }
          }
           currentX += (letterWidth + LETTER_SPACING) * pixelSize;
        }
      }

      // Update startY for the next line
      if (wordIndex === 0) {
          startY += largeTextHeight + spaceBetweenLines;
      } else if (wordIndex === 1) {
          startY += smallTextHeight + spaceBetweenLines;
      }
      // No update needed after the last line
    }

    const ballStartX = canvas.width * 0.9
    const ballStartY = canvas.height * 0.1

    ballRef.current = {
      x: ballStartX,
      y: ballStartY,
      dx: -BALL_SPEED,
      dy: BALL_SPEED,
      radius: Math.max(1, adjustedLargePixelSize / 2),
    }

    const paddleWidth = Math.max(1, adjustedLargePixelSize)
    const paddleLength = Math.max(5, 10 * adjustedLargePixelSize)

    paddlesRef.current = [
      {
        x: 0,
        y: canvas.height / 2 - paddleLength / 2,
        width: paddleWidth,
        height: paddleLength,
        targetY: canvas.height / 2 - paddleLength / 2,
        isVertical: true,
      },
      {
        x: canvas.width - paddleWidth,
        y: canvas.height / 2 - paddleLength / 2,
        width: paddleWidth,
        height: paddleLength,
        targetY: canvas.height / 2 - paddleLength / 2,
        isVertical: true,
      },
      {
        x: canvas.width / 2 - paddleLength / 2,
        y: 0,
        width: paddleLength,
        height: paddleWidth,
        targetY: canvas.width / 2 - paddleLength / 2,
        isVertical: false,
      },
      {
        x: canvas.width / 2 - paddleLength / 2,
        y: canvas.height - paddleWidth,
        width: paddleLength,
        height: paddleWidth,
        targetY: canvas.width / 2 - paddleLength / 2,
        isVertical: false,
      },
    ]
  }, [remainingBlocksToEnd])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctxRef.current = ctx

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) {
        console.warn("Canvas parent not found, falling back to window size.")
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      } else {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      }

      canvas.width = Math.max(canvas.width, 100)
      canvas.height = Math.max(canvas.height, 100)

      scaleRef.current = Math.min(canvas.width / 1000, canvas.height / 1000)
      initializeGame()
    }

    const updateGame = () => {
      const ball = ballRef.current
      const paddles = paddlesRef.current
      const canvas = canvasRef.current
      if (!canvas || gameState !== 'playing') return

      ball.x += ball.dx
      ball.y += ball.dy

      if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy
      }
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx
      }

      for (const paddle of paddles) {
        if (paddle.isVertical) {
          if (
            ball.x - ball.radius < paddle.x + paddle.width &&
            ball.x + ball.radius > paddle.x &&
            ball.y > paddle.y &&
            ball.y < paddle.y + paddle.height
          ) {
            ball.dx = -ball.dx
          }
        } else {
          if (
            ball.y - ball.radius < paddle.y + paddle.height &&
            ball.y + ball.radius > paddle.y &&
            ball.x > paddle.x &&
            ball.x < paddle.x + paddle.width
          ) {
            ball.dy = -ball.dy
          }
        }
      }

      for (const paddle of paddles) {
        if (paddle.isVertical) {
          paddle.targetY = ball.y - paddle.height / 2
          paddle.targetY = Math.max(0, Math.min(canvas.height - paddle.height, paddle.targetY))
          paddle.y += (paddle.targetY - paddle.y) * 0.1
        } else {
          paddle.targetY = ball.x - paddle.width / 2
          paddle.targetY = Math.max(0, Math.min(canvas.width - paddle.width, paddle.targetY))
          paddle.x += (paddle.targetY - paddle.x) * 0.1
        }
      }

      for (const pixel of pixelsRef.current) {
        if (gameState !== 'playing') return
        if (
          !pixel.hit &&
          ball.x + ball.radius > pixel.x &&
          ball.x - ball.radius < pixel.x + pixel.size &&
          ball.y + ball.radius > pixel.y &&
          ball.y - ball.radius < pixel.y + pixel.size
        ) {
          pixel.hit = true
          const centerX = pixel.x + pixel.size / 2
          const centerY = pixel.y + pixel.size / 2
          if (Math.abs(ball.x - centerX) > Math.abs(ball.y - centerY)) {
            ball.dx = -ball.dx
          } else {
            ball.dy = -ball.dy
          }
        }
      }

      const remainingPixels = pixelsRef.current.filter(p => !p.hit).length
      if (remainingPixels <= remainingBlocksToEnd) {
        setGameState('gameOver')
      }
    }

    const drawGame = () => {
      const ctx = ctxRef.current
      const canvas = canvasRef.current
      if (!ctx || !canvas) return

      ctx.fillStyle = BACKGROUND_COLOR
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (gameState === 'playing') {
        for (const pixel of pixelsRef.current) {
          ctx.fillStyle = pixel.hit ? HIT_COLOR : COLOR
          ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
        }

        ctx.fillStyle = BALL_COLOR
        ctx.beginPath()
        ctx.arc(ballRef.current.x, ballRef.current.y, ballRef.current.radius, 0, Math.PI * 2)
        ctx.fill()

        for (const paddle of paddlesRef.current) {
          ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
        }
      } else if (gameState === 'gameOver') {
        for (const pixel of pixelsRef.current) {
          ctx.fillStyle = pixel.hit ? HIT_COLOR : COLOR
          ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
        }

        ctx.fillStyle = "red"
        ctx.font = `${60 * scaleRef.current}px 'Courier New', Courier, monospace`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2)
      }
    }

    const gameLoop = () => {
      updateGame()
      drawGame()
      animationFrameIdRef.current = requestAnimationFrame(gameLoop)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    gameLoop()

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
        animationFrameIdRef.current = null
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [initializeGame, gameState, remainingBlocksToEnd])

  const handleRestart = () => {
    initializeGame()
  }

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        aria-label="Prompting Is All You Need: Pong game with pixel text"
      />
      {gameState === 'gameOver' && (
        <button
          type="button"
          onClick={handleRestart}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors"
        >
          RESTART
        </button>
      )}
    </div>
  )
}

export default PromptingIsAllYouNeed
