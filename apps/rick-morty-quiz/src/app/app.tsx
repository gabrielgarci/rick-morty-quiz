import style from './app.module.scss';

import title from '../assets/images/title.png';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { Button, ButtonType } from '@rick-morty-quiz/ui';

const App = () => (
  <div className={style.home}>
    <img className={style.home__title} src={title} alt="title"></img>
    <img className={style.home__logo} src={logo} alt="logo"></img>
    <div className={style.home__controllers}>
      <Link to="./records">
        <Button type={ButtonType.Secondary} shadow={true}>
          RECORDS
        </Button>
      </Link>
      <Link to="./game/settings">
        <Button type={ButtonType.Primary} shadow={true}>
          NEW GAME
        </Button>
      </Link>
    </div>
  </div>
);

export default App;
