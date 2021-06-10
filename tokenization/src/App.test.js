import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Connect button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Connect Your MetaMask!/i);
  expect(linkElement).toBeInTheDocument();
});
