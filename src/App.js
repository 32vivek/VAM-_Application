
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PersistentDrawerLeft from './components/layout/Layout';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PersistentDrawerLeft />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
