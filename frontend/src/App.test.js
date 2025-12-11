import { render, screen } from '@testing-library/react';
// react testing library helps test ui behavior ref: https://testing-library.com/docs/)
import App from './App';

// simple example test 
test('renders learn react link', () => {
  render(<App />);
  // render the component in a fake browser for testing
  const linkElement = screen.getByText(/learn react/i);
  // screen lets us search the rendered output ref: https://testing-library.com/docs/queries/about/
  expect(linkElement).toBeInTheDocument();
  // checks if the element exists in the dom and this was also helped by ai 
});
