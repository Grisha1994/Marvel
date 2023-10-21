import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '../UI/Container';
import s from './style.module.css';
import Hero from '../Hero';
import Search from '../Search';
import { useLocalStorage } from '../../store/hooks/useLocalStorage';
import { useContext } from 'react';
import context from '../../store/context/context';
import { useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { motion } from 'framer-motion';

export default function HeroContainer() {
  const heroesList = useSelector(({ heroes }) => heroes.list);
  const status = useSelector(({ heroes }) => heroes.status);

  const [filterHero, setFilterHero] = useState('');
  const [itemId, setItemId] = useLocalStorage('itemId', '');
  const [nameId, setNameId] = useLocalStorage('nameId', '');
  const [resultsList, setResultsList] = useLocalStorage('resultsList', '');

  const { setResultsHero } = useContext(context);
  setResultsHero(resultsList);

  const list = nameId === ''
    ? (resultsList === '' ? '' : resultsList.map((el) => <Hero key={el.id} {...el} />))
    : resultsList.filter((el) => (String(nameId) === el.name && Number(itemId) === el.id)).map((el) => <Hero key={el.id} {...el} />);

  const location = useLocation();

  const [scrollDirection, setScrollDirection] = useState(1); // 1 для прокрутки вправо, -1 для прокрутки влево
  const listRef = useRef();

  const checkForScrollPosition = () => {
    const { current } = listRef;
    if (current) {
      const { scrollLeft, scrollWidth, clientWidth } = current;

      if (scrollLeft === 0 || scrollLeft === scrollWidth - clientWidth) {
        // Если достигнуто начало или конец, изменяем направление прокрутки
        setScrollDirection(-scrollDirection);
      }
    }
  };

  const debounceCheckForScrollPosition = debounce(checkForScrollPosition, 0);

  const scrollContainerBy = (distance) =>
    listRef.current?.scrollBy({ left: distance, behavior: 'smooth' });

  useEffect(() => {
    const { current } = listRef;
    current?.addEventListener('scroll', debounceCheckForScrollPosition);

    const interval = setInterval(() => {
      scrollContainerBy(292 * scrollDirection);
    }, 5000);

    return () => {
      current?.removeEventListener('scroll', debounceCheckForScrollPosition);
      debounceCheckForScrollPosition.cancel();
      clearInterval(interval);
    };
  }, [scrollDirection]);

  const cardAnimation = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: (custom) => ({
      x: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <div>
      {location.pathname === '/' ? '' : <Search setFilterHero={setFilterHero} setResultsList={setResultsList} setItemId={setItemId} setNameId={setNameId} nameId={nameId} />}
      <Container>
        <div className={location.pathname === '/' ? s.main : s.container} ref={listRef}>
          {status !== 'ready'
            ? ''
            : location.pathname === '/'
            ? heroesList.map((el) => <Hero key={el.id} {...el} />)
            : filterHero === 'Enter' || list.length !== 0
            ? list
            : heroesList.map((el, index) => (
                <motion.div
                  key={el.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.2, once: true }}
                  custom={index + 1}
                  variants={cardAnimation}
                >
                  <Hero key={el.id} {...el} />
                </motion.div>
              ))}
        </div>
      </Container>
      {location.pathname === '/' ? (
        <div className={s.wrapper_button}>
          <div type="button" onClick={() => scrollContainerBy(-292)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" fill="none">
            <path d="M338 419L175 256L338 93"  stroke-width="24" stroke-linecap="round"/>
          </svg>
          </div>
          <div type="button" onClick={() => scrollContainerBy(292)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" fill="none">
              <path d="M175 419L338 256L175 93"  stroke-width="24" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
