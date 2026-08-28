import { useEffect, useRef } from 'react'

/**
 * Ambient "liquid gold silk" backdrop: a handful of soft, translucent ribbon
 * waves drifting slowly across a deep dark canvas, additively blended for a
 * metallic sheen. Mounted once at the app root (not per-route) so the
 * animation state persists across navigation.
 */

const BASE_DARK = '#070707'

interface Ribbon {
  /** vertical center, as a fraction of canvas height */
  yFrac: number
  /** undulation amplitude, as a fraction of canvas height */
  ampFrac: number
  /** how many full sine waves fit across the viewport width */
  waveCount: number
  /** phase advance per second */
  speed: number
  /** current phase, mutated every frame */
  phase: number
  /** -1 or 1, direction of horizontal drift */
  direction: 1 | -1
  /** ribbon thickness, as a fraction of canvas height */
  thicknessFrac: number
  /** peak alpha for this ribbon (kept in the 0.15–0.35 luxury-subtle range) */
  peakAlpha: number
  /** gradient core color — the bright metallic highlight running through the ribbon */
  coreColor: string
  /** gradient edge color — the deeper bronze fading to transparent */
  edgeColor: string
}

function createRibbons(): Ribbon[] {
  // Five layers, spread through the vertical middle of the frame, alternating
  // drift direction and varying speed/amplitude so they never look mechanical.
  return [
    {
      yFrac: 0.22,
      ampFrac: 0.05,
      waveCount: 1.1,
      speed: 0.045,
      phase: 0,
      direction: 1,
      thicknessFrac: 0.09,
      peakAlpha: 0.22,
      coreColor: '253, 240, 205', // soft specular highlight
      edgeColor: '74, 53, 24', // deep bronze/amber
    },
    {
      yFrac: 0.38,
      ampFrac: 0.07,
      waveCount: 0.8,
      speed: -0.03,
      phase: 2.1,
      direction: -1,
      thicknessFrac: 0.12,
      peakAlpha: 0.28,
      coreColor: '212, 175, 55', // metallic warm gold
      edgeColor: '74, 53, 24',
    },
    {
      yFrac: 0.52,
      ampFrac: 0.06,
      waveCount: 1.4,
      speed: 0.055,
      phase: 4.4,
      direction: 1,
      thicknessFrac: 0.08,
      peakAlpha: 0.18,
      coreColor: '197, 155, 39', // metallic warm gold (deeper)
      edgeColor: '74, 53, 24',
    },
    {
      yFrac: 0.68,
      ampFrac: 0.08,
      waveCount: 0.65,
      speed: -0.04,
      phase: 1.3,
      direction: -1,
      thicknessFrac: 0.14,
      peakAlpha: 0.24,
      coreColor: '253, 240, 205',
      edgeColor: '74, 53, 24',
    },
    {
      yFrac: 0.82,
      ampFrac: 0.045,
      waveCount: 1.0,
      speed: 0.035,
      phase: 3.6,
      direction: 1,
      thicknessFrac: 0.07,
      peakAlpha: 0.16,
      coreColor: '212, 175, 55',
      edgeColor: '74, 53, 24',
    },
  ]
}

export function GoldSilkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx2d = canvas.getContext('2d')
    if (!ctx2d) return
    const ctx: CanvasRenderingContext2D = ctx2d

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const ribbons = createRibbons()

    let width = 0
    let height = 0
    let dpr = 1
    let rafId = 0
    let lastTime = performance.now()

    function resize() {
      const canvasEl = canvasRef.current
      if (!canvasEl) return
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvasEl.width = Math.round(width * dpr)
      canvasEl.height = Math.round(height * dpr)
      canvasEl.style.width = `${width}px`
      canvasEl.style.height = `${height}px`
      const context = canvasEl.getContext('2d')
      context?.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function drawRibbon(ribbon: Ribbon) {
      const yCenter = height * ribbon.yFrac
      const amplitude = height * ribbon.ampFrac
      const baseThickness = height * ribbon.thicknessFrac
      const freq = (2 * Math.PI * ribbon.waveCount) / Math.max(width, 1)

      // Bound vertex count regardless of viewport size — smooth enough,
      // cheap enough.
      const step = Math.max(10, Math.round(width / 140))

      const topPoints: [number, number][] = []
      const bottomPoints: [number, number][] = []

      for (let x = -step; x <= width + step; x += step) {
        const yWave = yCenter + amplitude * Math.sin(freq * x + ribbon.phase)
        const widthWobble = 0.75 + 0.25 * Math.sin(x * freq * 2.3 + ribbon.phase * 0.6)
        const halfThickness = (baseThickness * widthWobble) / 2
        topPoints.push([x, yWave - halfThickness])
        bottomPoints.push([x, yWave + halfThickness])
      }

      ctx.beginPath()
      ctx.moveTo(topPoints[0][0], topPoints[0][1])
      for (const [x, y] of topPoints) ctx.lineTo(x, y)
      for (let i = bottomPoints.length - 1; i >= 0; i--) {
        ctx.lineTo(bottomPoints[i][0], bottomPoints[i][1])
      }
      ctx.closePath()

      const gradient = ctx.createLinearGradient(0, yCenter - amplitude - baseThickness, 0, yCenter + amplitude + baseThickness)
      gradient.addColorStop(0, `rgba(${ribbon.edgeColor}, 0)`)
      gradient.addColorStop(0.38, `rgba(${ribbon.edgeColor}, ${ribbon.peakAlpha * 0.6})`)
      gradient.addColorStop(0.5, `rgba(${ribbon.coreColor}, ${ribbon.peakAlpha})`)
      gradient.addColorStop(0.62, `rgba(${ribbon.edgeColor}, ${ribbon.peakAlpha * 0.6})`)
      gradient.addColorStop(1, `rgba(${ribbon.edgeColor}, 0)`)

      ctx.fillStyle = gradient
      ctx.fill()
    }

    function render(dt: number) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = BASE_DARK
      ctx.fillRect(0, 0, width, height)

      ctx.globalCompositeOperation = 'lighter'
      for (const ribbon of ribbons) {
        ribbon.phase += ribbon.speed * ribbon.direction * dt
        drawRibbon(ribbon)
      }
      ctx.globalCompositeOperation = 'source-over'
    }

    function loop(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now
      render(dt)
      rafId = requestAnimationFrame(loop)
    }

    resize()

    if (reduceMotionQuery.matches) {
      // Respect reduced-motion: render a single static frame, no rAF loop.
      render(0)
    } else {
      rafId = requestAnimationFrame((now) => {
        lastTime = now
        loop(now)
      })
    }

    function handleResize() {
      resize()
      if (reduceMotionQuery.matches) render(0)
    }

    function handleMotionPreferenceChange() {
      if (rafId) cancelAnimationFrame(rafId)
      if (reduceMotionQuery.matches) {
        render(0)
      } else {
        lastTime = performance.now()
        rafId = requestAnimationFrame(loop)
      }
    }

    window.addEventListener('resize', handleResize)
    reduceMotionQuery.addEventListener('change', handleMotionPreferenceChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      reduceMotionQuery.removeEventListener('change', handleMotionPreferenceChange)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" style={{ backgroundColor: BASE_DARK }} />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(7,7,7,0.85) 95%)',
        }}
      />
    </div>
  )
}
