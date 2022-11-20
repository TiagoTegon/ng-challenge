import { useState } from 'react'
import { Formik, Form, Field } from "formik"
import loginImg from "../../login.svg"
import { useHistory } from 'react-router-dom'

export function Register() {
  const [isUserRegister, setIsUserRegister] = useState(false)
  const history = useHistory()
  
  async function handleRegister(formValue: { username: string; password: string }) {
    history.push('/login')
    window.location.reload()
    const { username, password } = formValue
    let isRegister = false
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    }
    await fetch('http://localhost:3000/user/', reqOptions)
                      .then(() => {
                        isRegister = true
                        setIsUserRegister(true)
                      })
                      .catch(() => setIsUserRegister(false))
    if(isRegister) {
      history.push('/login')
      window.location.reload()
    }
  }
  
  const initialValues = {
    username: "",
    password: ""
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleRegister}
    >
      <Form>
        <div className='base-container'>
          <div className='header'>Register</div>
          <div className='content'>
            <div className='image'>
              <img src={loginImg} alt='loginImg' />
            </div>
            <div className='form'>
              { isUserRegister && <label>Register Success</label> }
              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <Field type='text' name='username' placeholder='Username' />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <Field type='password' name='password' placeholder='Password' />
              </div>
            </div>
          </div>
          <div className='footer'>
            <button type='submit' className='btn'>Register</button>
          </div>
        </div>
      </Form>
    </Formik>
  )
}