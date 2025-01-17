import InfoIcon from './info'
import { useState, useEffect } from 'react'

function Score({ score }) {
  const [bestScore, setBestScore] = useState(0)

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
    }
  }, [bestScore, score])

  return (
    <div className="flex sm:gap-16 p-4 sm:pl-24 font-poppins bg-[#E5E7EB] px-16 text-nowrap gap-4">
      <div>Current score: {score}</div>
      <div>Best score: {bestScore}</div>
      <InfoIcon />
    </div>
  )
}

export default Score
