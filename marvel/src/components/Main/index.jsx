import React from 'react'
import s from './style.module.css'
// import { useSelector } from 'react-redux';
// import Container from '../UI/Container';
// import Hero from '../Hero';
import HeroContainer from '../HeroContainer';

export default function Main() {

  // const heroesList = useSelector(({heroes}) => heroes.list);
  // const status = useSelector(({heroes}) => heroes.status);
  
  return (
    <div className={s.main}>
      {/* <Container className={s.container}>
          {
            status !== 'ready' ? '' 
            : heroesList.map((el) => <Hero key={el.id} {...el} />)
          }
      </Container> */}
      <HeroContainer/>
    </div>
  )
}
