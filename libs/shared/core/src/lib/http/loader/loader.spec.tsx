import { render } from '@testing-library/react';

import { Loader } from './loader';

describe('Loader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Loader>
        <p>some</p>
      </Loader>
    );
    expect(baseElement).toBeTruthy();
  });
});
