import React from 'react'
import { auth } from '../../database/firebase'

import SignIn from '../Sign/Sign-In/SignIn'
import SignUp from '../Sign/Sign-Up/SignUp'

const MyAccount = ({ user }) => {
  function handleSignOut() {
    auth
      .signOut()
      .then(() => {
        console.log('signed out')
        console.log(user)
      })
      .catch((error) => {
        console.log('error signing out')
      })
  }

  return (
    <>
      {user ? (
        <div>
          <div>Hello {user}, you're logged in</div>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <SignIn />
      )}
    </>
  )
}
export default MyAccount
