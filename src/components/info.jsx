import { useState } from 'react'
import Info from '../assets/info.svg'

const InfoIcon = () => {
  const [hovered, setHovered] = useState(false)

  const info = `How to play: 
Click each card once—no repeats allowed! 
To win, get a score of 12.`

  return (
    <div
      className="pl-1 relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Info Icon */}
      <div>
        <img src={Info} alt="info" className="max-w-6 scale-125" />
      </div>

      {/* Tooltip */}
      {hovered && (
        <div className="absolute left-8 -translate-y-14 whitespace-pre mt-2 max-[600px]:-left-72 w-72 text-wrap bg-gray-800 text-white text-sm p-2 rounded shadow-lg z-10 animatey">
          {info}
        </div>
      )}
    </div>
  )
}

export default InfoIcon
