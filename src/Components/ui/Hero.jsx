import React from 'react'
import { Button } from './button'
import { Link } from 'react-router-dom'
function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-5'>
        <h1 className='font-bold text-[30px]  text-center mt-16'>
"Discover the world effortlessly with <span className='text-blue-600'>Wanderly</span> – your AI-powered trip planner for seamless, personalized adventures!"
</h1>
<div>
<h4 className='font-normal text-[15px] text-gray-700 text-center mt-2'>"Your AI-powered travel guide for effortless itineraries and unforgettable journeys. Plan less, explore more!"</h4>
</div>
<Link to={'/find_trip'}>
<Button>Get Started, It's Free!!</Button>
</Link>
<div className='object-fill rounded-full mt-2'>
<img className='rounded-full mb-35 h-[600px]' src='/hero1.png'></img>
</div>

</div>
  )
}

export default Hero