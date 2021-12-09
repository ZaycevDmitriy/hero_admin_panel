// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks';
import { useEffect } from 'react';
import { changeActiveFilter, filtersFetched, filtersFetching, filtersFetchingError } from '../../actions';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';

const HeroesFilters = () => {
  const { filters, activeFilter } = useSelector(state => state.filters);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(filtersFetching());
    request('http://localhost:3001/filters')
      .then(data => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));
    // eslint-disable-next-line
  }, []);

  const onHandler = (e) => {
    dispatch(changeActiveFilter(e.target.name));
  };

  const renderButton = (arr) => {
    return arr.map(({ name, color, label }) => {
      const classActive = cn(
        {
          'active': name === activeFilter,
        },
      );
      return (
        <button key={uuidv4()} className={`btn ${color} ${classActive}`} name={name} onClick={onHandler}>
          {label}
        </button>
      );
    });
  };

  const elements = renderButton(filters);

  return (
    <div className='card shadow-lg mt-4'>
      <div className='card-body'>
        <p className='card-text'>Отфильтруйте героев по элементам</p>
        <div className='btn-group'>
          {elements}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
