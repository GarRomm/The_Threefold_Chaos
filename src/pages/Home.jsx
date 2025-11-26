import logo from '../assets/logo.png'
import frame from '../assets/frame.svg'
import character1 from '../assets/character1.svg'
import character2 from '../assets/character2.svg'
import './Home.css'

function Home({ onStart }) {
  return (
    <div className="page home-page">
      <img src={frame} alt="" className="page-frame" />
      <img src={character1} alt="" className="character character-left" />
      <img src={character2} alt="" className="character character-right" />
      <div className="home-content">
        <img src={logo} alt="The Threefold Chaos Logo" className="logo" />
        <h1 className="title">The Threefold Chaos</h1>
        <p className="subtitle">Digital Marketing × Web Dev × Creative Codename</p>
        <button className="btn btn-primary" onClick={onStart}>
          Start Game
        </button>
      </div>
    </div>
  )
}

export default Home
