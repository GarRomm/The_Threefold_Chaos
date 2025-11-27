import './ContactModal.css'

function ContactModal({ onClose }) {
  const creators = [
    { name: 'Islem BENMOUNA', linkedin: '' },
    { name: 'Ines SCHLEGEL', linkedin: '' },
    { name: 'Irvin AHYI', linkedin: '' },
    { name: 'Romain GARCIA', linkedin: '' }
  ]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content contact-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">Créateurs</h2>
        <div className="creators-list">
          {creators.map((creator, index) => (
            <div key={index} className="creator-item">
              <span className="creator-name">{creator.name}</span>
              {creator.linkedin && (
                <a 
                  href={creator.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="linkedin-link"
                >
                  LinkedIn →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactModal
