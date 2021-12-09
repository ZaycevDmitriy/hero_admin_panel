import { useHttp } from '../../hooks';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { heroDeleted, heroesFetched, heroesFetching, heroesFetchingError } from '../../actions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { createSelector } from 'reselect';
import HeroesListItem from '../heroesListItem';
import Spinner from '../spinner';
import './heroesList.scss';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

  const filteredHeroesSelector = createSelector(
    state => state.filters.activeFilter,
    state => state.heroes.heroes,
    (filter, heroes) => {
      if (filter === 'all') {
        return heroes;
      } else {
        return heroes.filter(item => item.element === filter);
      }
    },
  );

  const { heroesLoadingStatus } = useSelector(state => state.heroes);
  const filteredHeroes = useSelector(filteredHeroesSelector);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const onDeleted = useCallback((id) => {
    request(`http://localhost:3001/heroes/${id}`, 'DELETE')
      .then(() => console.log('Герой удален'))
      .then(() => dispatch(heroDeleted(id)))
      .catch(err => console.error(err));
    // eslint-disable-next-line
  }, [request]);

  useEffect(() => {
    dispatch(heroesFetching());
    request('http://localhost:3001/heroes')
      .then(data => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));
    // eslint-disable-next-line
  }, []);

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (heroesLoadingStatus === 'error') {
    return <h5 className='text-center mt-5'>Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={0} className='hero text-center mt-5'>
          <h5>Героев пока нет</h5>
        </CSSTransition>
      );
    }
    return arr.map(({ id, ...props }) => {
      return (
        <CSSTransition key={id} timeout={300} className='hero'>
          <HeroesListItem {...props} onDeleted={onDeleted} id={id} />
        </CSSTransition>
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return (
    <TransitionGroup component='ul'>
      {elements}
    </TransitionGroup>
  );
};

export default HeroesList;
