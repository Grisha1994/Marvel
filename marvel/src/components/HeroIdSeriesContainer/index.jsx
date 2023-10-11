import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchHeroIdSeries } from '../../store/slice/heroIdSeriesSlice';
import s from './style.module.css'
import Container from '../UI/Container';
import HeroIdSeries from '../HeroIdSeries';


export default function HeroIdEventsContainer() {
    const { id } = useParams();
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchHeroIdSeries(id));
    }, [id, dispatch])

    const seriesList = useSelector(({heroIdSeries}) => heroIdSeries);
    console.log('heroIdSeries', seriesList);
    const status = useSelector(({heroIdSeries}) => heroIdSeries.status);

  return (
    <div>
    <Container className={s.container}>
      <p>Series</p>
      <div className={s.eventsList}>
        {
            status !== 'ready' ? ''
            :seriesList.list.map(item => <HeroIdSeries key={item.id} {...item}/>)
        }
      </div>
    </Container>
    </div>
  )
}
