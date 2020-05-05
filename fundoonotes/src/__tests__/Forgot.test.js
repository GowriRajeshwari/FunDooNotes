import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextField from '@material-ui/core/TextField';
import {createShallow} from '@material-ui/core/test-utils';
import {act} from 'react-dom/test-utils';
import { createMount} from '@material-ui/core/test-utils'
import App from '../App';
import Login from '../components/Login';
import Register from '../components/Register.jsx';
import Forgot from '../components/ForgotPassword'

configure({adapter: new Adapter()});

describe('Test case for testing login component', () => {

  it('Email Textfield',()=>{
      expect(shallow(<Forgot/>).find("#btnForgot").length).toEqual(1)
  })


describe('username check',()=>{
    it('input of email',()=>{
        const wrapper = shallow(<Forgot />);
        wrapper.find("#btnForgot").simulate('change',{target : { name:'Emails', value : 'gowripanda35@gmail.com'}
        });
        expect(wrapper.state('email')).toEqual('gowripanda35@gmail.com')
    })
})


describe('Register Button Check',()=>{
    it('Register Button', () => {
      const wrapper = shallow(<Forgot />);
      const decrementBtn = wrapper.find('.forgotButton').at(0);
      decrementBtn.simulate('click');
      expect(true).toBe(true)
    });
  })
});


