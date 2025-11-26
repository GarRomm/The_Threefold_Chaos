import { useState, useEffect, useCallback, useRef } from 'react'
import { rules } from '../data/rules'
import Lexicon from '../components/Lexicon'
import frame from '../assets/frame.svg'
import detailsIcon from '../assets/details.png'
import './Game.css'

function Game({ difficulty, onBack }) {
  const getInitialRule = () => {
    const randomIndex = Math.floor(Math.random() * rules[difficulty].length)
    return rules[difficulty][randomIndex]
  }

  const neonColors = ['#00E5FF', '#FF0099', '#44FF00', '#C300FF']
  const getRandomNeonColor = useCallback(() => {
    return neonColors[Math.floor(Math.random() * neonColors.length)]
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
  const [currentRule, setCurrentRule] = useState(() => getInitialRule())
  const [usedRules, setUsedRules] = useState([])
  const [timeLeft, setTimeLeft] = useState(() => Math.floor(Math.random() * 11) + 30)
  const [isActive, setIsActive] = useState(true)
  const [neonColor, setNeonColor] = useState(() => getRandomNeonColor())
  const [showLexicon, setShowLexicon] = useState(false)
  const [wasActiveBefore, setWasActiveBefore] = useState(true)
  const audioContextRef = useRef(null)
  const hasPlayedWarningRef = useRef(false)

  const getTeamColor = (target) => {
    if (target === 'blue') return '#00E5FF' // Neon Blue
    if (target === 'pink') return '#FF0099' // Neon Pink
    return null // both teams - use random color
  }

  const playBeep = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    
    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.frequency.value = 800
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.1)
  }, [])

  const getRandomRule = useCallback(() => {
    // 15% chance to have NO rule at all
    if (Math.random() < 0.15) {
      return { text: "No special rule this round - Play normally!", target: "both", noRule: true }
    }

    const availableRules = rules[difficulty].filter(
      (rule) => !usedRules.includes(rule)
    )

    if (availableRules.length === 0) {
      // Reset if all rules have been used
      setUsedRules([])
      return rules[difficulty][Math.floor(Math.random() * rules[difficulty].length)]
    }

    // Random selection with 20% chance to show only if it's team-specific
    let randomRule = availableRules[Math.floor(Math.random() * availableRules.length)]
    
    // 20% chance to hide team-specific rules randomly
    if (randomRule.target !== 'both' && Math.random() < 0.2) {
      randomRule = { ...randomRule, hidden: true }
    }

    setUsedRules([...usedRules, randomRule])
    return randomRule
  }, [difficulty, usedRules])

  const resetTimer = useCallback(() => {
    const randomTime = Math.floor(Math.random() * 11) + 30 // 30-40 seconds
    const newRule = getRandomRule()
    setCurrentRule(newRule)
    setTimeLeft(randomTime)
    // Use team color if target is specific, otherwise random
    const teamColor = getTeamColor(newRule.target)
    setNeonColor(teamColor || getRandomNeonColor())
    hasPlayedWarningRef.current = false // Reset warning sound flag
  }, [getRandomRule, getRandomNeonColor])

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          const randomTime = Math.floor(Math.random() * 11) + 30
          const newRule = getRandomRule()
          setCurrentRule(newRule)
          // Use team color if target is specific, otherwise random
          const teamColor = getTeamColor(newRule.target)
          setNeonColor(teamColor || getRandomNeonColor())
          hasPlayedWarningRef.current = false // Reset warning sound flag
          return randomTime
        }
        
        // Play beep sound during last 5 seconds
        if (prevTime <= 5 && prevTime > 1 && !hasPlayedWarningRef.current) {
          hasPlayedWarningRef.current = true
        }
        if (prevTime <= 5 && prevTime > 1) {
          playBeep()
        }
        
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, getRandomRule, getRandomNeonColor, playBeep])

  const togglePause = () => {
    setIsActive(!isActive)
  }

  const skipRule = () => {
    resetTimer()
  }

  const openLexicon = () => {
    setWasActiveBefore(isActive)
    setIsActive(false)
    setShowLexicon(true)
  }

  const closeLexicon = () => {
    setShowLexicon(false)
    setIsActive(wasActiveBefore)
  }

  const isDanger = timeLeft <= 5

  return (
    <div className="page game-page">
      <img src={frame} alt="" className="page-frame" />
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
          <div className={`rule-card ${currentRule.noRule ? 'no-rule' : ''} ${currentRule.target === 'blue' ? 'team-blue' : ''} ${currentRule.target === 'pink' ? 'team-pink' : ''}`} style={{
            borderColor: neonColor,
            boxShadow: `0 0 20px ${neonColor}40, 0 0 40px ${neonColor}20`
          }}>
            <h3 className="rule-title" style={{ color: neonColor }}>
              {currentRule.noRule ? '✨ Free Round ✨' : 'Current Rule'}
            </h3>
            <p className="rule-text">{currentRule.text || currentRule}</p>
            {currentRule.hidden && currentRule.target !== 'both' && (
              <p className="rule-hint" style={{ color: neonColor }}>
                ⚠️ This rule applies to a specific team only!
              </p>
            )}
          </div>
        </div>

        <div className="game-controls">
          <button className="btn btn-secondary" onClick={togglePause}>
            {isActive ? '⏸ Pause' : '▶ Resume'}
          </button>
          <button className="btn btn-primary" onClick={skipRule}>
            ⏭ Skip Rule
          </button>
          <button className="btn btn-lexicon" onClick={openLexicon}>
            <img src={detailsIcon} alt="" className="lexicon-icon" />
            Lexicon
          </button>
        </div>

        <button className="btn btn-secondary back-btn-game" onClick={onBack}>
          ← Back to Difficulty
        </button>
      </div>

      {showLexicon && <Lexicon onClose={closeLexicon} />}
    </div>
  )
}

export default Game
