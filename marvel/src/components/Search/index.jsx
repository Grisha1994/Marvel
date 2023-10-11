// import React from 'react'
// import s from './style.module.css'
// import Logo from '../media/logo.png'
// import Container from '../UI/Container'

// export default function Search({ onKeyDown, input, handlerChange}) {

//   return (
//     <Container className={s.search_bar}>
//         <img src={Logo} alt="" />
//         <input className={s.search} 
//           type="text" placeholder='Search Here' 
//           value={input} onKeyDown={onKeyDown} onChange={(e) => handlerChange(e.target.value)} 
//         />
//     </Container>
//   )
// }


import React, { useEffect, useState } from 'react'
import s from './style.module.css'
import Logo from '../media/logo.png'
import Container from '../UI/Container'
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from '../../store/hooks/useLocalStorage';
import { fetchHeroes, filterAction } from '../../store/slice/heroesSlice';

export default function Search({setFilterHero, setResultsList, setItemId, itemId}) {

  const dispatch = useDispatch();

  const heroesList = useSelector(({heroes}) => heroes.list);
  // console.log('Search', heroesList);

  const [ input, setInput ] = useLocalStorage('input', '');
  // console.log('input',input );

  useEffect(() => {
    dispatch(filterAction(input));
  }, [input, dispatch, heroesList]);

  // const handlerChange = (value) => {
  //   setInput(value);
  //   heroData(value);
  //   dispatch(fetchHeroes(value));
  //   console.log('fetchHeroes', fetchHeroes);
  //   // setSearch(value);
  // };

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
        } 
      }
      
      const onClick = () => {
        setInput('');
        heroData('');
      };

      const button = (value) => {
        setFilterHero('');
        setItemId('');
        setResultsList('');
        dispatch(fetchHeroes(value = undefined));
      }

      // const [search,setSearch]=useState("");
      // dispatch(fetchHeroes(value));
      // const searchMarvel=()=>{
      //   setUrl(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${search}&ts=1&apikey=424ae629db1dc34aad8fdae51e9870fa&hash=62378746f01b982b7b81d9f7d8e6db8e`)
      // }

  return (
    <Container>
        <div className={s.search_bar}>
          <img src={Logo} alt="" />
          <input className={s.search} 
            type="text" placeholder='Search Here' 
            value={input} onKeyDown={onKeyDown} onChange={({target}) => handlerChange(target.value)} 
          />
          <button className={s.button} onClick={() => button()}>All heroes</button>
        </div>

        <div className={s.results_list}>
          {
            results.map((results, id) => {
                  return <div className={s.item} 
                  onClick={() => setItemId(results.id) ?? onClick()} 
                  key={id}>{results.name}</div>
              })
          }
        </div>
    </Container>
  )
}