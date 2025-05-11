import { Routes, Route, Link } from 'react-router-dom'
import Main from './pages/Main'
import Map from './pages/Map'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element = {<Main></Main>} />
      <Route path="/statistics" element={ <div></div> } />
      <Route path="/map" element={ <Map></Map> } />
      <Route path="/report" element={ <div></div> } />
      <Route path="/cam" element={ <div></div> } />
    </Routes>
  )
}

export default App
