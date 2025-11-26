import { useState } from 'react'
import Lexicon from '../components/Lexicon'
import frame from '../assets/frame.svg'
import detailsIcon from '../assets/details.png'
import './Difficulty.css'

function Difficulty({ onSelectDifficulty, onBack }) {
  const [showLexicon, setShowLexicon] = useState(false)
  const difficulties = [
    { 
      level: 'easy', 
      label: 'Chaos Novice', 
      description: 'Beginner-friendly rules',
      color: 'var(--success)',
      glow: 'rgba(16, 185, 129, 0.6)',
      glowSecondary: 'rgba(16, 185, 129, 0.3)'
    },
    { 
      level: 'medium', 
      label: 'Chaos Master', 
      description: 'Moderate mayhem',
      color: 'var(--warning)',
      glow: 'rgba(245, 158, 11, 0.6)',
      glowSecondary: 'rgba(245, 158, 11, 0.3)'
    },
    { 
      level: 'hard', 
      label: 'Chaos Legend', 
      description: 'Maximum disorder',
      color: 'var(--danger)',
      glow: 'rgba(239, 68, 68, 0.6)',
      glowSecondary: 'rgba(239, 68, 68, 0.3)'
    }
  ]

  return (
    <div className="page difficulty-page">
      <img src={frame} alt="" className="page-frame" />
      <div className="difficulty-content">
        <h1 className="page-title">Select Difficulty</h1>
        <div className="difficulty-options">
          {difficulties.map((diff) => (
            <button
              key={diff.level}
              className="difficulty-card"
              onClick={() => onSelectDifficulty(diff.level)}
              style={{ 
                '--card-color': diff.color,
                '--card-glow': diff.glow,
                '--card-glow-secondary': diff.glowSecondary
              }}
            >
              <h2 className="difficulty-label">{diff.label}</h2>
              <p className="difficulty-description">{diff.description}</p>
            </button>
          ))}
        </div>
        
        <div className="difficulty-actions">
          <button className="btn btn-lexicon" onClick={() => setShowLexicon(true)}>
            <img src={detailsIcon} alt="" className="lexicon-icon" />
            Lexicon
          </button>
          <button className="btn btn-secondary back-btn" onClick={onBack}>
            ← Back
          </button>
        </div>
      </div>

      {showLexicon && <Lexicon onClose={() => setShowLexicon(false)} />}
    </div>
  )
}

export default Difficulty
