import React from 'react'
import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import GithubStats from './components/GithubStats'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <GithubStats />
      <Footer />
    </div>
  )
}

export default App
