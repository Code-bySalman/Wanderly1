import React, { useEffect, useState } from 'react';
import { Button } from './button'; // Assuming Button component exists
import { Link } from 'react-router-dom';
import axios from 'axios';

const DailyPlan = ({ tripData }) => {
  const { userChoice } = tripData;
  const tripPlanObject = JSON.parse(userChoice.tripPlan);
  const itinerary = tripPlanObject.itinerary;
  const plan = tripPlanObject.plan;

  return (
    <div className='mt-5 px-4 md:px-10 lg:px-20'>
      <h2 className='font-bold text-lg md:text-xl'>Places to Visit</h2>
      <div className='mt-3'>
        {itinerary?.map((day, index) => (
          <div key={index} className='md:flex md:flex-wrap gap-5 mt-5'>
            <div className="flex items-center mb-2">
              <h3 className="font-bold text-lg md:text-xl text-blue-600">{day.day}:</h3>
              <h3 className="font-bold text-lg md:text-xl text-blue-500 ml-2">{day.theme}</h3>
            </div>
            
            {day.plan?.map((place, index) => (
              <Link 
                key={place.id} 
                to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.geoCoordinates)}`} 
                target='_blank' 
                className="block w-full md:w-[48%] lg:w-[30%] mt-3"
              >
                <div className='border rounded-xl flex gap-4 hover:scale-105 transition-all hover:shadow-lg cursor-pointer p-3'>
                  <ImageWithFallback place={place} />
                  <div className='flex flex-col justify-center'>
                    <h2 className='font-bold text-base md:text-lg'>Place: {place.place}</h2>
                    <h2 className='text-sm md:text-md text-orange-500'>Time: {place.time}</h2>
                    <p className='text-xs md:text-sm text-gray-400 mt-1'>{place.details}</p>
                    <p className='text-xs md:text-sm text-gray-600'>{place.ticketPrice}</p>
                    <p className='text-xs md:text-sm text-gray-600'>{place.travelTime}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const ImageWithFallback = ({ place }) => {
  const [imageUrl, setImageUrl] = useState('/infoimg.jpg'); // Default image
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: {
            query: place.place,
            client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY, // Replace with your Unsplash Access Key
          }
        });

        if (response.data.results.length > 0) {
          setImageUrl(response.data.results[0].urls.regular);
        } else {
          console.warn('No image found for place:', place.place);
        }
      } catch (error) {
        console.error('Error fetching image for place:', place.place, error);
        setError('Failed to fetch image');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [place]);

  return (
    <div className='w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[250px] lg:h-[150px] overflow-hidden rounded-xl bg-gray-200'>
      {isLoading ? (
        <div className='w-full h-full bg-gray-200 animate-pulse'></div>
      ) : (
        <img 
          src={imageUrl} 
          alt={`${place.place} Image`} 
          className='w-full h-full object-cover' 
        />
      )}
    </div>
  );
};

export default DailyPlan;
