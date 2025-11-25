import './Difficulty.css'

function Difficulty({ onSelectDifficulty, onBack }) {
  const difficulties = [
    { 
      level: 'easy', 
      label: 'Junior Dev', 
      description: 'Beginner-friendly chaos',
      color: 'var(--success)'
    },
    { 
      level: 'medium', 
      label: 'Senior Dev', 
      description: 'Moderate mayhem',
      color: 'var(--warning)'
    },
    { 
      level: 'hard', 
      label: 'Tech Lead', 
      description: 'Maximum disorder',
      color: 'var(--danger)'
    }
  ]

  return (
    <div className="page difficulty-page">
      <div className="difficulty-content">
        <h1 className="page-title">Select Difficulty</h1>
        <div className="difficulty-options">
          {difficulties.map((diff) => (
            <button
              key={diff.level}
              className="difficulty-card"
              onClick={() => onSelectDifficulty(diff.level)}
              style={{ '--card-color': diff.color }}
            >
              <h2 className="difficulty-label">{diff.label}</h2>
              <p className="difficulty-description">{diff.description}</p>
            </button>
          ))}
        </div>
        <button className="btn btn-secondary back-btn" onClick={onBack}>
          ← Back
        </button>
      </div>
    </div>
  )
}

export default Difficulty
