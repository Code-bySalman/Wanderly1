import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DailyPlan = ({ tripData }) => {
  const { userChoice } = tripData;

  // Safely parse the trip plan
  const tripPlanObject = (() => {
    try {
      return JSON.parse(userChoice?.tripPlan || '{}');
    } catch (error) {
      console.error('Error parsing trip plan JSON:', error);
      return {}; // Fallback to empty object
    }
  })();


  const itinerary = Array.isArray(tripPlanObject.itinerary) ? tripPlanObject.itinerary : [];

  return (
    <div className='mt-5 max-w-4xl mx-auto'>
      <h2 className='font-bold text-xl text-center mb-4'>Places to Visit</h2>
      <div className='grid gap-8'>
        {itinerary.map((day, index) => (
          <div key={index} className='bg-white p-5 rounded-xl shadow-md'>
            <div className='mb-4'>
              <h3 className='font-bold text-lg text-blue-600'>{day.day || 'Day Unknown'}:</h3>
              <h4 className='font-medium text-md text-blue-500 mt-1'>{day.theme || 'Theme Unknown'}</h4>
            </div>
            <div className='grid md:grid-cols-2 gap-5'>
              {(day.plan || []).map((place, idx) => (
                <Link
                  key={idx}
                  to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.geoCoordinates || '')}`}
                  target='_blank'
                  className='hover:scale-105 transition-transform'
                >
                  <div className='border rounded-lg p-4 flex gap-4 hover:shadow-lg cursor-pointer'>
                    <ImageWithFallback place={place} />
                    <div className='flex-1'>
                      <h2 className='font-bold text-lg mb-1'>{place.place || 'Unknown Place'}</h2>
                      <h3 className='text-orange-500 font-semibold'>Time: {place.time || 'N/A'}</h3>
                      <p className='text-sm text-gray-500 mt-1'>{place.details || 'No details available'}</p>
                      <p className='text-md text-gray-600 mt-1'>Ticket Price: {place.ticketPrice || 'Free'}</p>
                      <p className='text-md text-gray-600'>Travel Time: {place.travelTime || 'Unknown'}</p>
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

  useEffect(() => {
    const fetchImage = async (query) => {
      try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: {
            query,
            client_id: import.meta.env.VITE_UNSPLASH_ACCES_KEY,
          },
        });
        return response.data.results[0]?.urls?.regular || null;
      } catch (error) {
        console.error('Error fetching image for query:', query, error);
        return null;
      }
    };

    const loadImage = async () => {
      setIsLoading(true);
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
