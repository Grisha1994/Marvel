import React from 'react'
import { useSelector } from 'react-redux';
import Container from '../UI/Container';
import s from './style.module.css'
// import Hero from '../Hero';
import HeroIdComics from '../HeroIdComics';
import Search from '../Search';
import {motion} from 'framer-motion'

export default function ComicsContainer() {

    const comicsList = useSelector(({comics}) => comics.list);
    console.log('comicsList', comicsList);
    const status = useSelector(({comics}) => comics.status);

    const cardAnimation = {
      hidden: {
        x: 100,
        rotate: -30,
        opacity: 0,
      },
      visible: custom => ({
        x: 0,
        opacity: 1,
        rotate: 0,
        transition: { 
          delay: custom * 0.2,
          duration: 0.3
        }
      }),
    }

  return (
        <Container >
        
          <div 
            className={s.container}
          >
            {
              status !== 'ready' ? '' :
              (
                comicsList.map((el, index) => 
                <motion.div
                  key={el.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{amount: 0.2, once: true}}
                  custom={index + 1}
                  variants={cardAnimation}
                >
                    <HeroIdComics key={el.id} {...el} />
                </motion.div>
                )
              )
            }
          </div>
      </Container>
  )
}
