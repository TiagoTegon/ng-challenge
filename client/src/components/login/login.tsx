import React from 'react'
import loginImg from "../../login.svg"

interface IProps {
}

export class Login extends React.Component {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: IProps) {
    super(props)
  }

  render() {
    return (
      <div className='base-container'>
        <div className='header'>Login</div>
        <div className='content'>
          <div className='image'>
            <img src={loginImg} alt='loginImg'/>
          </div>
          <div className='form'>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input type='text' name='username' placeholder='Username'/>
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input type='password' name='password' placeholder='Password'/>
            </div>
          </div>
        </div>
        <div className='footer'>
          <button type='button' className='btn'>Login</button>
        </div>
      </div>
    )
  }
}