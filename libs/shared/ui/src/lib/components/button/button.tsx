import { ButtonProps } from './button.interface';
import styles from './button.module.scss';

export const Button = (props: ButtonProps) => {
  const btnClasses = [styles.button];

  if (props.type) btnClasses.push(styles[`button--${props.type}`]);
  else btnClasses.push(styles['button--primary']);

  if (props.shadow) btnClasses.push(styles['button--shadow']);

  if (props.collapse) btnClasses.push(styles['button--collapse']);

  return (
    <button className={btnClasses.join(' ')} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
