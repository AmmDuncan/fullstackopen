import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Blog from '../../../components/Blog';

describe('<Blog />', () => {
  let container;
  let blog;
  const handleLike = jest.fn();

  beforeEach(() => {
    blog = {
      title: 'CSS is nice',
      author: 'Me',
      url: 'http://css.url.com',
      likes: 69
    };
    container = render(<Blog blog={blog} handleLike={handleLike} />).container;
  });

  it('contains title and author name by default', () => {
    screen.findByText('CSS is nice Me', { exact: false });
  });

  it('shows url and likes after clicking view button', () => {
    const viewBtn = container.querySelector('#view');
    userEvent.click(viewBtn);
    screen.findByText(blog.url);
  });

  it('calls the likes handler the right number of times', () => {
    const viewBtn = container.querySelector('#view');
    userEvent.click(viewBtn);

    const likeBtn = container.querySelector('#like');
    userEvent.click(likeBtn);
    userEvent.click(likeBtn);

    expect(handleLike.mock.calls).toHaveLength(2);
  });
});
