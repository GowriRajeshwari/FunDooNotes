import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import App from './App';
import Login from './components/Login';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// describe('Login component', () => {
//   it('starts with a count of 0', () => {
//     const wrapper = shallow(<Login />);
//     const decrementBtn = wrapper.find('button.SignIn');
//     decrementBtn.simulate('click');
//   });
// });