import React from 'react'
import { RouteComponentProps } from "react-router-dom";
import { Formik, Form, Field } from "formik"
import loginImg from "../../login.svg"
import { response } from 'express';

interface IProps {
}

type Props = RouteComponentProps<IProps>

type State = {
  username: string,
  password: string
}

export class Login extends React.Component<IProps, State> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: IProps) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  handleLogin(formValue: {username: string; password: string}) {
    const { username, password } = formValue
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password})
    }
    fetch('https://localhost:3000/login', reqOptions)
  }

  render() {

    const initialValues = {
      username: "",
      password: ""
    }

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleLogin}
      >
        <Form>
          <div className='base-container'>
            <div className='header'>Login</div>
            <div className='content'>
              <div className='image'>
                <img src={loginImg} alt='loginImg'/>
              </div>
              <div className='form'>
                <div className='form-group'>
                  <label htmlFor='username'>Username</label>
                  <Field type='text' name='username' placeholder='Username'/>
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <Field type='password' name='password' placeholder='Password'/>
                </div>
              </div>
            </div>
            <div className='footer'>
              <button type='submit' className='btn'>Login</button>
            </div>
          </div>
        </Form>
      </Formik>
    )
  }
}