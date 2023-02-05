import Material from './pages/Material'
import Home from './pages/Home'
import { Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/material" element={<Material />} />
      </Routes>
    </div>
  )
}

export default App
