import React from 'react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
  },
}

const projects = [
  {
    title: 'Lend2Build',
    description:
      'A mobile-first MERN app to streamline credit-based construction material procurement.',
    stack: 'ReactJS • NodeJS • Express • MongoDB • WhatsApp API',
    link: 'https://github.com/vamsirevada/lend2build',
  },
  {
    title: 'CSV Validation Tracker',
    description:
      'Tool to manage and track CSV documentation lifecycle for regulated IT systems.',
    stack: 'HTML • CSS • JavaScript • SharePoint • QMS API',
    link: 'https://github.com/vamsirevada/csv-tracker',
  },
]

function Projects() {
  return (
    <motion.section
      id="projects"
      className="section"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{ marginBottom: '2rem' }}
      >
        Projects
      </motion.h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            className="project-card"
            key={project.id || index}
            variants={cardVariants}
            whileHover={{
              scale: 1.06,
              boxShadow: '0 8px 32px rgba(97,218,251,0.18)',
              zIndex: 2,
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p className="stack">{project.stack}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4em',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ verticalAlign: 'middle' }}
                aria-hidden="true"
              >
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M5 12v-7a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" />
              </svg>
              View on GitHub
            </a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default Projects
