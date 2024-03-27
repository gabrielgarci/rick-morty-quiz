import style from './home.module.scss';

import { Button, ButtonType } from '@rick-morty-quiz/ui';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import title from '../assets/images/title.png';

const Home = () => (
  <div className={style.home}>
    <img className={style.home__title} src={title} alt="title"></img>
    <img className={style.home__logo} src={logo} alt="logo"></img>
    <div className={style.home__controllers}>
      <Link to="records">
        <Button type={ButtonType.Secondary} shadow={true}>
          RECORDS
        </Button>
      </Link>
      <Link to="game/create">
        <Button type={ButtonType.Primary} shadow={true}>
          NEW GAME
        </Button>
      </Link>
    </div>
  </div>
);

export default Home;
