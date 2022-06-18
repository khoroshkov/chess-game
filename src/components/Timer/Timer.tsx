import React, { useState, useRef, useEffect } from 'react'
import { Colors } from '../../models/Colors'
import { Player } from '../../models/Player'

interface TimerProps {
  currentPlayer: Player | null
  restart: () => void
}

export const Timer: React.FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [blackTime, setBlackTime] = useState<number>(10)
  const [whiteTime, setWhiteTime] = useState<number>(10)
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)

  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current)
    }

    const callback =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTimer
        : decrementBlackTimer

    timer.current = setInterval(callback, 1000)
  }

  const decrementBlackTimer = () => {
    setBlackTime((prevState) => prevState - 1)
  }

  const decrementWhiteTimer = () => {
    setWhiteTime((prevState) => prevState - 1)
  }

  const handleRestart = () => {
    setBlackTime(300)
    setWhiteTime(300)
    restart()
  }

  const stopTimer = () => {
    if (timer.current) {
      clearInterval(timer.current)
    }
  }

  useEffect(() => {
    startTimer()
  }, [currentPlayer])

  if (whiteTime <= 0 || blackTime <= 0) {
    stopTimer()
  }

  return (
    <div>
      <div>
        <button onClick={handleRestart}>Restart game</button>
      </div>
      <h2>Black: {blackTime}</h2>
      <h2>White: {whiteTime}</h2>
    </div>
  )
}
