import React, { useState, useEffect } from 'react'

const roles = [
  'Full Stack Developer',
  'AI & Machine Learning Engineer',
  'IAM & AD Administrator',
  'Cloud-Ready Web App Architect',
]

const TerminalPrompt = () => (
  <span>
    <span style={{ color: '#6afc91' }}>vdhoniii</span>
    <span style={{ color: '#fff' }}>.</span>
    <span style={{ color: '#61dafb' }}>dev</span>
    <span style={{ color: '#fff' }}>:~</span>
  </span>
)

const TypingRoles = () => {
  const [roleIndex, setRoleIndex] = useState(0)
  const [phase, setPhase] = useState('showOutput') // showOutput | pause
  const [showCursor, setShowCursor] = useState(true)
  const [typed, setTyped] = useState('')
  const [fontSize, setFontSize] = useState('1.1em')

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor((v) => !v), 500)
    return () => clearInterval(cursorInterval)
  }, [])

  // Typing animation logic
  useEffect(() => {
    let timeout
    if (phase === 'showOutput') {
      if (typed.length < roles[roleIndex].length) {
        const typingSpeeds = [40, 50, 60, 70]
        const speed = typingSpeeds[Math.floor(Math.random() * typingSpeeds.length)]
        timeout = setTimeout(
          () => setTyped(roles[roleIndex].slice(0, typed.length + 1)),
          speed
        )
      } else {
        timeout = setTimeout(() => setPhase('pause'), 1200)
      }
    } else if (phase === 'pause') {
      timeout = setTimeout(() => {
        setRoleIndex((i) => (i + 1) % roles.length)
        setTyped('')
        setPhase('showOutput')
      }, 400)
    }
    return () => clearTimeout(timeout)
  }, [phase, typed, roleIndex])

  // Responsive font size (optional, can be removed if not needed)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setFontSize(Math.max(3.5, window.innerWidth / 100) + 'vw')
      } else {
        setFontSize('1.1em')
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Calculate width for fixed terminal look
  const promptLength = 'vdhoniii.dev:~'.length
  const maxRoleLength = Math.max(...roles.map((r) => r.length))
  const terminalWidthCh = Math.max(promptLength, maxRoleLength + 2) + 4 // +4 for $ and spacing

  return (
    <>
      <div
        className="terminal-traffic-lights"
        style={{
          display: 'flex',
          gap: 6,
          marginBottom: 12,
          alignItems: 'center',
          paddingLeft: 8,
          paddingTop: 4,
          paddingBottom: 2,
          userSelect: 'none',
          width: terminalWidthCh + 'ch',
          maxWidth: '100%',
        }}
      >
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#ff5f56',
            display: 'inline-block',
            border: '1px solid #e0443e',
          }}
        />
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#ffbd2e',
            display: 'inline-block',
            border: '1px solid #dea123',
          }}
        />
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#27c93f',
            display: 'inline-block',
            border: '1px solid #13a10e',
          }}
        />
      </div>
      <pre
        className="typed-role code-typing"
        aria-live="polite"
        role="region"
        aria-label="Terminal output"
        style={{
          fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          fontSize: fontSize,
          color: '#ffd580',
          letterSpacing: '0.02em',
          background: 'rgba(35,39,47,0.92)',
          padding: '1.1em 1.5em',
          borderRadius: '12px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
          display: 'block',
          width: terminalWidthCh + 'ch', // fixed width for desktop
          maxWidth: '100%',
          minWidth: 0,
          margin: 0,
          lineHeight: 1.7,
          whiteSpace: 'pre',
          overflow: 'hidden',
        }}
      >
        {/* First line: prompt */}
        <span style={{ color: '#fff' }}>
          <TerminalPrompt />
        </span>
        {'\n'}
        {/* Second line: $ and typing */}
        <span style={{ color: '#ffd580', fontWeight: 700 }}>$</span>
        <span
          style={{
            color: '#fff',
            display: 'inline',
            whiteSpace: 'pre',
            verticalAlign: 'middle',
            paddingLeft: '0.5ch',
          }}
        >
          {typed}
          <span
            className="blinking-cursor"
            style={{
              display: 'inline-block',
              width: '1ch',
              color: '#ffd580',
              opacity: showCursor ? 1 : 0,
              transition: 'opacity 0.2s',
              fontWeight: 700,
              fontSize: '1.1em',
              verticalAlign: 'middle',
              marginLeft: '-2px',
            }}
            aria-hidden="true"
          >
            _
          </span>
        </span>
      </pre>
    </>
  )
}

export default TypingRoles
