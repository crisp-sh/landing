"use client"

import * as React from "react"

// Define the Pixel class first
class Pixel {
  width: number
  height: number
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  color: string
  speed: number
  size: number
  sizeStep: number
  minSize: number
  maxSizeInteger: number
  maxSize: number
  delay: number
  counter: number
  counterStep: number
  isIdle: boolean
  isReverse: boolean
  isShimmer: boolean

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number,
  ) {
    this.width = canvas.width
    this.height = canvas.height
    this.ctx = context
    this.x = x
    this.y = y
    this.color = color
    this.speed = this.getRandomValue(0.1, 0.9) * speed
    this.size = 0
    this.sizeStep = Math.random() * 0.4
    this.minSize = 0.5
    this.maxSizeInteger = 2
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger)
    this.delay = delay
    this.counter = 0
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01
    this.isIdle = false
    this.isReverse = false
    this.isShimmer = false
  }

  getRandomValue(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5
    this.ctx.fillStyle = this.color
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size,
    )
  }

  appear() {
    this.isIdle = false

    if (this.counter <= this.delay) {
      this.counter += this.counterStep
      return
    }

    if (this.size >= this.maxSize) {
      this.isShimmer = true
    }

    if (this.isShimmer) {
      this.shimmer()
    } else {
      this.size += this.sizeStep
    }

    this.draw()
  }

  disappear() {
    this.isShimmer = false
    this.counter = 0

    if (this.size <= 0) {
      this.isIdle = true
      return
    }
    this.size -= 0.1

    this.draw()
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true
    } else if (this.size <= this.minSize) {
      this.isReverse = false
    }

    if (this.isReverse) {
      this.size -= this.speed
    } else {
      this.size += this.speed
    }
  }
}

// Define the custom element class
class PixelCanvasElement extends HTMLElement {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D | null
  private pixels: Pixel[] = []
  private animation: number | null = null
  private timeInterval = 1000 / 60
  private timePrevious: number = performance.now()
  private reducedMotion: boolean
  private _initialized: boolean = false
  private _resizeObserver: ResizeObserver | null = null
  private _parent: Element | null = null

  constructor() {
    super()
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.reducedMotion = typeof window !== 'undefined' && window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    const shadow = this.attachShadow({ mode: "open" })
    const style = document.createElement("style")
    style.textContent = `
      :host {
        display: grid;
        inline-size: 100%;
        block-size: 100%;
        overflow: hidden;
      }
    `
    shadow.appendChild(style)
    shadow.appendChild(this.canvas)
  }

  static get observedAttributes() {
    return ["data-colors", "data-gap", "data-speed", "data-variant"];
  }

  attributeChangedCallback() {
    // Re-initialize pixels if attributes change after initial setup
    if (this._initialized) {
        requestAnimationFrame(() => {
            this.handleResize();
        });
    }
  }

  get colors() {
    return this.dataset.colors?.split(",") || ["#f8fafc", "#f1f5f9", "#cbd5e1"]
  }

  get gap() {
    const value = Number(this.dataset.gap) || 5
    return Math.max(4, Math.min(50, value))
  }

  get speed() {
    const value = Number(this.dataset.speed) || 35
    return this.reducedMotion ? 0 : Math.max(0, Math.min(100, value)) * 0.001
  }

  get noFocus() {
    return this.hasAttribute("data-no-focus")
  }

  get variant() {
    return this.dataset.variant || "default"
  }

  connectedCallback() {
    if (this._initialized) return
    this._initialized = true
    this._parent = this.parentElement

    requestAnimationFrame(() => {
      this.handleResize()

      const ro = new ResizeObserver((entries) => {
        if (!entries.length) return
        requestAnimationFrame(() => this.handleResize())
      })
      ro.observe(this)
      this._resizeObserver = ro
    })

    this._parent?.addEventListener("mouseenter", this.handleMouseEnter)
    this._parent?.addEventListener("mouseleave", this.handleMouseLeave)

    if (!this.noFocus) {
      this._parent?.addEventListener("focus", this.handleFocus, { capture: true })
      this._parent?.addEventListener("blur", this.handleBlur, { capture: true })
    }
  }

  disconnectedCallback() {
    this._initialized = false
    this._resizeObserver?.disconnect()

    this._parent?.removeEventListener("mouseenter", this.handleMouseEnter)
    this._parent?.removeEventListener("mouseleave", this.handleMouseLeave)

    if (!this.noFocus) {
      this._parent?.removeEventListener("focus", this.handleFocus)
      this._parent?.removeEventListener("blur", this.handleBlur)
    }

    if (this.animation) {
      cancelAnimationFrame(this.animation)
      this.animation = null
    }

    this._parent = null
  }

