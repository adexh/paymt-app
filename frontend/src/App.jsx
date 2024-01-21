import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup/signup';
import Singin from './pages/signin/signin';
import Privateroute from './utils/private_route';
import Dashboard from './pages/dashboard/dashboard'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Singin />} />
        <Route path="/" element={<Privateroute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App