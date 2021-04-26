import { render, screen } from '@testing-library/react';
import { act, fireEvent } from 'react-dom/test-utils';
import { Game } from './Game';

test('renders learn react link', () => {
  act(() => {
    render(<Game />);
  });
  const linkElement = screen.getByText(/mastermind/i);
  expect(linkElement).toBeInTheDocument();
});
