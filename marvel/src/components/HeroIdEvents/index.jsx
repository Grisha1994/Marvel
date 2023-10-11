import React from 'react'
import s from './style.module.css'

export default function HeroIdEvents({thumbnail, title, description, start}) {
  return (
    <div className={s.card}>
        <div className={s.info}>
            <p>{title}</p>
            <p>{description}</p>
            <p>{start}</p>
        </div>
        <div className={s.img}>
            <img src={`${thumbnail.path}.${thumbnail.extension}`} alt="" />
        </div>
    </div>
  )
}
