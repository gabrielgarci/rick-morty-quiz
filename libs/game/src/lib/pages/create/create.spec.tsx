import { fireEvent, screen } from '@testing-library/react';

import { http } from '@rick-morty-quiz/core';
import { Character } from '../../models';
import { renderWithProviders } from '../../store/game.slice';
import Create from './create';

describe('Create', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<Create />);
    expect(baseElement).toBeTruthy();
  });

  it('should avoid submit if no name is providen', () => {
    renderWithProviders(<Create />);

    const acceptButton = screen
      .queryAllByRole('button')
      .find((button) => button.innerHTML === 'ACCEPT');

    if (!acceptButton) {
      expect(true).toBe(false);
      return;
    }

    fireEvent.click(acceptButton);

    const nameError = screen.queryByTestId('input-error');
    expect(nameError).toBeTruthy();
    expect(nameError?.innerHTML).toBe('*Name must have at least 3 characters');
  });

  it('should avoid submit if name is no long enough', () => {
    const axiosGetRequest = vi.fn();
    http.get = axiosGetRequest;

    renderWithProviders(<Create />);

    const acceptButton = screen
      .queryAllByRole('button')
      .find((button) => button.innerHTML === 'ACCEPT');

    const nameInput = screen.queryByRole<HTMLInputElement>('textbox');

    if (!acceptButton || !nameInput) {
      expect(true).toBe(false);
      return;
    }

    fireEvent.blur(nameInput, { target: { value: 'Jo' } });

    const nameError = screen.queryByTestId('input-error');

    expect(nameError).toBeTruthy();
    expect(nameError?.innerHTML).toBe('*Name must have at least 3 characters');

    fireEvent.click(acceptButton);

    expect(http.get).not.toHaveBeenCalled();
  });
  it('should request for characters', async () => {
    const defaultRounds = 10;
    const mockName = 'Jon';

    const mockCharacterNumberResponse = {
      info: { count: 100 },
    };
    const mockCharactersList: Character[] = [];

    http.get = vi
      .fn()
      .mockReturnValueOnce(mockCharacterNumberResponse)
      .mockReturnValueOnce(mockCharactersList);

    const state = renderWithProviders(<Create />);

    const acceptButton = screen
      .queryAllByRole('button')
      .find((button) => button.innerHTML === 'ACCEPT');

    const nameInput = screen.queryByRole<HTMLInputElement>('textbox');

    if (!acceptButton || !nameInput) {
      expect(true).toBe(false);
      return;
    }

    fireEvent.blur(nameInput, { target: { value: mockName } });

    const nameError = screen.queryByTestId('input-error');

    expect(nameError?.innerHTML).toBeFalsy();

    fireEvent.click(acceptButton);

    await new Promise(process.nextTick);

    expect(http.get).toHaveBeenCalledTimes(2);
    expect(http.get).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character'
    );
    expect(http.get).toHaveBeenCalledWith(
      expect.stringMatching(
        new RegExp(
          `^https://rickandmortyapi.com/api/character/\\d+(,\\d+){${
            defaultRounds - 1
          }}$`
        )
      )
    );
    expect(state.store.getState()).toEqual({
      name: mockName,
      rounds: defaultRounds,
      currentRound: 1,
      score: 0,
      characters: mockCharactersList,
    });
  });
});
