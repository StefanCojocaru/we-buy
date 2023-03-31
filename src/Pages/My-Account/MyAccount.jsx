import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../database/firebase'

import SignIn from '../Sign/Sign-In/SignIn'
import SignUp from '../Sign/Sign-Up/SignUp'

const MyAccount = ({ user }) => {
  const navigate = useNavigate()
  function handleSignOut() {
    auth
      .signOut()
      .then(() => {
        console.log('signed out')
        console.log(user)
        navigate('/')
      })
      .catch((error) => {
        console.log('error signing out')
      })
  }

  return (
    // <>
    //   {user ? (
    //     <div>
    //       <div>Hello {user}, you're logged in</div>
    //       <button onClick={handleSignOut}>Sign Out</button>
    //     </div>
    //   ) : (
    //     // <SignIn />
    //     <div>signin</div>
    //   )}
    // </>

    <>
      <div>
        <div>Hello {user}, you're logged in</div>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </>
  )
}
export default MyAccount
