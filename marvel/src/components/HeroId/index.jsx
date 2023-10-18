import React from 'react'
import s from './style.module.css'
import Container from '../UI/Container'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import HeroIdComicsContainer from '../HeroIdComicsContainer';
import HeroIdEventsContainer from '../HeroIdEventsContainer';
import HeroIdSeriesContainer from "../HeroIdSeriesContainer"
import HeroIdStoriesContainer from '../HeroIdStoriesContainer';

export default function HeroId({resultsHero}) {
  const { id } = useParams();
  const heroId = +id;
  const heroes = useSelector(({ heroes }) => heroes);
  console.log("heroes", heroes);

  const hero = heroes.status === 'ready' ? ( heroes.list.find(item => heroId === item.id) === undefined 
  ? resultsHero.find(item => heroId === item.id) : heroes.list.find(item => heroId === item.id)) : '';
  console.log("hero", hero);

  return (
    <Container>
      <div className={s.container}>
        {
          hero && (
            <div className={s.hero_box}>
              <div className={s.right_box}>
                <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} alt='' />
              </div>
              <div className={s.left_box}>
                <p>{hero.name}</p>
                <p>{hero.description}</p>
              </div>
            </div>
          )
        }
      </div>
      <HeroIdEventsContainer/>
      <HeroIdSeriesContainer/>
      <HeroIdStoriesContainer/>
      <HeroIdComicsContainer/> 
    </Container>
  )
}
