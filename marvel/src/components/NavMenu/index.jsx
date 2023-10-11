import React from 'react'
import Container from '../UI/Container'
import s from './style.module.css'
import { NavLink } from 'react-router-dom'
import Marvel from '../media/marvel_krasivo_slice.jpg'

export default function NavMenu() {
  return (

    <div className={s.main}>
      <div className={s.bg}>
          <img src={Marvel} alt="" />
      </div>
      <Container className={s.container}>
          <NavLink to={'/'}>Main Page</NavLink>
          <NavLink to={'/comics'}>Comics</NavLink>
          <NavLink to={'/heroes'}>Characters</NavLink>
          <NavLink>Creators</NavLink>
          <NavLink>Events</NavLink>
          <NavLink>Series</NavLink>
          <NavLink>Stories</NavLink>
      </Container>
    </div>

  )
}
