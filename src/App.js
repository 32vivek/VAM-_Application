
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PersistentDrawerLeft from './components/layout/Layout';
import Home from './pages/Home';
import UserForm from "./pages/UserForm";
import SignInSide from './components/sign-in/SignIn';
import SingUpInSide from './components/sign-up/sign-up';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignInSide />} />
          <Route path='/signup' element={<SingUpInSide />} />
          <Route path='/' element={<PersistentDrawerLeft />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path='/userform' element={<UserForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
