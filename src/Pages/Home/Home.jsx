import React from 'react'
import Products from '../Product-Page/Products'

const Home = () => {
  return (
    <div>
      {/* <Header />
      <AuxHeader /> */}
      <h2>All products</h2>
      <Products random={true} />
    </div>
  )
}

export default Home
