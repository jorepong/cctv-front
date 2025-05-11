import { Routes, Route, Link } from 'react-router-dom'
import Main from './pages/Main'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element = {<Main></Main>} />
      <Route path="/detail" element={ <div>상세페이지임</div> } />
      <Route path="/about" element={ <div>어바웃페이지임</div> } />
    </Routes>
  )
}

export default App
