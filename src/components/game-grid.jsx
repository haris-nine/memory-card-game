import { useState, useEffect } from 'react'
import { images, API_KEY } from './utils'
import { v4 as uuidv4 } from 'uuid' // Import uuid library
import Loading from './loader'
import Popup from './popup'

const Game = ({ updateScore }) => {
  const [cards, setCards] = useState([]) // Store cards as objects with unique keys
  const [clickedCards, setClickedCards] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [gameWin, setGameWin] = useState(false) // New state for game-over

  const [isShuffling, setIsShuffling] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // Add loading state

  useEffect(() => {
    const fetchImages = async () => {
      const fetchedCards = []

      for (const term of images) {
        try {
          const response = await fetch(
            `https://tenor.googleapis.com/v2/search?q=${term}&key=${API_KEY}&limit=1`
          )
          const data = await response.json()
          if (data.results.length > 0) {
            fetchedCards.push({
              id: uuidv4(), // Generate a unique ID for each card
              url: data.results[0].media_formats.webp.url,
            })
          }
        } catch (error) {
          console.error(`Error fetching image for term "${term}":`, error)
        }
      }

      setCards(fetchedCards)
      setIsLoading(false) // Stop loading after fetching
    }

    fetchImages()
  }, [])

  const shuffleCards = () => {
    setIsShuffling(true)
    setTimeout(() => {
      setCards((prevCards) => {
        const shuffled = [...prevCards]
        for (let i = shuffled.length - 1; i > 0; i--) {
          const randomIndex = Math.floor(Math.random() * (i + 1))
          ;[shuffled[i], shuffled[randomIndex]] = [
            shuffled[randomIndex],
            shuffled[i],
          ]
        }
        return shuffled
      })
      setIsShuffling(false)
    }, 1000)
  }

  const onClick = (id) => {
    if (clickedCards.includes(id)) {
      setShowPopup(true) // Show popup if duplicate card is clicked
      return // Exit early
    }

    setClickedCards((prev) => {
      const newClickedCards = [...prev, id]

      if (newClickedCards.length === 12) {
        setGameWin(true)
      } else {
        shuffleCards() // Shuffle for the next round
      }

      return newClickedCards // Update the state
    })
  }

  useEffect(() => {
    updateScore(clickedCards.length)
  }, [clickedCards, updateScore])

  const resetGame = () => {
    setClickedCards([])
    setGameWin(false)
    setShowPopup(false)
    shuffleCards()
  }

  if (isLoading) return <Loading /> // Show loading component if images are being loaded

  return (
    <>
      {showPopup && (
        <Popup
          title="Game Over!"
          message="You clicked the same card twice."
          buttonText="Reset Game"
          onReset={resetGame}
        />
      )}
      {gameWin && (
        <Popup
          title="You Won!"
          message="You have obtained the holy grail."
          buttonText="New Game"
          imageSrc="https://static.wikia.nocookie.net/typemoon/images/9/99/FGO_Grail.png"
          onReset={resetGame}
        />
      )}
      <section className="flex flex-wrap p-10 gap-10 bg-[#1F2937] justify-center">
        {cards.map((card) => (
          <div
            key={card.id} // Use unique ID as the key
            className={`card min-w-64 min-h-64 rounded-md border-[#3882f6] border-4 ${
              isShuffling ? 'animate-shuffle' : ''
            }`}
            style={{
              backgroundImage: `url(${card.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            onClick={() => onClick(card.id)} // Pass the unique ID
          ></div>
        ))}
      </section>
    </>
  )
}

export default Game
