import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Foo from '../index';

describe('<Foo />', () => {
  test('should render default', () => {
    const { container } = render(
      <Foo />,
    );
    expect(container).toMatchSnapshot();
  });
});
