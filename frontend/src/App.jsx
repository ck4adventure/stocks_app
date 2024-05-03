import { useState } from 'react'
import './App.css'
import { HeaderBar } from './components/header_bar'

function App() {

  return (
    <>
		  <HeaderBar />
      <div className='text-3xl font-bold underline'>
				My app
			</div>

    </>
  )
}

export default App
