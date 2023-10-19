import React from 'react'
import s from './style.module.css'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Hero({id, name, thumbnail}) {

  const navigate = useNavigate();
  const location = useLocation();
  const style = location.pathname === '/' ? s.main : s.card;

  return (
    <div className={style} key={id} onClick={() => navigate(`/heroesId/${id}`)}>
        <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
        <div className={s.title}>
            <p>{name}</p>
        </div>
    </div>
  )
}
