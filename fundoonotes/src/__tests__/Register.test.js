import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextField from '@material-ui/core/TextField';
import {createShallow} from '@material-ui/core/test-utils';
import {act} from 'react-dom/test-utils';
import { createMount} from '@material-ui/core/test-utils'
import App from '../App';
import Register from '../components/Register'
configure({adapter: new Adapter()});

describe('Test case for testing login component', () => {



describe('Register Button Check',()=>{
    it('Register Button', () => {
      const wrapper = shallow(<Register />);
      const decrementBtn = wrapper.find('.Registerbtn');
      expect(decrementBtn).to.have.length(1);
      
      decrementBtn.simulate('click');
      expect(true).toBe(true)
    });
  });

});


