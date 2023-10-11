import React from 'react'
import s from './style.module.css'
import Container from '../UI/Container'

export default function SearchResults({results, setId, onClick}) {
  
  return (
    <Container className={s.results_list}>
        {
          results.map((results, id) => {
                return <div className={s.item} onClick={() => setId(results.id) ?? onClick()} key={id}>{results.name}</div>
            })
        }
    </Container>
  )
}
