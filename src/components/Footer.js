import React from 'react'
import { motion } from 'framer-motion'

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        color: '#b0b6be',
        textAlign: 'center',
        padding: '2rem 0 1rem 0',
        fontSize: '1rem',
        background: 'transparent',
        letterSpacing: '0.02em',
      }}
    >
      <p>
        © 2025 Vamsi Revada &nbsp;|&nbsp; Built with
        <span
          style={{
            color: '#ffd580',
            fontSize: '1.2em',
            verticalAlign: 'middle',
          }}
        >
          {' '}
          ♥{' '}
        </span>
        &nbsp;and React
      </p>
    </motion.footer>
  )
}

export default Footer
