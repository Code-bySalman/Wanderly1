import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Hotels = ({ tripData }) => {
  const { userChoice } = tripData;
  const tripPlanObject = JSON.parse(userChoice.tripPlan);
  const hotels = tripPlanObject.hotel;
  const [hotelImages, setHotelImages] = useState([]);

  useEffect(() => {
    const fetchHotelImages = async () => {
      const imageUrls = await Promise.all(
        hotels?.map(async (hotel) => {
          try {
            const response = await axios.get(`https://api.unsplash.com/search/photos`, {
              params: {
                query: `${hotel.name} hotel`,
                client_id: import.meta.env.VITE_UNSPLASH_ACCES_KEY  // Replace with your Unsplash Access Key
              }
            });

            const imageUrl = response.data.results[0]?.urls?.regular; // Handle potential empty responses
            return imageUrl;
          } catch (error) {
            console.error('Error fetching image for hotel:', hotel.name, error);
            return null; // Return null if error occurs
          }
        })
      );

      setHotelImages(imageUrls);
    };

    fetchHotelImages();
  }, [hotels]);

  return (
    <div>
      <h2 className='font-bold text-[30px] mt-5'>Hotel Recommendation 🛏️</h2>
      <div className='grid grid-col-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-2'>
        {hotels.map((hotel, index) => (
          <Link
            key={index}
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`}
            target="_blank"
          >
            <div className="w-full bg-blue-200 rounded-xl shadow-lg p-5 hover:scale-110 transition-all cursor-pointer">
              <img
                src={hotelImages[index] || '/infoimg.jpg'}
                className="w-full h-40 rounded-t-lg object-cover"
                alt={`${hotel.name} Hotel`}
              />
              <h3 className="text-lg font-medium mt-2">{hotel.name}</h3>
              <h4 className='text-lg font-medium mt-1'> ⭐ Ratings: {hotel.rating}</h4>
              <h4 className='text-lg font-medium mt-1'>  Ratings: {hotel.priceRange}</h4>
              <p className="text-gray-500 text-md">{hotel.address}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hotels;