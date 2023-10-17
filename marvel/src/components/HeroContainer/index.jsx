// import React, { useState } from 'react'
// import { useSelector } from 'react-redux';
// import Container from '../UI/Container';
// import s from './style.module.css'
// import Hero from '../Hero';
// import Search from '../Search';
// import { useLocalStorage } from '../../store/hooks/useLocalStorage';

// export default function HeroContainer() {

//     const heroesList = useSelector(({heroes}) => heroes.list);
//     // console.log('heroesList', heroesList);
//     const status = useSelector(({heroes}) => heroes.status);

//     const [ filterHero, setFilterHero ] = useState('');
//     // console.log("filterHero", filterHero);

//     const [ itemId, setItemId ] = useLocalStorage('itemId', '');
//     // console.log('id peredan', itemId);

//     const [ resultsList, setResultsList] = useLocalStorage('resultsList', []);

//     const list = itemId === '' 
//     ? (resultsList === '' ? '' : resultsList.map((el) => <Hero key={el.id} {...el} />))
//     : heroesList.filter((el) => Number(itemId) === el.id).map((el) => <Hero key={el.id} {...el} />);
//     // console.log("resultsList", resultsList);
//     // console.log("list", list);


//   return (
//     <div>
//       <Search setFilterHero={setFilterHero} setResultsList={setResultsList} setItemId={setItemId} />
//       <Container className={s.container}>
//           {
//             status !== 'ready' ? '' : 
//             (filterHero === "Enter" || list.length !== 0) ?
//             list
//             :heroesList.map((el) => <Hero key={el.id} {...el} />)
     
//           }
//       </Container>
//     </div>
//   )
// }

import React, { useState } from 'react'
import {  useSelector } from 'react-redux';
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
    const [ nameId, setNameId ] = useLocalStorage('nameId', '');
    // console.log('id peredan', itemId);
    console.log('name peredan', nameId);

    const [ resultsList, setResultsList] = useLocalStorage('resultsList', []);

    const list = nameId === '' 
    ? (resultsList === '' ? '' : resultsList.map((el) => <Hero key={el.id} {...el} />))
    : resultsList.filter((el) => String(nameId) === el.name).map((el) => <Hero key={el.id} {...el} />);
    // console.log("resultsList", resultsList);
    // console.log("list", list);


  return (
    <div>
      <Search setFilterHero={setFilterHero} setResultsList={setResultsList} setItemId={setItemId} setNameId={setNameId} nameId={nameId}/>
      <Container className={s.container}>
          {
            status !== 'ready' ? '' : 
            (filterHero === "Enter" || list.length !== 0 ) ?
            list
            :heroesList.map((el) => <Hero key={el.id} {...el} />)
     
          }
      </Container>
    </div>
  )
}