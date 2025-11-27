import { useState } from 'react'
import { lexicon } from '../data/lexicon'
import scouterIcon from '../assets/scouterdbz.png'
import detailsIcon from '../assets/DetailsV2.png'
import './Lexicon.css'

function Lexicon({ onClose }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Combine all terms from all categories
  const allTerms = [
    ...lexicon.webDev.map(item => ({ ...item, category: 'Web Development', categoryColor: '#00E5FF' })),
    ...lexicon.design.map(item => ({ ...item, category: 'Design/UX/UI', categoryColor: '#FF0099' })),
    ...lexicon.marketing.map(item => ({ ...item, category: 'Digital Marketing', categoryColor: '#44FF00' }))
  ]

  // Filter terms based on search and category
  const filteredTerms = allTerms.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  }).sort((a, b) => a.term.localeCompare(b.term))

  return (
    <div className="lexicon-overlay" onClick={onClose}>
      <div className="lexicon-modal" onClick={(e) => e.stopPropagation()}>
        <div className="lexicon-header">
          <h2 className="lexicon-title">
            <img src={detailsIcon} alt="" className="lexicon-title-icon" />
            Lexicon
          </h2>
          <button className="lexicon-close" onClick={onClose}>✕</button>
        </div>

        <div className="lexicon-filters">
          <div className="search-container">
            <img src={scouterIcon} alt="" className="search-icon" />
            <input
              type="text"
              className="lexicon-search"
              placeholder="Search terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="lexicon-categories">
            <button
              className={`category-btn category-all ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All ({allTerms.length})
            </button>
            <button
              className={`category-btn category-webdev ${selectedCategory === 'Web Development' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('Web Development')}
            >
              Web Dev ({lexicon.webDev.length})
            </button>
            <button
              className={`category-btn category-design ${selectedCategory === 'Design/UX/UI' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('Design/UX/UI')}
            >
              Design ({lexicon.design.length})
            </button>
            <button
              className={`category-btn category-marketing ${selectedCategory === 'Digital Marketing' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('Digital Marketing')}
            >
              Marketing ({lexicon.marketing.length})
            </button>
          </div>
        </div>

        <div className="lexicon-content">
          {filteredTerms.length === 0 ? (
            <div className="no-results">
              <p>No terms found matching "{searchTerm}"</p>
            </div>
          ) : (
            <div className="lexicon-grid">
              {filteredTerms.map((item, index) => (
                <div key={index} className="lexicon-card">
                  <div className="lexicon-card-header">
                    <h3 className="lexicon-term">{item.term}</h3>
                    <span 
                      className="lexicon-category"
                      style={{
                        borderColor: item.categoryColor,
                        color: item.categoryColor
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <p className="lexicon-definition">{item.definition}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lexicon-footer">
          <p className="lexicon-count">
            Showing {filteredTerms.length} of {allTerms.length} terms
          </p>
        </div>
      </div>
    </div>
  )
}

export default Lexicon
