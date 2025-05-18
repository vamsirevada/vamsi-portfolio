import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  "ReactJS", "NodeJS", "MongoDB", "AWS",
  "GxP CSV", "Active Directory", "AI & ML"
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const skillVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

function Skills() {
  return (
    <motion.section
      className="section"
      id="skills"
      initial="hidden"
      whileInView="show"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Skills</h2>
      <motion.div className="skills" variants={containerVariants}>
        {skills.map((skill, index) => (
          <motion.span
            key={index}
            variants={skillVariants}
            whileHover={{ scale: 1.13, boxShadow: "0 2px 12px #61dafb44" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default Skills;