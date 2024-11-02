import React, { useEffect, useState } from 'react';
import { Button } from './button';
import { FaShare } from "react-icons/fa";
import axios from 'axios';

function InfoSection({ tripData }) {
  const { userChoice } = tripData;
  const location = userChoice?.location;
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: {
            query: location,
            client_id: import.meta.env.VITE_UNSPLASH_ACCES_KEY // Replace with your Unsplash Access Key
          }
        });

        if (response.data.results.length > 0) {
          setImageUrl(response.data.results[0].urls.regular);
        } else {
          setError('No images found for this location');
        }
      } catch (error) {
        console.error('Error fetching image:', error);
        setError('Failed to fetch image');
      } finally {
        setIsLoading(false);
      }
    };

    if (location) {
      fetchImage();
    }
  }, [location]);

  return (
    <div>
      {isLoading ? (
        <div>Loading image...</div>
      ) : (
        <img
          src={error ? '/infoimg.jpg' : imageUrl}
          className='h-[340px] w-full object-cover rounded-xl'
          alt="Trip Image"
        />
      )}

      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col '>
          <h2 className='font-bold text-[40px] '>{tripData?.userChoice?.location}</h2>
          <div className='flex gap-5'>
            <div className="flex items-center gap-3">
              <p className='p-1 px-3 bg-gray-300 rounded-full text-gray-600 text-xs md:text-sm'>
                🗓️ {tripData?.userChoice?.travelDays} Days
              </p>
              <p className='p-1 px-3 bg-gray-300 rounded-full text-gray-600 text-xs md:text-sm'>
                🪙 {tripData?.userChoice?.budget} Budget
              </p>
              <p className='p-1 px-3 bg-gray-300 rounded-full text-gray-600 text-xs md:text-sm'>
                👫 {tripData?.userChoice?.travelOption}
              </p>
            </div>
          </div>
        </div>
        <Button><FaShare /></Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default InfoSection;