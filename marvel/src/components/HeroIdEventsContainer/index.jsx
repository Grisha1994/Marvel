import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchHeroIdEvents } from '../../store/slice/heroIdEventsSlice';
import s from './style.module.css'
import Container from '../UI/Container';
import HeroIdEvents from '../HeroIdEvents';

export default function HeroIdEventsContainer() {
    const { id } = useParams();
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchHeroIdEvents(id));
    }, [id, dispatch])

    const eventsList = useSelector(({heroIdEvents}) => heroIdEvents);
    // console.log('heroIdEvents', eventsList);
    const status = useSelector(({heroIdEvents}) => heroIdEvents.status);

  return (
    <div>
    <Container className={s.container}>
      <p>Events</p>
      <div className={s.eventsList}>
        {
            status !== 'ready' ? ''
            :eventsList.list.map(item => <HeroIdEvents key={item.id} {...item}/>)
        }
      </div>
    </Container>
    </div>
  )
}
