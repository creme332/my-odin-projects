import { render, screen } from '@testing-library/react';
import Home from "./pages/Home";
import Products from './pages/Products';
import Card from './components/Card';

import RouteSwitch from './RouteSwitch';
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils';

test('full app rendering/navigating', () => {
  render(<RouteSwitch />)

  // verify page content for default route
  expect(screen.getByText(/Healthy Snacking made delicious/i)).toBeInTheDocument()

  // go to about page
  act(() => {
    userEvent.click(screen.getByText(/about/i))
  });
  expect(screen.getByText(/About us/i)).toBeInTheDocument()

  // go to products page
  act(() => {
    userEvent.click(screen.getByText(/products/i))
  });
  expect(screen.getByText(/our flavours/i)).toBeInTheDocument()

  // go to contact page
  act(() => {
    userEvent.click(screen.getByText(/contact/i))
  });
  expect(screen.getByText(/contact us/i)).toBeInTheDocument()
})

test('home page', () => {
  render(<Home />, { wrapper: BrowserRouter });
  expect(screen.getByRole("heading").textContent).toMatch(/Healthy Snacking made delicious/i);
});

test('search bar', () => {
  render(<Products />, { wrapper: BrowserRouter });

  // type 'natu'
  act(() => {
    userEvent.type(screen.getByRole('textbox', { name: /search bar/i }), 'natu');
    // console.log(screen.debug());
  });
  expect([...document.querySelectorAll('.card')].length).toEqual(1);

  // clear search bar value
  fireEvent.change(screen.getByRole('textbox', { name: /search bar/i }), { target: { value: '' } });

  // type 'bar'
  act(() => {
    userEvent.type(screen.getByRole('textbox'), 'bar');
  });
  expect([...document.querySelectorAll('.card')].length).toEqual(1);

  // clear search bar value
  fireEvent.change(screen.getByRole('textbox', { name: /search bar/i }), { target: { value: '' } });

  // type 'lim'
  act(() => {
    userEvent.type(screen.getByRole('textbox'), 'lim');
  });
  expect([...document.querySelectorAll('.card')].length).toEqual(1);

  // clear search bar value
  fireEvent.change(screen.getByRole('textbox', { name: /search bar/i }), { target: { value: '' } });

  // type 'lim'
  act(() => {
    userEvent.type(screen.getByRole('textbox'), 'a');
  });
  expect([...document.querySelectorAll('.card')].length).toEqual(3);
});

test('add to cart', async () => {
  render(<RouteSwitch />)

  // go to products page
  act(() => {
    userEvent.click(screen.getByText(/products/i))
  });
  expect(screen.getByText(/our flavours/i)).toBeInTheDocument()

  // click on natural flavour card
  act(() => {
    userEvent.click(screen.getByText(/Natural/i));
  });
  expect(screen.getByRole("heading").textContent).toMatch(/Natural/i);

  // click on add to cart button
  act(() => {
    userEvent.click(document.querySelector('.mantine-Button-label'));
    // console.log(screen.debug());
  });
  await screen.findAllByText('1');

  expect(screen.getByRole("button", { name: "Checkout - Rs 15" }).textContent).toMatch(/Checkout - Rs 15/i);
});