// import React, { useState } from 'react'
// import { useSelector } from 'react-redux';
// import Container from '../UI/Container';
// import s from './style.module.css'
// import Hero from '../Hero';
// import Search from '../Search';
// import SearchResults from '../SearchResults';

// export default function HeroContainer() {

//     const heroesList = useSelector(({heroes}) => heroes);
//     // console.log(heroesList);
//     const status = useSelector(({heroes}) => heroes.status);

//     const [ results, setResults] = useState([]);

//     const [ listId, setId] = useState();
//     // console.log('id передан', listId);

//     const find = listId === undefined ? '' : heroesList.list.filter(item => listId === item.id);
//     // console.log(find);
    
//     const [ pressEnter, setPressEnter] = useState();

//     const onKeyDown = e =>{
//       // обработайте нажатие клавиши. 
//         if(e.keyCode === 13){
//           const pressEnter = e.key;
//           setPressEnter(pressEnter);
//           setInput('');
//           console.log(pressEnter);
//         } 
//       }
//       const [ input, setInput ] = useState("");
//       console.log('hel',input );

//       const handlerChange = (value) => {
//         setInput(value)
//         heroData(value)
//         onKeyDown('')
//         // setPressEnter('');
//       }
      
//       const onClick = () =>{
//         setInput('');
//         heroData('');
//       }

//       const heroData = (value) => {
//         const results = heroesList.list.filter((hero) => {
//           return value && hero && hero.name && hero.name.toLowerCase().includes(value)
//         });
//         console.log('results', results);
//         setResults(results);
//       };

//   return (
//     <div>
//       <Search heroesList={heroesList} setResults={setResults} onKeyDown={onKeyDown} input={input} handlerChange={handlerChange} heroData={heroData}/>
//       <SearchResults results={results} setId={setId} pressEnter={pressEnter} onClick={onClick} onKeyDown={onKeyDown}/>
//       <Container className={s.container}>
//           {
//               status !== 'ready' ? '' : 
//                 ((listId !== undefined 
//                   ? (find.map(item => <Hero key={item.id} {...item}/>)) 
//                   : pressEnter === 'Enter' ?
//                     results.map(item => <Hero key={item.id} {...item}/>)
//                   : (heroesList.list.map(item => <Hero key={item.id} {...item}/>))) 

//                 )
//           }
//       </Container>
//     </div>
//   )
// }



import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Container from '../UI/Container';
import s from './style.module.css'
import Hero from '../Hero';
import Search from '../Search';
import { useLocalStorage } from '../../store/hooks/useLocalStorage';

export default function HeroContainer() {

    const heroesList = useSelector(({heroes}) => heroes.list);
    // console.log('heroesList', heroesList);
    const status = useSelector(({heroes}) => heroes.status);

    const [ filterHero, setFilterHero ] = useState('');
    // console.log("filterHero", filterHero);

    const [ itemId, setItemId ] = useLocalStorage('itemId', '');
    // console.log('id peredan', itemId);

    const [ resultsList, setResultsList] = useLocalStorage('resultsList', []);

    const list = itemId === '' 
    ? (resultsList === '' ? '' : resultsList.map((el) => <Hero key={el.id} {...el} />))
    : heroesList.filter((el) => Number(itemId) === el.id).map((el) => <Hero key={el.id} {...el} />);
    // console.log("resultsList", resultsList);
    // console.log("list", list);


  return (
    <div>
      <Search setFilterHero={setFilterHero} setResultsList={setResultsList} setItemId={setItemId} />
      <Container className={s.container}>
          {
            status !== 'ready' ? '' : 
            (filterHero === "Enter" || list.length !== 0) ?
            list
            :heroesList.map((el) => <Hero key={el.id} {...el} />)
     
          }
      </Container>
    </div>
  )
}