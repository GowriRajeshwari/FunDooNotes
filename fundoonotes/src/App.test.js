// import React from 'react';
// import {configure,shallow} from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import TextField from '@material-ui/core/TextField';
// import {createShallow} from '@material-ui/core/test-utils';
// import {act} from 'react-dom/test-utils';
// import { createMount} from '@material-ui/core/test-utils'
// import App from './App';
// import Login from './components/Login';

// configure({adapter: new Adapter()});
// // test('renders learn react link', () => {
// //   const { getByText } = render(<App />);
// //   const linkElement = getByText(/learn react/i);
// //   expect(linkElement).toBeInTheDocument();
// // });

// describe('Login component', () => {
//   let mount;
//   const field={
//     label : "Emails",
//     onChange : jest.fn()
//   }
//   beforeEach(()=>{
//     mount = createMount();
//   })
//   let wrapper;
//   afterEach(()=>{
//     mount.cleanUp();
//   })
//   it('SignIn Button', () => {
//     const wrapper = shallow(<Login />);
//     const decrementBtn = wrapper.find('.SignIn').at(0);
//     decrementBtn.simulate('click');
//     expect(true).toBe(true)
//   });
//   // it('Login Email Textfield', () => {
//   //   const wrapper = shallow(<Login {...field}/>);
//   //   expect(wrapper.props().label).toEqual("Emails");
//   //   expect(wrapper.props().onChange).toBeDefined();
//   // });
// });



// // describe('<TextField />', () => {
// //   let shallow;

// //   beforeAll(() => {
// //     shallow = createShallow();
// //   });
// //   let wrapper;
// //   beforeEach(() => {
// //     wrapper = shallow(<Login onStateChange={handleStateChange}/>);
// //   });

// //   const handleStateChange = updatedState => {
// //   };

// //   it('should show no error when first entered', () => {
// //     expect(wrapper.find(TextField).at(0).props().error).toBe(
// //         false);
// //         expect(wrapper.find(TextField).at(0).props().helperText).toBe(
// //           null);
// //     });
  
// //     it('should show error when nothing entered', () => {
// //       act(() => {
// //         wrapper.find(TextField).at(0).simulate('blur', {target: {value: '123'}});
// //       });
// //       wrapper.update();
// //       expect(wrapper.find(TextField).at(0).props().error).toBe(
// //           true);
// //       expect(wrapper.find(TextField).at(0).props().helperText).toBe(
// //           "Wrong Name format.");
// //     });
  
// //     it('should show no error when correctly entered', () => {
// //       act(() => {
// //         wrapper.find(TextField).at(0).simulate('blur', {target: {value: 'James'}});
// //       });
// //       wrapper.update();
// //       expect(wrapper.find(TextField).at(0).props().error).toBe(
// //           false);
// //       expect(wrapper.find(TextField).at(0).props().helperText).toBe(
// //           null);
// //     });
  
// //   });


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('render without crashing',()=>{
  const div = document.createElement('div');
  ReactDOM.render(<App / >, div);
  ReactDOM.unmountComponentAtNode(div)
})