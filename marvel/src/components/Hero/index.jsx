import React from 'react'
import s from './style.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'

export default function Hero({id, name, thumbnail}) {

  const navigate = useNavigate();
  const location = useLocation();
  const style = location.pathname === '/' ? s.main : s.card;

  const cardAnimation = {
    hidden: {
      y: -200,
      // rotate: -30,
      opacity: 0,
    },
    visible: custom => ({
      y: 0,
      opacity: 1,
      // rotate: 0,
      transition: { 
        delay: custom * 0.2,
        duration: 0.01
      }
    }),
  }

  return (
    <div>
        {
          location.pathname === '/' ?
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{amount: 0.2}}
            variants={cardAnimation}
            className={style} key={id} onClick={() => navigate(`/heroesId/${id}`)}
          >
            <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
            <div className={s.title}>
                <p>{name}</p>
            </div>
          </motion.div>
          :
          <div className={style} key={id} onClick={() => navigate(`/heroesId/${id}`)}>
          <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
          <div className={s.title}>
              <p>{name}</p>
          </div>
          </div>
        }
    </div>
 
  )
}
