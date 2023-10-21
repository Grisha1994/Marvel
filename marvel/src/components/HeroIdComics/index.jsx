import React from 'react'
import s from './style.module.css'
import ImageNotFound from '../media/image_not_available.jpg'
import {motion} from 'framer-motion'

export default function HeroIdComics({title, images}) {
    
  return (
    <motion.div className={s.card}>
        <img src={images[0] === undefined ? ImageNotFound : `${images[0].path}.${images[0].extension}`} alt="" />
      <div className={s.info}>
        <p>{title}</p>
      </div>
    </motion.div>
  )
}
