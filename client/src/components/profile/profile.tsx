import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from "formik"
import loginImg from "../../login.svg"
import { useLocation } from 'react-router-dom'

interface stateType {
  username: string
  token: string
}

export function Profile() {
  const [ balance, setBalance ] = useState()
  const { state } = useLocation<stateType>()

  async function getBalance(username: string, token: string) {
    let balance = 0
    const reqOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'authorization': token },
    }
    await fetch(`http://localhost:3000/user/${username}/balance`, reqOptions)
          .then(async (res) => {
            const data = await res.json()
            console.log(data)
          })
  }

  return (
    <div className='profile'>
      <label>Profile from user </label>
      <button onClick={() => getBalance(state.username, state.token)}>Refresh balance</button>
    </div>
  )
}