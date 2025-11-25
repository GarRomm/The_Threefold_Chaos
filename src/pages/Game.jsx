import { useState, useEffect, useCallback } from 'react'
import { rules } from '../data/rules'
import './Game.css'

function Game({ difficulty, onBack }) {
  const getInitialRule = () => {
    const randomIndex = Math.floor(Math.random() * rules[difficulty].length)
    return rules[difficulty][randomIndex]
  }

  const neonColors = ['#00E5FF', '#FF0099', '#44FF00', '#C300FF']
  const getRandomNeonColor = () => neonColors[Math.floor(Math.random() * neonColors.length)]
  
  const [currentRule, setCurrentRule] = useState(() => getInitialRule())
  const [usedRules, setUsedRules] = useState([])
  const [timeLeft, setTimeLeft] = useState(() => Math.floor(Math.random() * 11) + 30)
  const [isActive, setIsActive] = useState(true)
  const [neonColor, setNeonColor] = useState(() => getRandomNeonColor())

  const getRandomRule = useCallback(() => {
    const availableRules = rules[difficulty].filter(
      (rule) => !usedRules.includes(rule)
    )

    if (availableRules.length === 0) {
      // Reset if all rules have been used
      setUsedRules([])
      return rules[difficulty][Math.floor(Math.random() * rules[difficulty].length)]
    }

    const randomRule = availableRules[Math.floor(Math.random() * availableRules.length)]
    setUsedRules([...usedRules, randomRule])
    return randomRule
  }, [difficulty, usedRules])

  const resetTimer = useCallback(() => {
    const randomTime = Math.floor(Math.random() * 11) + 30 // 30-40 seconds
    setTimeLeft(randomTime)
    setCurrentRule(getRandomRule())
    setNeonColor(getRandomNeonColor())
  }, [getRandomRule])

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          const randomTime = Math.floor(Math.random() * 11) + 30
          setCurrentRule(getRandomRule())
          setNeonColor(getRandomNeonColor())
          return randomTime
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, getRandomRule])

  const togglePause = () => {
    setIsActive(!isActive)
  }

  const skipRule = () => {
    resetTimer()
  }

  const isDanger = timeLeft <= 5

  return (
    <div className="page game-page">
      <div className="game-content">
        <div className="game-header">
          <h2 className="difficulty-badge">{difficulty.toUpperCase()}</h2>
          <div className={`timer ${isDanger ? 'timer-danger' : ''}`}>
            <div className="timer-circle">
              <span className="timer-value">{timeLeft}</span>
            </div>
            <p className="timer-label">seconds</p>
          </div>
        </div>

        <div className="rule-container">
          <div className="rule-card" style={{
            borderColor: neonColor,
            boxShadow: `0 0 20px ${neonColor}40, 0 0 40px ${neonColor}20`
          }}>
            <h3 className="rule-title" style={{ color: neonColor }}>Current Rule</h3>
            <p className="rule-text">{currentRule}</p>
          </div>
        </div>

        <div className="game-controls">
          <button className="btn btn-secondary" onClick={togglePause}>
            {isActive ? '⏸ Pause' : '▶ Resume'}
          </button>
          <button className="btn btn-primary" onClick={skipRule}>
            ⏭ Skip Rule
          </button>
        </div>

        <button className="btn btn-secondary back-btn-game" onClick={onBack}>
          ← Back to Difficulty
        </button>
      </div>
    </div>
  )
}

export default Game
