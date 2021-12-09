import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHero, filtersFetched } from '../../actions';
import { v4 as uuidv4 } from 'uuid';
import { useHttp } from '../../hooks';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
  const { register, handleSubmit, reset, formState: { isSubmitSuccessful } } = useForm();
  const { filters, filtersLoadingStatus } = useSelector(state => state.filters);
  const dispatch = useDispatch();
  const { request } = useHttp();


  const onSubmit = (hero) => {
    const id = uuidv4();
    request('http://localhost:3001/heroes', 'POST', JSON.stringify({ ...hero, id }))
      .then(res => console.log(res, 'Отправлено успешно'))
      .then(() => dispatch(addHero({ ...hero, id })))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    request('http://localhost:3001/filters')
      .then(data => dispatch(filtersFetched(data)))
      .catch(e => console.error(e));
    // eslint-disable-next-line
  }, []);

  const renderOptions = (filters, status) => {
    if (status === 'loading') {
      return <option>Загрузка...</option>;
    } else if (status === 'error') {
      return <option>Ошибка загрузки</option>;
    } else {
      return filters.map(({ name, label }) => {
        // eslint-disable-next-line array-callback-return
        if (name === 'all') return;
        return (
          <option key={uuidv4()} value={name}>
            {label}
          </option>
        );
      });
    }
  };

  const elements = renderOptions(filters, filtersLoadingStatus);

  return (
    <form className='border p-4 shadow-lg rounded' onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-3'>
        <label htmlFor='name' className='form-label fs-4'>Имя нового героя</label>
        <input
          type='text'
          className='form-control'
          id='name'
          placeholder='Как меня зовут?'
          {...register('name', { required: true })}
        />
      </div>

      <div className='mb-3'>
        <label htmlFor='text' className='form-label fs-4'>Описание</label>
        <textarea
          className='form-control'
          id='text'
          placeholder='Что я умею?'
          style={{ 'height': '130px' }}
          {...register('description', { required: true })}
        />
      </div>

      <div className='mb-3'>
        <label htmlFor='element' className='form-label'>Выбрать элемент героя</label>
        <select
          className='form-select'
          id='element'
          {...register('element', { required: true })}
        >
          <option key={uuidv4()} value=''>Я владею элементом...</option>
          {elements}
        </select>
      </div>

      <button type='submit' className='btn btn-primary'>Создать</button>
    </form>
  );
};

export default HeroesAddForm;
