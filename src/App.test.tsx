import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', async () => {
  render(<App />);
});

test('renders app header', async () => {
  render(<App />);
  const dataElement = screen.getByText(/Wiliot test/i);
  expect(dataElement).toBeInTheDocument();
}) 

test('renders infoBlock', async () => {
  render(<App />);
  const dataElement = screen.getByText(/ID1/i);
  expect(dataElement).toBeInTheDocument();
}) 

test('renders chart', async () => {
  render(<App />);
  const dataElement = screen.getByText(/Data/i);
  expect(dataElement).toBeInTheDocument();
}) 
