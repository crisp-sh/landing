"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface BackgroundCellsProps {
  children?: React.ReactNode;
  className?: string;
}

export const BackgroundCells = ({
  children,
  className,
}: BackgroundCellsProps) => {
  return (
    <div
      className={cn(
        "relative h-screen flex justify-center overflow-hidden",
        className
      )}
    >
      <BackgroundCellCore />
      {children && (
        <div className="relative z-50 mt-40 select-none">
          {children}
        </div>
      )}
    </div>
  );
};

const BackgroundCellCore = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  const size = 300;
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="h-full absolute inset-0"
    >
      <div className="absolute h-[20rem] inset-y-0 overflow-hidden">
        <div className="absolute h-full w-full pointer-events-none -bottom-2 z-40 bg-black [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        <div
          className="absolute inset-0 z-20 bg-transparent"
          style={{
            maskImage: `radial-gradient(${
              size / 4
            }px circle at center, white, transparent)`,
            WebkitMaskImage: `radial-gradient(${
              size / 4
            }px circle at center, white, transparent)`,
            WebkitMaskPosition: `${mousePosition.x - size / 2}px ${
              mousePosition.y - size / 2
            }px`,
            WebkitMaskSize: `${size}px`,
            maskSize: `${size}px`,
            pointerEvents: "none",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <Pattern cellClassName="border-gray-600 relative z-[100]" />
        </div>
        <Pattern className="opacity-[0.5]" cellClassName="border-gray-700" />
      </div>
    </div>
  );
};

interface PatternProps {
  className?: string;
  cellClassName?: string;
}

const Pattern = ({ className, cellClassName }: PatternProps) => {
  const x = new Array(47).fill(0);
  const y = new Array(30).fill(0);
  const matrix = x.map((_, i) => y.map((_, j) => [i, j]));
  const [clickedCell, setClickedCell] = useState<[number, number] | null>(null);

  return (
    <div className={cn("flex flex-row relative z-30", className)}>
      {matrix.map((row, rowIdx) => (
        <div
          key={`matrix-row-${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            rowIdx
          }`}
          className="flex flex-col relative z-20 border-b"
        >
          {row.map((column, colIdx) => {
            const controls = useAnimation();

            // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
            useEffect(() => {
              if (clickedCell) {
                const distance = Math.sqrt(
                  (clickedCell[0] - rowIdx) ** 2 +
                    (clickedCell[1] - colIdx) ** 2
                );
                controls.start({
                  opacity: [0, 1 - distance * 0.1, 0],
                  transition: { duration: distance * 0.2 },
                });
              }
            }, [clickedCell]);

            return (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <div
                key={`matrix-col-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  colIdx
                }`}
                className={cn(
                  "bg-transparent border-l border-b border-neutral-600",
                  cellClassName
                )}
                onClick={() => setClickedCell([rowIdx, colIdx])}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  whileHover={{
                    opacity: [0, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "backOut",
                  }}
                  animate={controls}
                  className="bg-[rgba(255,255,255,0.41)] h-12 w-12"
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
