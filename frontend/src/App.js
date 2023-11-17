import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Loginpage from './pages/LoginPage'
import Register from './pages/Register'

function App() {
return (
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Loginpage />} />
  <Route path="/register" element={<Register />} />
  </Routes>
  </BrowserRouter>
)
}

export default App