import { CodeIcon } from "lucide-react"
import { PixelCanvas } from "@/components/ui/pixel-canvas" // Assuming alias setup
import * as React from "react"; // Import React

function PixelCanvasDemo() {
  return (
    <div className="w-[300px] mx-auto">
      <button
        className="group relative w-full overflow-hidden border border-border rounded-[32px] aspect-square transition-colors duration-200 hover:border-[#0ea5e9] focus:outline-[5px] focus:outline-[Highlight]"
        style={{ "--active-color": "#0ea5e9" } as React.CSSProperties}
      >
        <PixelCanvas
          gap={10}
          speed={25}
          colors={["#e0f2fe", "#7dd3fc", "#0ea5e9"]}
          variant="icon"
          className="z-0" // Ensure canvas is behind content if needed
        />
        <div className="relative z-10 h-full w-full flex items-center justify-center">
          <CodeIcon className="w-20 h-20 text-muted-foreground transition-all duration-300 ease-out group-hover:scale-110 group-hover:text-[var(--active-color)]" />
        </div>
      </button>
    </div>
  )
}

export { PixelCanvasDemo } 