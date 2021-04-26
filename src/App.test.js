import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import 'cypress-react-selector';
import App from './App';

test('renders learn react link', () => {
  act(() => {
    render(<App />);
  });
  const linkElement = screen.getByText(/mastermind/i);
  expect(linkElement).toBeInTheDocument();
});
