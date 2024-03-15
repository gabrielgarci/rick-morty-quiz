import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { PropsWithChildren } from 'react';

import {
  CombinedState,
  PreloadedState,
  Reducer,
  Store,
  configureStore,
} from '@reduxjs/toolkit';
import React from 'react';
import { NoInfer, Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

interface ExtendedRenderOptions<T> extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<CombinedState<NoInfer<T>>>;
  store?: Store<T>;
}

const setupStore = <T,>(
  storeReducer: Reducer<T>,
  preloadedState?: PreloadedState<CombinedState<NoInfer<T>>>
) => {
  return configureStore({
    reducer: storeReducer,
    preloadedState,
  });
};

export const getRenderWithProvidersInstance = <T,>(reducer: Reducer<T>) => {
  const renderWithProviders = (
    ui: React.ReactElement,
    extendedRenderOptions: ExtendedRenderOptions<T> = {}
  ) => {
    const {
      preloadedState,
      store = setupStore<T>(reducer, preloadedState),
      ...renderOptions
    } = extendedRenderOptions;

    const Wrapper = ({ children }: PropsWithChildren) => (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );

    return {
      store,
      ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    };
  };

  return renderWithProviders;
};
