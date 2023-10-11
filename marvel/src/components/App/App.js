import { useDispatch } from 'react-redux';
import Main from '../Main';
import './App.css';
import { useEffect } from 'react';
import { fetchHeroes } from '../../store/slice/heroesSlice';
import { Routes, Route } from 'react-router-dom';
import HeroId from '../HeroId';
import HeroContainer from '../HeroContainer';
import NavMenu from '../NavMenu';
import ComicsContainer from '../ComicsContainer';
import { fetchComics } from '../../store/slice/comicsSlise';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroes());
    dispatch(fetchComics());
  }, [dispatch])

  return (
    <div className="App">

      <NavMenu/>

      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/heroes' element={<HeroContainer/>} />
        <Route path='/heroesId/:id' element={<HeroId/>} />
        <Route path='/comics' element={<ComicsContainer/>} />
      </Routes>

    </div>
  );
}

export default App;
