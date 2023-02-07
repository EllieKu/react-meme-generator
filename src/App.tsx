import { Route, Routes } from 'react-router-dom'
import Create from './pages/Create'
import Home from './pages/Home'
import Material from './pages/Material'
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/material" element={<Material />} />
      </Routes>
    </div>
  )
}

export default App
