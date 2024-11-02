import { useState } from 'react'
import { Button } from './Components/ui/button'
import './App.css'

import Hero from './Components/ui/Hero'
import Header from './Components/ui/Header'
import FindTrip from './Components/ui/FindTrip'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
         
       <Header/>
        <Hero/>
        
    </>
  )
}

export default App
