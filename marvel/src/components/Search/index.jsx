import React, { useEffect, useState } from 'react'
import s from './style.module.css'
import Logo from '../media/logo.png'
import Container from '../UI/Container'
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from '../../store/hooks/useLocalStorage';
import { fetchHeroes, filterAction } from '../../store/slice/heroesSlice';

export default function Search({setFilterHero, setResultsList, setItemId, setNameId, nameId}) {

  const dispatch = useDispatch();

  const heroesList = useSelector(({heroes}) => heroes.list);
  // console.log('Search', heroesList);

  const [ input, setInput ] = useLocalStorage('input', '');
  // console.log('input',input );

  useEffect(() => {
    dispatch(filterAction(input));
  }, [input, dispatch, heroesList]);

  const handlerChange = (value) => {
    setInput(value);
    if (value !== '') {
      heroData(value);
      dispatch(fetchHeroes(value));
   
    } else {
      dispatch(fetchHeroes(value = undefined));
      heroData('');
    }
  };
  

  const [ results, setResults] = useState([]);

  const heroData = (value) => {
    const results = heroesList.filter((hero) => {
      return value && hero && hero.name && hero.name.toLowerCase().includes(value)
    })
    console.log('results', results);
    setResults(results);
    
  };

    const [ pressEnter, setPressEnter] = useState();

    const onKeyDown = e =>{
        if(e.keyCode === 13){
          setPressEnter(e.key);
          console.log("enter", pressEnter);
          setResultsList(results);
          setFilterHero(pressEnter)
          setInput('');
          heroData('');
          setItemId('');
          setNameId('');
        } 
      }
      
      const onClick = () => {
        setResultsList(results);
        setInput('');
        heroData('');
      };

      const button = (value) => {
        setFilterHero('');
        setItemId('');
        setResultsList('');
        setNameId('');
        dispatch(fetchHeroes(value = undefined));
      }

  

  return (
    <Container>
        <div className={s.search_bar}>
          <img src={Logo} alt="" />
          <input className={s.search} 
            type="text" placeholder='Search Here' 
            value={input} onKeyDown={onKeyDown} onChange={({target}) => handlerChange(target.value)} 
          />
          <button className={s.button} onClick={() => button()}>Reset</button>
        </div>

        <div className={s.results_list}>
          {
            results.map((results, id) => {
                  return <div className={s.item} 
                  onClick={() => setItemId(results.id) ?? setNameId(results.name) ?? onClick()} 
                  key={id}>{results.name}</div>
              })
          }
        </div>
    </Container>
  )
}