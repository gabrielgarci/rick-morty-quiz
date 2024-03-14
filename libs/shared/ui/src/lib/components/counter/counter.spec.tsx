import { fireEvent, render, screen } from '@testing-library/react';
import { Counter } from './counter';
import styles from './counter.module.scss';

describe('Counter', () => {
  const name = 'field';
  const label = 'Some label';
  const onChange = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render Counter component', () => {
    const defaultValue = 0;
    render(<Counter name={name} label={label} onChange={onChange} />);

    const labelElement = screen.queryByText(label);
    const valueElement = screen.queryByText(defaultValue);

    expect(labelElement).toBeTruthy();
    expect(valueElement).toBeTruthy();
  });

  it('should throw an error if min and max value are not compatible', () => {
    const minValue = 5;
    const maxValue = 1;

    const expectedErrorMessage = `[Counter] 'minValue' (${minValue}) can't be higher than 'maxValue'(${maxValue})`;

    const rendering = () =>
      render(
        <Counter
          name={name}
          label={label}
          onChange={onChange}
          minValue={minValue}
          maxValue={maxValue}
        />
      );
    expect(rendering).toThrow(expectedErrorMessage);
  });

  it('should emit onChange value with default step if increase arrow is clicked and value is lower than maxValue', () => {
    const initialValue = 0;
    const defaultStep = 1;

    render(
      <Counter
        name={name}
        label={label}
        onChange={onChange}
        value={initialValue}
      />
    );

    const increaseArrowElement = screen.queryByAltText('increase quantity');

    if (!increaseArrowElement) {
      expect(false).toBe(true);
      return;
    }

    const expectedEvent = {
      target: { name, value: initialValue + defaultStep },
    };

    fireEvent.click(increaseArrowElement);
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith(expectedEvent);
  });

  it('should emit onChange value with custom step if increase arrow is clicked and value is lower than maxValue', () => {
    const initialValue = 0;
    const customStep = 5;

    render(
      <Counter
        name={name}
        label={label}
        onChange={onChange}
        value={initialValue}
        step={customStep}
      />
    );

    const increaseArrowElement = screen.queryByAltText('increase quantity');

    if (!increaseArrowElement) {
      expect(false).toBe(true);
      return;
    }

    const expectedEvent = {
      target: { name, value: initialValue + customStep },
    };

    fireEvent.click(increaseArrowElement);
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith(expectedEvent);
  });

  it('should not emit onChange if value maxValue is reached', () => {
    const initialValue = 5;

    render(
      <Counter
        name={name}
        label={label}
        onChange={onChange}
        value={initialValue}
        maxValue={initialValue}
      />
    );

    const increaseArrowElement = screen.queryByAltText('increase quantity');

    if (!increaseArrowElement) {
      expect(false).toBe(true);
      return;
    }

    expect(increaseArrowElement.classList).toContain(styles['arrow--disabled']);

    fireEvent.click(increaseArrowElement);

    expect(onChange).not.toBeCalled();
  });

  it('should emit onChange value with default step if decrease arrow is clicked and value is higher than minValue', () => {
    const initialValue = 0;
    const defaultStep = 1;

    render(
      <Counter
        name={name}
        label={label}
        onChange={onChange}
        value={initialValue}
      />
    );

    const decreaseArrowElement = screen.queryByAltText('decrease quantity');

    if (!decreaseArrowElement) {
      expect(false).toBe(true);
      return;
    }

    const expectedEvent = {
      target: { name, value: initialValue - defaultStep },
    };

    fireEvent.click(decreaseArrowElement);
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith(expectedEvent);
  });

  it('should emit onChange value with custom step if decrease arrow is clicked and value is higher than minValue', () => {
    const initialValue = 0;
    const customStep = 5;

    render(
      <Counter
        name={name}
        label={label}
        onChange={onChange}
        value={initialValue}
        step={customStep}
      />
    );

    const decreaseArrowElement = screen.queryByAltText('decrease quantity');

    if (!decreaseArrowElement) {
      expect(false).toBe(true);
      return;
    }

    const expectedEvent = {
      target: { name, value: initialValue - customStep },
    };

    fireEvent.click(decreaseArrowElement);
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith(expectedEvent);
  });

  it('should not emit onChange if value maxValue is reached', () => {
    const initialValue = 5;

    render(
      <Counter
        name={name}
        label={label}
        onChange={onChange}
        value={initialValue}
        minValue={initialValue}
      />
    );

    const decreaseArrowElement = screen.queryByAltText('decrease quantity');

    if (!decreaseArrowElement) {
      expect(false).toBe(true);
      return;
    }

    expect(decreaseArrowElement.classList).toContain(styles['arrow--disabled']);

    fireEvent.click(decreaseArrowElement);

    expect(onChange).not.toBeCalled();
  });
});
