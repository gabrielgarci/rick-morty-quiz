import { fireEvent, render, screen } from '@testing-library/react';

import styles from './button.module.scss';

import { ButtonType } from './button.interface';
import { Button } from './button';

describe('Button', () => {
  it('should render successfully with default data', () => {
    const buttonText = 'Some';
    const { baseElement } = render(<Button>{buttonText}</Button>);
    const buttonElement = screen.queryByRole('button');

    const expectedCssClasses = [styles.button, styles['button--primary']].join(
      ' '
    );

    expect(baseElement).toBeTruthy();
    expect(buttonElement?.innerHTML).toBe(buttonText);
    expect(buttonElement?.classList.toString()).toBe(expectedCssClasses);
  });

  it('should define custom type', () => {
    render(<Button type={ButtonType.Error}>Some</Button>);
    const buttonElement = screen.queryByRole('button');

    const expectedCssClasses = [styles.button, styles['button--error']].join(
      ' '
    );

    expect(buttonElement?.classList.toString()).toBe(expectedCssClasses);
  });

  it('should add shadow', () => {
    render(<Button shadow={true}>Some</Button>);
    const buttonElement = screen.queryByRole('button');

    const expectedCssClasses = [
      styles.button,
      styles['button--primary'],
      styles['button--shadow'],
    ].join(' ');

    expect(buttonElement?.classList.toString()).toBe(expectedCssClasses);
  });

  it('should collapse', () => {
    render(<Button collapse={true}>Some</Button>);
    const buttonElement = screen.queryByRole('button');

    const expectedCssClasses = [
      styles.button,
      styles['button--primary'],
      styles['button--collapse'],
    ].join(' ');

    expect(buttonElement?.classList.toString()).toBe(expectedCssClasses);
  });

  it('should emit on click function', () => {
    const mockFunc = vi.fn();
    render(<Button onClick={mockFunc}>Some</Button>);
    const buttonElement = screen.queryByRole('button');

    if (!buttonElement) {
      expect(false).toBe(true);
      return;
    }

    fireEvent.click(buttonElement);

    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});
