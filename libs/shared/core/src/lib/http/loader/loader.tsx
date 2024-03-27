import { useEffect, useState } from 'react';
import mortySpinner from '../../../assets/images/morty-face.png';
import { http } from '../axios';
import { LoaderProps } from './loader.interface';
import style from './loader.module.scss';

let pendingRequest = 0;
/** Flag to indicate if spinner spent minimum time to avoid blink effect */
let spinnerSpendMinTime = true;
/** Timeout to handle if response last at least minimum time to avoid show spinner in fast requests */
let minTimeToShowTimeout: NodeJS.Timeout;
/** Minimum response delay to show spinner */
const MIN_RESPONSE_TIME_TO_SHOW_SPINNER = 300;
/** Minimum time spinner is displayed once MIN_RESPONSE_TIME_TO_SHOW_SPINNER was exceeded */
const MIN_TIME_DISPLAYING_SPINNER = 1000;

export const Loader = (props: LoaderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const displaySpinner = () => {
    spinnerSpendMinTime = false;
    setIsLoading(true);
    setTimeout(() => {
      spinnerSpendMinTime = true;
      if (!pendingRequest) {
        setIsLoading(false);
      }
    }, MIN_TIME_DISPLAYING_SPINNER);
  };

  const registerNewRequest = () => {
    pendingRequest++;
    if (minTimeToShowTimeout) clearTimeout(minTimeToShowTimeout);
    minTimeToShowTimeout = setTimeout(() => {
      displaySpinner();
    }, MIN_RESPONSE_TIME_TO_SHOW_SPINNER);
  };

  const registerResponsedRequest = () => {
    pendingRequest--;

    if (pendingRequest) return;

    if (!minTimeToShowTimeout && spinnerSpendMinTime) {
      clearTimeout(minTimeToShowTimeout);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    http.interceptors.request.use((req) => {
      registerNewRequest();
      return req;
    });
    http.interceptors.response.use((res) => {
      registerResponsedRequest();
      return res;
    });
  }, []);

  return isLoading ? (
    <div className={style.spinner}>
      <div className={style['spinner__frame']}>
        <img className={style.pic} src={mortySpinner} alt="Loading" />
      </div>
      <p className={style['spinner__text']}></p>
    </div>
  ) : (
    props.children
  );
};
