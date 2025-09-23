import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Banner from './Components/Banner/Banner'
import Skills from './Components/Skills/Skills'
import Projects from './Components/Projects/Projects'
import './App.css'
const App = () => {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <Skills/>
      <Projects/>
    </div>
  )
}

export default App