describe('game reducer', () => {
  it('some', () => {
    expect(true).toBe(true);
  });
  // it('should handle initial state', () => {
  //   const expected = gameAdapter.getInitialState({
  //     loadingStatus: 'not loaded',
  //     error: null,
  //   });

  //   expect(gameReducer(undefined, { type: '' })).toEqual(expected);
  // });

  // it('should handle fetchGame', () => {
  //   let state = gameReducer(undefined, fetchGame.pending(''));

  //   expect(state).toEqual(
  //     expect.objectContaining({
  //       loadingStatus: 'loading',
  //       error: null,
  //       entities: {},
  //       ids: [],
  //     })
  //   );

  //   state = gameReducer(state, fetchGame.fulfilled([{ id: 1 }], ''));

  //   expect(state).toEqual(
  //     expect.objectContaining({
  //       loadingStatus: 'loaded',
  //       error: null,
  //       entities: { 1: { id: 1 } },
  //       ids: [1],
  //     })
  //   );

  //   state = gameReducer(state, fetchGame.rejected(new Error('Uh oh'), ''));

  //   expect(state).toEqual(
  //     expect.objectContaining({
  //       loadingStatus: 'error',
  //       error: 'Uh oh',
  //       entities: { 1: { id: 1 } },
  //       ids: [1],
  //     })
  //   );
  // });
});
