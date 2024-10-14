import Map from './pages/map'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Map/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