  // Bind methods to avoid issues with `this`
  handleMouseEnter = () => this.handleAnimation("appear");
  handleMouseLeave = () => this.handleAnimation("disappear");
  handleFocus = () => this.handleAnimation("appear");
  handleBlur = () => this.handleAnimation("disappear");


  handleResize() {
    if (!this.ctx || !this._initialized) return

    const rect = this.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return

    const width = Math.floor(rect.width)
    const height = Math.floor(rect.height)

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    this.canvas.width = width * dpr
    this.canvas.height = height * dpr
    this.canvas.style.width = `${width}px`
    this.canvas.style.height = `${height}px`

    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    this.ctx.scale(dpr, dpr)

    this.createPixels()
  }

  getDistanceToCenter(x: number, y: number) {
    // Use logical dimensions for distance calculation
    const logicalWidth = this.canvas.width / (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);
    const logicalHeight = this.canvas.height / (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);
    const dx = x - logicalWidth / 2;
    const dy = y - logicalHeight / 2;
    return Math.sqrt(dx * dx + dy * dy)
  }

  getDistanceToBottomLeft(x: number, y: number) {
     // Use logical dimensions for distance calculation
    const logicalHeight = this.canvas.height / (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);
    const dx = x
    const dy = logicalHeight - y
    return Math.sqrt(dx * dx + dy * dy)
  }

  createPixels() {
    if (!this.ctx) return
    this.pixels = []
    const logicalWidth = this.canvas.width / (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);
    const logicalHeight = this.canvas.height / (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);

    for (let x = 0; x < logicalWidth; x += this.gap) {
      for (let y = 0; y < logicalHeight; y += this.gap) {
        const color =
          this.colors[Math.floor(Math.random() * this.colors.length)]
        let delay = 0

        if (this.variant === "icon") {
          delay = this.reducedMotion ? 0 : this.getDistanceToCenter(x, y)
        } else {
          delay = this.reducedMotion ? 0 : this.getDistanceToBottomLeft(x, y)
        }

        this.pixels.push(
          new Pixel(this.canvas, this.ctx, x, y, color, this.speed, delay),
        )
      }
    }
  }

  handleAnimation(name: "appear" | "disappear") {
    if (this.animation) {
      cancelAnimationFrame(this.animation)
    }

    const animate = () => {
      this.animation = requestAnimationFrame(animate)

      const timeNow = performance.now()
      const timePassed = timeNow - this.timePrevious

      if (timePassed < this.timeInterval) return

      this.timePrevious = timeNow - (timePassed % this.timeInterval)

      if (!this.ctx) return
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      let allIdle = true
      for (const pixel of this.pixels) {
        pixel[name]()
        if (!pixel.isIdle) allIdle = false
      }

      if (allIdle) {
        cancelAnimationFrame(this.animation)
        this.animation = null
      }
    }

    animate()
  }
}

// React component wrapper
export interface PixelCanvasProps extends React.HTMLAttributes<HTMLElement> { // Use HTMLElement for custom element props
  gap?: number
  speed?: number
  colors?: string[]
  variant?: "default" | "icon"
  noFocus?: boolean
  className?: string; // Explicitly add className
  style?: React.CSSProperties; // Explicitly add style
}

// Define the custom element only once on the client
if (typeof window !== "undefined" && !customElements.get("pixel-canvas")) {
  customElements.define("pixel-canvas", PixelCanvasElement)
}

const PixelCanvas = React.forwardRef<
  HTMLElement,
  PixelCanvasProps
>(({ gap, speed, colors, variant, noFocus, className, style, ...props }, ref) => {

  React.useEffect(() => {
    // Ensure custom element is defined client-side
    if (typeof window !== "undefined" && !customElements.get("pixel-canvas")) {
      customElements.define("pixel-canvas", PixelCanvasElement);
    }
  }, []);

  // Cast the custom element type to 'any' to bypass strict JSX checking for this specific element
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomElement = 'pixel-canvas' as any;

  return (
    <CustomElement
      ref={ref}
      data-gap={gap}
      data-speed={speed}
      data-colors={colors?.join(",")}
      data-variant={variant}
      {...(noFocus && { "data-no-focus": "" })}
      class={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        ...style,
      }}
      {...props}
    />
  )
})
PixelCanvas.displayName = "PixelCanvas"

export { PixelCanvas } 