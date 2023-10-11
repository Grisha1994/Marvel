import React from 'react'
import s from './style.module.css'
import { useNavigate } from 'react-router-dom'

export default function Hero({id, name, thumbnail}) {

  const navigate = useNavigate();

  return (
    <div className={s.card} key={id} onClick={() => navigate(`/heroesId/${id}`)}>
        <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
        <div className={s.title}>
            <p>{name}</p>
        </div>
    </div>
  )
}
