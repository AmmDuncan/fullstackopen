import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import NoteForm from '../../../components/NoteForm';

jest.mock('../../../services/blogs', () => ({
  __esModule: true,
  default: {
    add: jest.fn().mockResolvedValue({ title: 'CSS is nice' })
  }
}));

describe('<NoteForm />', function() {
  let container;

  beforeEach(() => {
    container = render(<NoteForm
      blogs={[]}
      setBlogs={jest.fn()}
      notify={jest.fn()}
    />).container;
  });

  it('calls the submit method when form creating', () => {
    const newNoteBtn = screen.getByText('New note');
    userEvent.click(newNoteBtn);

    const title = container.querySelector('#title');
    const createBtn = screen.getByText('Create');
    userEvent.type(title, 'CSS is nice');
    userEvent.click(createBtn);
  });
});
