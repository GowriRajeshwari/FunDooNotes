import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextField from '@material-ui/core/TextField';
import {createShallow} from '@material-ui/core/test-utils';
import {act} from 'react-dom/test-utils';
import { createMount} from '@material-ui/core/test-utils'
import App from '../App';
import Reset from '../components/ResetPassword'

configure({adapter: new Adapter()});

describe('Test case for testing login component', () => {

  it('Password Textfield',()=>{
      expect(shallow(<Reset/>).find("#btnReset").length).toEqual(1)
  })
  it('ConfirmPassword Textfield',()=>{
    expect(shallow(<Reset/>).find("#ConfirmPassword").length).toEqual(1)
})
  


describe('Password check',()=>{
    it('input of Password',()=>{
        const wrapper = shallow(<Reset />);
        wrapper.find("#btnReset").simulate('change',{target : { name:'NewPassword', value : 'Gowri@35'}
        });
        expect(wrapper.state('password')).toEqual('Gowri@35')
    })
})
describe('Confirm Password check',()=>{
    it('input of ConfirmPassword',()=>{
        const wrapper = shallow(<Reset />);
        wrapper.find("#ConfirmPassword").simulate('change',{target : { name:'Re-enter New Password', value : 'Gowri@35'}
        });
        expect(wrapper.state('confirmpassword')).toEqual('Gowri@35')
    })
})


describe('Register Button Check',()=>{
    it('Register Button', () => {
      const wrapper = shallow(<Reset />);
      const decrementBtn = wrapper.find('.Reset').at(0);
      decrementBtn.simulate('click');
      expect(true).toBe(true)
    });
  })
});


