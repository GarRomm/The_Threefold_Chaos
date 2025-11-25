import './Home.css'

function Home({ onStart }) {
  return (
    <div className="page home-page">
      <div className="home-content">
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
