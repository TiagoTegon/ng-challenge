import React, { useState } from 'react'
import { Formik, Form, Field } from "formik"
import { useLocation } from 'react-router-dom'
import refreshIcon from './img/refresh.svg'
import { useHistory } from 'react-router-dom'


interface stateType {
  username: string
  token: string
}

export function Profile() {
  const [balance, setBalance] = useState()
  const [transactions, setTransactions] = useState([])
  const { state } = useLocation<stateType>()
  const history = useHistory()

  async function getBalance(username: string, token: string) {
    let fetchOk = false
    const reqOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
    }
    await fetch(`http://localhost:3000/user/${username}/balance`, reqOptions)
      .then(async (res) => {
        const data = await res.json()
        setBalance(data)
        fetchOk = true
      })
    return fetchOk
  }

  async function getTransactionList(username: string, token: string) {
    let fetchOk = false
    const reqOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
    }
    await fetch(`http://localhost:3000/user/${username}/transaction`, reqOptions)
      .then(async (res) => {
        const data = await res.json()
        setTransactions(data)
        fetchOk = true
      })
    return fetchOk
  }

  async function createTransaction(formValue: { creditedUser: string, value: number }) {
    const { creditedUser, value } = formValue
    const { username, token } = state
    let fetchOk = false
    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      body: JSON.stringify({ creditedUser: creditedUser, value: value })
    }
    await fetch(`http://localhost:3000/user/${username}/transaction`, reqOptions)
      .then(() => fetchOk = true)
    return fetchOk
  }

  function logout() {
    history.replace('/')
    window.location.reload()
  }

  const initialValues = {
    creditedUser: "",
    value: 0
  }

  return (
    <div className='profile'>
      <div className='header'>Hello {state.username}!</div>
      <div className='panel'>
        <div className='panel-column'>
          <div className='container-side'>
            <div className='content'>
              <label>Current balance</label>
            </div>
            <div className='content'>
              <label>{balance}</label>
            </div>
            <div className='content'>
              <button onClick={() => getBalance(state.username, state.token)} className='btn'>Refresh balance</button>
            </div>
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={createTransaction}
        >
          <Form>
            <div className='panel-column'>
              <div className='content'>
                <label>New Cash-in</label>
              </div>
              <div className='content'>
                <label htmlFor='creditedUser'>Cash-in to:</label>
                <Field type='text' name='creditedUser' placeholder='Username' />
              </div>
              <div className='content'>
                <label htmlFor='value'>Value:</label>
                <Field type='number' name='value' placeholder='Value' />
              </div>
              <div className='content'>
                <button type='submit' className='btn'>Send</button>
              </div>
            </div>
          </Form>
        </Formik>
        <div className='panel-column'>
          <div className='container-side'>
            <div className='content'>
              <label>Transaction List</label>
            </div>
            <table className='transactionTable'>
              <thead>
                <tr>
                  <th>Value</th>
                  <th>CreatedAt</th>
                  <th>CreditedAccount</th>
                  <th>DebitedAccount</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(transactions).map((transaction: any) => (
                  <tr key={transaction[1].id}>
                    <td>{transaction[1].value}</td>
                    <td>{transaction[1].createdAt}</td>
                    <td>{transaction[1].creditedAccount.id}</td>
                    <td>{transaction[1].debitedAccount.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='content'>
              <button onClick={() => getTransactionList(state.username, state.token)} className='btn'>Refresh Transaction List</button>
            </div>
          </div>
        </div>
      </div>
      <div className='footer'>
        <button onClick={logout} className='btn-cancel'>Logout</button>
      </div>
    </div>
  )
}