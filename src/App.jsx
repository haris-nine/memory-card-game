import { useState } from 'react'
import Header from './components/header'
import Score from './components/score'
import Game from './components/game-grid'
import Footer from './components/footer'

function App() {
  const [score, setScore] = useState(0)

  const updateScore = (newScore) => {
    setScore(newScore)
  }

  return (
    <>
      <Header />
      <Score score={score} />
      <Game updateScore={updateScore} />
      <Footer />
    </>
  )
}

export default App
