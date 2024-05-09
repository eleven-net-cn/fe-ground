import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LayoutPercent from '../index';

describe('<LayoutPercent />', () => {
  test('should render default', () => {
    const { container } = render(
      <LayoutPercent
        bg={{
          src:
            'http://fdfs.xmcdn.com/storages/2f8e-audiofreehighqps/00/B6/CMCoOScEC-h8AAKsLACLToyC.jpg',
          naturalWidth: 375,
          naturalHeight: 100,
        }}
      >
        一行文字
      </LayoutPercent>,
    );
    expect(container).toMatchSnapshot();
  });
});
