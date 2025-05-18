import React from 'react';
import { motion } from 'framer-motion';

function GithubStats() {
  return (
    <motion.section
      className="section"
      id="github"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <h2>GitHub Activity</h2>
      <div className="github-stats-grid">
        <img
          src="https://github-readme-stats.vercel.app/api?username=vamsirevada&show_icons=true&theme=onedark&hide_border=true"
          alt="GitHub Stats"
        />
        <img
          src="https://github-readme-streak-stats.herokuapp.com/?user=vamsirevada&theme=onedark&hide_border=true"
          alt="GitHub Streak"
        />
        <img
          src="https://github-readme-stats.vercel.app/api/top-langs/?username=vamsirevada&layout=compact&theme=onedark&hide_border=true"
          alt="Top Languages"
        />
      </div>
    </motion.section>
  );
}

export default GithubStats;