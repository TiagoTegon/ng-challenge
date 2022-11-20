import { useState } from 'react'
import { Formik, Form, Field } from "formik"
import { useHistory } from 'react-router-dom' 
import loginImg from "../../login.svg"

export function Login() {
  const [isUserLoggin, setIsUserLoggin] = useState(false)
  const [userToken, setUserToken] = useState("")
  const history = useHistory()
  
  async function handleLogin(formValue: { username: string; password: string }) {
    const { username, password } = formValue
    let token = ""
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    }
    await fetch('http://localhost:3000/user/login', reqOptions)
                      .then(async (response) => {
                        setIsUserLoggin(true)
                        const data = await response.json()
                        console.log(data['x-access-token'])
                        token = data['x-access-token']
                        setUserToken(data['x-access-token'])
                      })
                      .catch(() => setIsUserLoggin(false))
    console.log('userToken: ',token)
    if(token) {
      history.push('/profile', { 
        username: username,
        token: token 
      })
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
      onSubmit={handleLogin}
    >
      <Form>
        <div className='base-container'>
          <div className='header'>Login</div>
          <div className='content'>
            <div className='image'>
              <img src={loginImg} alt='loginImg' />
            </div>
            <div className='form'>
              { isUserLoggin && <div>Login success</div>}
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
            <button type='submit' className='btn'>Login</button>
          </div>
        </div>
      </Form>
    </Formik>
  )
}