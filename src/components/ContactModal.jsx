import './ContactModal.css'

function ContactModal({ onClose }) {
  const creators = [
    { name: 'Islem BENMOUNA', role: 'Création Numérique', linkedin: 'https://www.linkedin.com/in/islem-benmouna/' },
    { name: 'Ines SCHLEGEL', role: 'Création Numérique', linkedin: 'https://www.linkedin.com/in/in%C3%A8s-schlegel-b0980a29a/' },
    { name: 'Irvin AHYI', role: 'Marketing Digital', linkedin: 'https://www.linkedin.com/in/irvin-ahyi-27383b30a/' },
    { name: 'Romain GARCIA', role: 'Développeur Web', linkedin: 'https://www.linkedin.com/in/romain-hoyez/' }
  ]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content contact-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">Créateurs</h2>
        <div className="creators-list">
          {creators.map((creator, index) => (
            <div key={index} className="creator-item">
              <div className="creator-info">
                <span className="creator-name">{creator.name}</span>
                <span className="creator-role">{creator.role}</span>
              </div>
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
