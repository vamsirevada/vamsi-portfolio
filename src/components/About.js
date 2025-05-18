import React from 'react'
import { motion } from 'framer-motion'

function About() {
  return (
    <motion.section
      className="section"
      id="about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2>About Me</h2>
      <p>
        I craft digital solutions that are intuitive, robust, and impactful.
        <br />
        <br />
        My background in <b>full stack development</b>,{' '}
        <b>AI integration</b>, and <b>enterprise IT</b> lets me bridge the gap
        between business needs and technology.
        <br />
        <br />
        I thrive on solving complex problems, automating workflows, and building
        secure, scalable systems.
        <br />
        <br />
        <span style={{ color: '#ffd580', fontWeight: 600 }}>
          My goal: Deliver technology that empowers people and drives results.
        </span>
      </p>
    </motion.section>
  )
}

export default About
