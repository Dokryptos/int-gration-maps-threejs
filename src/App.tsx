import Map from './pages/map'
import Maptest from './pages/maps-test'
import {Routes, Route, Link} from 'react-router-dom'

function App() {
  return (
    <div>

        <nav>
          <Link to="/">View Map 1</Link> | <Link to="/2">View Map 2</Link>
        </nav>

      <Routes>
      <Route path='/' element={<Map/>}></Route>
      <Route path='/2' element={<Maptest/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
