import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react Link', () => {
  render(<Linkpp />);
  const LinkElement = screen.getByText(/learn react/i);
  expect(LinkElement).toBeInTheDocument();
});
