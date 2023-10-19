import React, { useEffect, useRef, useState } from 'react'
import {  useSelector } from 'react-redux';
import Container from '../UI/Container';
import s from './style.module.css'
import Hero from '../Hero';
import Search from '../Search';
import { useLocalStorage } from '../../store/hooks/useLocalStorage';
import { useContext } from 'react';
import context from '../../store/context/context';
import { useLocation } from 'react-router-dom';
import debounce from "lodash.debounce";


export default function HeroContainer() {

    const heroesList = useSelector(({heroes}) => heroes.list);
    // console.log('heroesList', heroesList);
    const status = useSelector(({heroes}) => heroes.status);
    console.log(status);

    const [ filterHero, setFilterHero ] = useState('');
    // console.log("filterHero", filterHero);

    const [ itemId, setItemId ] = useLocalStorage('itemId', '');
    const [ nameId, setNameId ] = useLocalStorage('nameId', '');
    // console.log('id peredan', itemId);
    console.log('name peredan', nameId);

    const [ resultsList, setResultsList] = useLocalStorage('resultsList', []);

    const {setResultsHero} = useContext(context);
    setResultsHero(resultsList);

    const list = nameId === '' 
    ? (resultsList === '' ? '' : resultsList.map((el) => <Hero key={el.id} {...el} />))
    : resultsList.filter((el) => (String(nameId) === el.name && Number(itemId) === el.id)).map((el) => <Hero key={el.id} {...el} />);
    // console.log("resultsList", resultsList);
    // console.log("list", list);
    const location = useLocation();



  const [canScrollLeft, setCanScrollLeft] = useLocalStorage('canScrollLeft', false);
  const [canScrollRight, setCanScrollRight] = useLocalStorage('canScrollRight', false);

  const listRef = useRef();

  const [isRestarting, setIsRestarting] = useState(false); // Состояние для отслеживания задержки перед рестартом

  const checkForScrollPosition = () => {
    const { current } = listRef;
    if (current) {
      const { scrollLeft, scrollWidth, clientWidth } = current;

      if (scrollLeft === scrollWidth - clientWidth) {
        if (!isRestarting) {
          // Достигнут конец, начните задержку перед рестартом
          setIsRestarting(true);
          setCanScrollRight(false);
          setTimeout(() => {
            // По истечении задержки начните прокрутку заново
            current.scrollTo({ left: 0, behavior: "smooth" });
            setIsRestarting(false);
            setCanScrollRight(true);
          }, 5000); // Измените значение на желаемую задержку в миллисекундах (в данном случае 5000 миллисекунд или 5 секунд)
        }
      } else {
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(true);
      }
    }
  };

  
  const debounceCheckForScrollPosition = debounce(checkForScrollPosition, 0);

  const scrollContainerBy = (distance) =>
    listRef.current?.scrollBy({ left: distance, behavior: "smooth" });

  useEffect(() => {
    setCanScrollLeft(false);
    setCanScrollRight(true);
    const { current } = listRef;
    current?.addEventListener("scroll", debounceCheckForScrollPosition);

    const interval = setInterval(() => {
      if (canScrollRight) {
        scrollContainerBy(292); // Измените значение на то, насколько быстро должна выполняться прокрутка
      }
    }, 5000);

    return () => {
      current?.removeEventListener("scroll", debounceCheckForScrollPosition);
      debounceCheckForScrollPosition.cancel();
      clearInterval(interval);
    };
    
  }, []);

  
  return (
    <div>
      {
        location.pathname === '/' ? '' : <Search setFilterHero={setFilterHero} setResultsList={setResultsList} setItemId={setItemId} setNameId={setNameId} nameId={nameId}/>
      }
      <Container>
        <div className={location.pathname === '/' ? s.main : s.container} ref={listRef}>
          {
            status !== 'ready' ? '' : 
            (
            location.pathname === '/' ? heroesList.map((el) => <Hero key={el.id} {...el} />)
            :
            ((filterHero === "Enter" || list.length !== 0 ) ?
            list
            :heroesList.map((el) => <Hero key={el.id} {...el} />))
            )
          }
          </div>
        </Container>
          {
            location.pathname === '/' ?
            <div className={s.wrapper_button}>
                <button
                    type="button"
                    disabled={!canScrollLeft}
                    onClick={() => scrollContainerBy(-292)}
                >←</button>

                <button
                  type="button"
                  disabled={!canScrollRight}
                  onClick={() => scrollContainerBy(292)}
                >→</button>
            </div>
            : ''
          }
      

    </div>
  )
}