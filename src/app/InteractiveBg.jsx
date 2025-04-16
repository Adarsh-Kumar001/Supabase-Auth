'use client'

import { useEffect, useRef } from 'react'

export default function InteractiveBlobs() {
  const centerBlobRef = useRef(null)
  const topRightRef = useRef(null)
  const bottomLeftRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e
      const { innerWidth: w, innerHeight: h } = window

      const move = (ref, factorX, factorY) => {
        if (!ref.current) return
        const offsetX = (x - w / 2) * factorX
        const offsetY = (y - h / 2) * factorY
        ref.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`
      }

      move(centerBlobRef, 0.02, 0.02)
      move(topRightRef, 0.01, 0.01)
      move(bottomLeftRef, 0.01, 0.01)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Center Blob */}
      <div
        ref={centerBlobRef}
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl opacity-60 mix-blend-lighten animate-morph"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.4), transparent 70%)',
        }}
      />

      {/* Top Right Blob */}
      <div
        ref={topRightRef}
        className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full blur-3xl opacity-50 mix-blend-lighten animate-morph"
        style={{
          background: 'radial-gradient(circle, rgba(0,191,255,0.35), transparent 70%)',
        }}
      />

      {/* Bottom Left Blob */}
      <div
        ref={bottomLeftRef}
        className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full blur-3xl opacity-50 mix-blend-lighten animate-morph"
        style={{
          background: 'radial-gradient(circle, rgba(255,105,180,0.3), transparent 70%)',
        }}
      />
    </div>
  )
}
