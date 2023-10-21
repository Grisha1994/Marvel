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
import context from '../../store/context/context';
import { useLocalStorage } from '../../store/hooks/useLocalStorage';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroes());
    dispatch(fetchComics());
  }, [dispatch])

  const [ resultsHero, setResultsHero] = useLocalStorage('resultsHero', []);
  // console.log("App resultHero", resultsHero);

  return (
    <div className="App">
      <context.Provider value={{setResultsHero}}>
        <NavMenu/>

        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/heroes' element={<HeroContainer/>} />
          <Route path='/heroesId/:id' element={<HeroId resultsHero={resultsHero}/>} />
          <Route path='/comics' element={<ComicsContainer/>} />
        </Routes>

      </context.Provider>
    </div>
  );
}

export default App;
