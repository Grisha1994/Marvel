import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchHeroIdStories } from '../../store/slice/heroIdStoriesSlice';
import s from './style.module.css'
import Container from '../UI/Container';
import HeroIdStories from '../HeroIdStories';


export default function HeroIdStoriesContainer() {
    const { id } = useParams();
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchHeroIdStories(id));
    }, [id, dispatch])

    const storiesList = useSelector(({heroIdStories}) => heroIdStories);
    // console.log('Stories', storiesList);
    const status = useSelector(({heroIdStories}) => heroIdStories.status);

  return (
    <div>
    <Container className={s.container}>
      <p>Stories</p>
      <div className={s.eventsList}>
        {
            status !== 'ready' ? ''
            :storiesList.list.map(item => <HeroIdStories key={item.id} {...item}/>)
        }
      </div>
    </Container>
    </div>
  )
}

