import React from 'react'
import { useSelector } from 'react-redux';
import Container from '../UI/Container';
import s from './style.module.css'
import Hero from '../Hero';
import HeroIdComics from '../HeroIdComics';
import Search from '../Search';

export default function ComicsContainer() {

    const comicsList = useSelector(({comics}) => comics);
    console.log('comicsList', comicsList);
    const status = useSelector(({comics}) => comics.status);

  return (
        <Container >
        <Search/>
          <div className={s.container}>
            {
              status !== 'ready' ? '' : 
              comicsList.map((el) => <HeroIdComics key={el.id} {...el} />)
      
            }
          </div>
      </Container>
  )
}
