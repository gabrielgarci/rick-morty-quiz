import { fireEvent, render, screen } from '@testing-library/react';
import { Input } from './input';
import style from './input.module.scss';

describe('Input', () => {
  it('should display mandatory config', () => {
    const { baseElement } = render(
      <Input name="some" onChange={() => undefined} />
    );
    const divElement = screen.queryByTestId('input-wrapper');
    const fieldElement = screen.queryByTestId<HTMLInputElement>('input-field');
    const labelElement =
      screen.queryByTestId<HTMLParagraphElement>('input-label');
    const errorElement =
      screen.queryByTestId<HTMLParagraphElement>('input-error');

    const expectedClassList = style.input;

    expect(baseElement).toBeTruthy();
    expect(divElement?.classList.toString().trim()).toBe(expectedClassList);
    expect(fieldElement).toBeTruthy();
    expect(labelElement).toBeFalsy();
    expect(errorElement?.innerText).toBeFalsy();
  });

  it('should display optional config', () => {
    const placeholder = 'placeholder';
    const value = 'value';
    const errorMessage = 'errorMessage';
    const label = 'label';

    const { baseElement } = render(
      <Input
        name="some"
        onChange={() => undefined}
        placeholder={placeholder}
        value={value}
        errorMessage={errorMessage}
        label={label}
      />
    );
    const divElement = screen.queryByTestId('input-wrapper');
    const fieldElement = screen.queryByTestId<HTMLInputElement>('input-field');
    const labelElement = screen.queryByTestId('input-label');
    const errorElement = screen.queryByTestId('input-error');

    const expectedClassList = `${style.input} ${style['input--error']}`;

    expect(baseElement).toBeTruthy();
    expect(divElement?.classList.toString().trim()).toBe(expectedClassList);
    expect(labelElement?.innerHTML).toBe(label);
    expect(fieldElement?.value).toBe(value);
    expect(fieldElement?.placeholder).toBe(placeholder);
    expect(errorElement?.innerHTML).toBe(errorMessage);
  });

  it('should emit change', () => {
    const onChangeSpy = vi.fn();
    const name = 'some';
    render(<Input name={name} onChange={onChangeSpy} />);

    const mockValue = 'mock';
    const expectedEvent = {
      target: { name, value: mockValue },
    };

    const fieldElement = screen.queryByTestId<HTMLInputElement>('input-field');

    if (!fieldElement) {
      expect(true).toBe(false);
      return;
    }

    fieldElement.value = mockValue;

    fireEvent.blur(fieldElement);

    expect(onChangeSpy).toBeCalledTimes(1);
    expect(onChangeSpy).toBeCalledWith(expectedEvent);
  });
});
