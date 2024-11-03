import React from 'react';
import { Button } from './button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="flex flex-col items-center mx-auto gap-5 pl-10 md:pl-20">  {/* Added left margin */}
      <div className="flex flex-col items-center md:flex-row">
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="font-bold text-[30px] md:text-[40px]">
            Discover the world effortlessly with <span className="text-blue-600">Wanderly</span> – your AI-powered trip planner for seamless, personalized adventures!
          </h1>
          <h4 className="font-normal text-[15px] md:text-[18px] text-gray-700 mt-2">
            Your AI-powered travel guide for effortless itineraries and unforgettable journeys. Plan less, explore more!
            <br></br>
            <br></br>
          </h4>
          <Link to={'/find_trip'}>
            <Button>Get Started, It's Free!!</Button>
          </Link>
        </div>
        <div className="md:w-1/2">
          <img className="rounded-full mb-35 md:mb-0 h-[600px] md:h-[500px]" src="/hero1.png" alt="Hero Image" />
        </div>
      </div>
    </div>
  );
}

export default Hero;