import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Difficulty from './pages/Difficulty'
import Game from './pages/Game'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)

  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  const selectDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty)
    setCurrentPage('game')
  }

  const goBack = () => {
    if (currentPage === 'game') {
      setCurrentPage('difficulty')
    } else if (currentPage === 'difficulty') {
      setCurrentPage('home')
    }
  }

  return (
    <div className="app">
      {currentPage === 'home' && <Home onStart={() => navigateTo('difficulty')} />}
      {currentPage === 'difficulty' && (
        <Difficulty onSelectDifficulty={selectDifficulty} onBack={goBack} />
      )}
      {currentPage === 'game' && (
        <Game difficulty={selectedDifficulty} onBack={goBack} />
      )}
    </div>
  )
}

export default App
