import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Comics from '../HeroIdComics';
import Container from '../UI/Container';
import s from './style.module.css'
import { useParams } from 'react-router-dom';
import { fetchHeroIdComics } from '../../store/slice/heroIdComicsSlice';

export default function ComicsContainer() {

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroIdComics(id));
  }, [id, dispatch])

    const comicsList = useSelector(({heroIdComics}) => heroIdComics);
    // console.log(comicsList);
    const status = useSelector(({heroIdComics}) => heroIdComics.status);
    
  return (
    <Container className={s.container}>
      <p>Comics</p>
      <div className={s.comicsList}>
        {
            status !== 'ready' ? ''
            :comicsList.list.map(item => <Comics key={item.id} {...item}/>)
        }
      </div>
    </Container>
  )
}
