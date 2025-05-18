import React from 'react'
import { motion } from 'framer-motion'
import TypingRoles from './TypingRoles'

const ctaVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
}
const btnVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function Hero() {
  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      aria-label="Hero section introducing Vamsi Revada"
    >
      <img
        src={`${process.env.PUBLIC_URL}/avatar.jpg`}
        alt="Portrait of Vamsi Revada"
        className="avatar"
        loading="lazy"
        width={160}
        height={160}
        style={{ borderRadius: '50%' }}
      />
      <h1>
        Hi, I'm <span className="highlight">Vamsi Revada</span>
      </h1>
      <div aria-live="polite" aria-atomic="true">
        <TypingRoles />
      </div>
      <p>
        Full Stack Developer<span aria-hidden="true"> • </span>
        AI Enthusiast<span aria-hidden="true"> • </span>
        Active Directory Specialist
      </p>
      <motion.nav
        className="cta"
        aria-label="Call to action"
        variants={ctaVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
      >
        <motion.a
          href={`${process.env.PUBLIC_URL}/Vamsi_Revada_Resume.pdf`}
          className="btn primary"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download Vamsi Revada's Resume (PDF)"
          whileHover={{
            scale: 1.07,
            boxShadow: '0 6px 24px rgba(97,218,251,0.18)',
            y: -2,
          }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          variants={btnVariants}
        >
          {/* Resume Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ verticalAlign: 'middle', marginRight: '0.5em' }}
            aria-hidden="true"
          >
            <rect x="4" y="2" width="16" height="20" rx="3" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="8" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="12" y2="14" />
          </svg>
          Resume
        </motion.a>
        <motion.a
          href="mailto:vamsirevada@gmail.com"
          className="btn secondary"
          aria-label="Contact Vamsi Revada via email"
          whileHover={{
            scale: 1.07,
            boxShadow: '0 6px 24px rgba(255,213,128,0.18)',
            y: -2,
          }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          variants={btnVariants}
        >
          {/* Contact Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ verticalAlign: 'middle', marginRight: '0.5em' }}
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <polyline points="3 7 12 13 21 7" />
          </svg>
          Contact
        </motion.a>
      </motion.nav>
    </motion.section>
  )
}

export default Hero
