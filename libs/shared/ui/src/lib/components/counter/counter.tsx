import { CounterProps } from './counter.interface';
import styles from './counter.module.scss';
import arrow from '../../assets/images/arrow.svg';
import { MouseEventHandler } from 'react';

const initializeValidator =
  (minValue: number | undefined, maxValue: number | undefined) =>
  (proposedValue: number): number => {
    const hasMinValue = !!minValue;
    const hasMaxValue = !!maxValue;

    if (hasMinValue && hasMaxValue && minValue > maxValue) {
      throw new Error(
        `[Counter] 'minValue' (${minValue}) can't be higher than 'maxValue'(${maxValue})`
      );
    }

    if (hasMinValue && proposedValue < minValue) return minValue;

    if (hasMaxValue && proposedValue > maxValue) return maxValue;

    return proposedValue;
  };

export const Counter = (counterProps: CounterProps) => {
  const { name, onChange, minValue, maxValue, label } = counterProps;
  const step = counterProps.step ?? 1;
  const calculateValidValue = initializeValidator(minValue, maxValue);
  const value = calculateValidValue(counterProps.value ?? 0);

  const handleNewValue = (proposedValue: number): void => {
    const finalValue = calculateValidValue(proposedValue);

    if (value !== finalValue) {
      onChange({ target: { name, value: finalValue } });
    }
  };

  const increase: MouseEventHandler<HTMLImageElement> = () => {
    const proposedValue = value + step;

    handleNewValue(proposedValue);
  };

  const decrease: MouseEventHandler<HTMLImageElement> = () => {
    const proposedValue = value - step;

    handleNewValue(proposedValue);
  };

  return (
    <div className={styles.counter}>
      <p className={styles['counter__label']}>{label}</p>
      <div className={styles['counter__controller']}>
        <img
          className={`${styles.arrow} ${styles['arrow--decrease']} ${
            value === minValue ? styles['arrow--disabled'] : ''
          }`}
          src={arrow}
          alt="decrease quantity"
          onClick={decrease}
        />
        <p className={styles.number}>{value}</p>
        <img
          className={`${styles.arrow} ${styles['arrow--increase']} ${
            value === maxValue ? styles['arrow--disabled'] : ''
          }`}
          src={arrow}
          alt="increase quantity"
          onClick={increase}
        />
      </div>
    </div>
  );
};
