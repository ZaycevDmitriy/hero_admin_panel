import HeroesList from '../heroesList';
import HeroesAddForm from '../heroesAddForm';
import HeroesFilters from '../heroesFilters';

import './app.scss';

const App = () => {

  return (
    <main className='app'>
      <div className='content'>
        <HeroesList />
        <div className='content__interactive'>
          <HeroesAddForm />
          <HeroesFilters />
        </div>
      </div>
    </main>
  );
};

export default App;
