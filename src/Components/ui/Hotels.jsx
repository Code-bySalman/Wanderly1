import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Hotels = ({ tripData }) => {
  const { userChoice } = tripData;

  // Parse trip plan JSON and handle errors gracefully
  const tripPlanObject = (() => {
    try {
      return JSON.parse(userChoice?.tripPlan || '{}');
    } catch (error) {
      console.error("Error parsing trip plan JSON:", error);
      return {}; // Return an empty object if parsing fails
    }
  })();

  const hotels = tripPlanObject.hotel || []; // Extract hotels array or empty array if missing
  const [hotelImages, setHotelImages] = useState([]); // Store hotel image URLs

  // Fetch hotel images on component mount or when hotels change
  useEffect(() => {
    const fetchHotelImages = async () => {
      if (hotels.length === 0) return; // Check if hotels is empty

      const imageUrls = await Promise.all(
        hotels.map(async (hotel) => {
          try {
            const response = await axios.get(`https://api.unsplash.com/search/photos`, {
              params: {
                query: `${hotel.name}`,
                client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
              },
            });

            const imageUrl = response.data.results[0]?.urls?.regular;
            return imageUrl || '/infoimg.jpg'; // Default image if no result found
          } catch (error) {
            console.error('Error fetching image for hotel:', hotel.name, error);
            return '/infoimg.jpg'; // Return default image on error
          }
        })
      );

      setHotelImages(imageUrls);
    };

    fetchHotelImages();
  }, [hotels]);

  return (
    <div>
      <h2 className="font-bold text-[30px] mt-5">Hotel Recommendation ️</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-2 ">
        {hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <Link
              key={index}
              to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`}
              target="_blank"
              className="hotel-card"
            >
              <div className="w-full bg-blue-200 rounded-xl shadow-lg p-5 hover:scale-105 transition-all cursor-pointer flex flex-col h-[350px] ">
                <img
                  src={hotelImages[index] || '/infoimg.jpg'}
                  className="w-full h-40 rounded-lg object-cover"
                  alt={`${hotel.name} Hotel`}
                />
                <div className="flex-1 flex flex-col justify-between mt-2">
                  <h3 className="text-lg font-medium">{hotel.name}</h3>
                  <h4 className="text-md font-medium text-gray-700 mt-1">⭐ Ratings: {hotel.rating}</h4>
                  <h4 className="text-md font-medium text-gray-700">Price Range: {hotel.priceRange}</h4>
                  <p className="text-gray-500 text-sm mt-2">{hotel.address}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No hotels available for this trip plan.</p>
        )}
      </div>
    </div>
  );
};

export default Hotels;