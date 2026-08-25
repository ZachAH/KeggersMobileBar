const bubbles = [
  { left: '20%', size: 7, delay: '0s' },
  { left: '38%', size: 5, delay: '0.3s' },
  { left: '55%', size: 8, delay: '0.15s' },
  { left: '72%', size: 5, delay: '0.45s' },
]

export function Bubbles() {
  return (
    <>
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="bubble"
          style={{ left: b.left, width: b.size, height: b.size, animationDelay: b.delay }}
        />
      ))}
    </>
  )
}
