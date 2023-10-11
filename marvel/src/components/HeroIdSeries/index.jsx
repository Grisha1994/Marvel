import React from 'react'
import s from './style.module.css'

export default function HeroIdSeries({thumbnail, title, rating, startYear, endYear}) {
  return (
    <div className={s.card}>
        <div className={s.img}>
            <img src={`${thumbnail.path}.${thumbnail.extension}`} alt="" />
        </div>
        <div className={s.info}>
            <p>{title}</p>
            {rating && <p> rating: {rating}</p>}
                <div className={s.year}>
                    <p>start: {startYear}</p>
                    <p>end: {endYear}</p>
                </div>
        </div>
    </div>
  )
}
