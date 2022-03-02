import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { lazy,Suspense } from 'react';
import SingIn from './pages/SingInPage';
import Header from './components/Header/Header';
import Main from './components/main/main';

const SingInForm= lazy(()=>import('./components/form/form'))
const Home= lazy(()=>import('./pages/Home'))
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='singIn' element={
        <Suspense fallback={<div>Loading..........</div>} >
          <SingInForm/>
        </Suspense>} />
        <Route  path='/' element={
          <Suspense fallback={<div>Loading............</div>} >
            <Home/>
          </Suspense>
        } >
          <Route path='/' element={<Main/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
