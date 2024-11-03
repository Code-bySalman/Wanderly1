import React, { useEffect, useState } from 'react';
import { Button } from './button'; 
import { Link } from 'react-router-dom';
import axios from 'axios';

const DailyPlan = ({ tripData }) => {
  const { userChoice } = tripData;
  const tripPlanObject = (() => {
    try {
      return JSON.parse(userChoice?.tripPlan || '{}');
    } catch (error) {
      console.error("Error parsing trip plan JSON:", error);
      return {}; 
    }
  })();
  const itinerary = tripPlanObject.itinerary || []; 
  
  return (
    <div className='mt-5 max-w-4xl mx-auto'>
      <h2 className='font-bold text-xl text-center mb-4'>Places to Visit</h2>
      <div className='grid gap-8'>
        {itinerary?.map((day, index) => (
          <div key={index} className='bg-white p-5 rounded-xl shadow-md'>
            <div className='mb-4'>
              <h3 className="font-bold text-lg text-blue-600">{day.day}:</h3>
              <h4 className="font-medium text-md text-blue-500 mt-1">{day.theme}</h4>
            </div>
            <div className='grid md:grid-cols-2 gap-5'>
              {day.plan?.map((place, index) => (
                <Link
                  key={index}
                  to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.geoCoordinates)}`}
                  target='_blank'
                  className='hover:scale-105 transition-transform'
                >
                  <div className='border rounded-lg p-4 flex gap-4 hover:shadow-lg cursor-pointer'>
                    <ImageWithFallback place={place} />
                    <div className='flex-1'>
                      <h2 className='font-bold text-lg mb-1'>{place.place}</h2>
                      <h3 className='text-orange-500 font-semibold'>Time: {place.time}</h3>
                      <p className='text-sm text-gray-500 mt-1'>{place.details}</p>
                      <p className='text-md text-gray-600 mt-1'>Ticket Price: {place.ticketPrice}</p>
                      <p className='text-md text-gray-600'>Travel Time: {place.travelTime}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ImageWithFallback = ({ place }) => {
  const [imageUrl, setImageUrl] = useState('/infoimg.jpg'); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async (hotel) => {
      try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: {
            query: `${hotel.name} ${hotel.address}`, // Combine name and address
            client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
          },
        });
        return response.data.results[0]?.urls?.regular || '/infoimg.jpg';
      } catch (error) {
        console.error('Error fetching image for hotel:', hotel.name, error);
        return '/infoimg.jpg'; // Return default image on error
      }
    };
    const loadImage = async () => {
      setIsLoading(true);
      setError(null);

      
      let image = await fetchImage(place.place);

      if (!image && place.address) {
        image = await fetchImage(place.address);
      }

      if (image) {
        setImageUrl(image);
      } else {
        console.warn('No image found for place:', place.place || place.address);
      }

      setIsLoading(false);
    };

    loadImage();
  }, [place]);

  return (
    <div className='w-[150px] h-[150px] flex-shrink-0 mt-3'>
      {isLoading ? (
        <div className='w-full h-full rounded-xl bg-gray-200 animate-pulse'></div>
      ) : (
        <img src={imageUrl} className='w-full h-full object-cover rounded-xl' alt={`${place.place} Image`} />
      )}
    </div>
  );
};

export default DailyPlan;

