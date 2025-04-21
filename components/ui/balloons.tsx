import * as React from "react"
import { cn } from "@/lib/utils"
import { balloons, textBalloons } from "balloons-js"

// Define the text balloon config type
interface TextBalloonConfig {
  text: string;
  color: string;
  fontSize: number;
}

// Define the dark colors
const darkBalloonColors = ["#111827", "#1F2937", "#374151", "#4B5563", "#6B7280"];

export interface BalloonsProps extends React.RefAttributes<HTMLDivElement> {
  type?: "default" | "text"
  text?: string
  fontSize?: number
  color?: string
  className?: string
  onLaunch?: () => void
}

const Balloons = React.forwardRef<
  { launchAnimation: () => void },
  BalloonsProps
>(
  (
    {
      type = "default",
      text,
      fontSize = 120,
      color = "#000000",
      className,
      onLaunch,
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null)

    const launchAnimation = React.useCallback(() => {
      // Use textBalloons with dark colors for type="default"
      if (type === "default") {
        // Call the original default balloons function from the library
        balloons();
      } else if (type === "text" && text) {
        textBalloons([
          {
            text,
            fontSize,
            color,
          },
        ])
      }

      if (onLaunch) {
        onLaunch()
      }
    }, [type, text, fontSize, color, onLaunch])

    // Экспортируем метод запуска анимации
    React.useImperativeHandle(
      ref,
      () => ({
        launchAnimation,
      }),
      [launchAnimation],
    )

    // We need a container div for the library to potentially attach to,
    // even if it ends up attaching to the body.
    // Let's keep it minimal and not render anything visible.
    return (
      <div
        ref={containerRef}
        className={cn("balloons-container hidden", className)}
        aria-hidden="true"
      />
    )
  },
)
Balloons.displayName = "Balloons"

export { Balloons } 