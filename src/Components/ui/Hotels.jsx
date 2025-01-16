import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Hotels = ({ tripData }) => {
  const { userChoice } = tripData;

  const tripPlanObject = (() => {
    try {
      console.log("Parsing trip plan JSON:", userChoice?.tripPlan);
      return JSON.parse(userChoice?.tripPlan || '{}');
    } catch (error) {
      console.error("Error parsing trip plan JSON:", error);
      return {};
    }
  })();

  const hotels = tripPlanObject.hotel || [];
  console.log("Hotels array:", hotels);

  const [hotelImages, setHotelImages] = useState([]);

  useEffect(() => {
    console.log("Fetching images for hotels...");
    if (hotels.length === 0) {
      console.warn("No hotels available to fetch images for.");
      return;
    }

    const fetchHotelImages = async () => {
      const imageUrls = await Promise.all(
        hotels.map(async (hotel) => {
          try {
            const response = await axios.get(`https://api.unsplash.com/search/photos`, {
              params: {
                query: `${hotel.name}`,
                client_id: import.meta.env.VITE_UNSPLASH_ACCES_KEY,
              },
            });

            return response.data.results[0]?.urls?.regular || '/infoimg.jpg';
          } catch (error) {
            console.error(`Error fetching image for hotel: ${hotel.name}`, error);
            return '/infoimg.jpg';
          }
        })
      );

      setHotelImages(imageUrls);
    };

    fetchHotelImages();
  }, [hotels]);

  return (
    <div>
      <h2 className="font-bold text-[30px] mt-5">Hotel Recommendation 🛏️</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-2">
        {hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <Link
              key={index}
              to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`}
              target="_blank"
              className="hotel-card"
            >
              <div className="w-full bg-blue-200 rounded-xl shadow-lg p-5 hover:scale-105 transition-all cursor-pointer flex flex-col h-[350px]">
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
 export default   Hotels