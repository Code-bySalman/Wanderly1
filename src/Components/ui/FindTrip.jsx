import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';
import { Input } from './input';
import { SelectBudgetOptions, SelectTravelList } from '/src/constants/options';
import { Button } from './button';
import NotificationBar from '../NotificationBar';
import { AI_PROMPT } from '/src/constants/options';
import { chatSession } from '/src/service/AIModal';
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Dialog, DialogContent, DialogDescription, DialogHeader } from "/src/Components/dialog";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function FindTrip() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [budget, setBudget] = useState(null);
  const [travelDays, setTravelDays] = useState('');
  const [travelOption, setTravelOption] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsUserLoggedIn(true);
    }
  }, []);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedLocation(suggestion.display_name);
    setSuggestions([]);
    setQuery(suggestion.display_name);
  };

  const handleTravelDaysChange = (e) => {
    const value = e.target.value;
    if (value <= 10) {
      setTravelDays(value);
    } else {
      alert("You can enter up to a maximum of 10 days only.");
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      GetUserInfo(codeResp);
      setOpenDialog(false);
    },
    onError: (error) => console.log(error)
  });

  const userChoice = {
    location: selectedLocation,
    travelDays: travelDays,
    budget: budget,
    travelOption: travelOption,
  };

  const SaveAiTrip = async (TripData, userChoice) => {
    try {
      setLoading(true);
  
      // Extract only the AI-generated trip plan
      const tripPlan = TripData?.response?.text() || "";
  
      // Update userChoice with the generated trip plan
      const updatedUserChoice = {
        ...userChoice, // Keep existing user choices
        tripPlan,
      };
  
      const tripDetails = {
        userChoice: updatedUserChoice,
        hotelData: TripData?.hotelData || {}, // Keep hotel data if available
      };
  
      // Log the generated trip to the console
      console.log('Generated AI Trip:', tripDetails);
  
      // Save trip details in local storage
      const docId = Date.now().toString();
      localStorage.setItem(`AiTrip_${docId}`, JSON.stringify(tripDetails));
  
      // Navigate to view the trip
      await navigate('/view_trip/' + docId);
      setTimeout(() => setLoading(false), 2000);
  
    } catch (error) {
      console.error("Error saving trip data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTripDetails = async () => {
    if (!isUserLoggedIn) {
      setOpenDialog(true);
      return;
    }

    if (!selectedLocation || !travelDays || !budget || !travelOption) {
      setNotificationMessage("Please fill in all fields.");
      setNotificationVisible(true);
      setTimeout(() => setNotificationVisible(false), 3000);
      return;
    }

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', selectedLocation)
      .replace('{totalDays}', travelDays)
      .replace('{budget}', budget)
      .replace('{people}', travelOption);

    try {
      setLoading(true);
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      await SaveAiTrip(result, userChoice);
    } catch (error) {
      console.error("Error generating trip:", error);
    } finally {
      setLoading(false);
    }
  };

  const GetUserInfo = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    })
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data));
      setIsUserLoggedIn(true);
    })
    .catch((error) => console.error("Error fetching user info:", error));
  };
 

  return (
    <>
      <Header />
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 flex items-center flex-col">
      <h2 className="text-center text-black font-extrabold text-[50px] gap-9">
Create Your <span className="text-blue-600">Perfect Trip</span> in Just a Few Clicks
</h2>
<h4 className="text-center text-gray-600 text-[20px] mt-2">
Enter your destination, budget, and preferences – <br />
let us handle the details with personalized travel options tailored just for you!
</h4>

<NotificationBar message={notificationMessage} visible={notificationVisible} />

<div className="mt-16 w-full flex flex-col gap-9">
<div className="relative w-full lg:w-3/5 mx-auto mb-[20px]">
  <h2 className="text-xl font-medium mb-2">Where are you planning to escape?</h2>
  <input
    type="text"
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-md bg-gray-100"
    value={query}
    onChange={handleInputChange}
    placeholder="Enter your destination..."
  />
  {suggestions.length > 0 && (
    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => handleSuggestionClick(suggestion)}
          className="p-3 cursor-pointer hover:bg-blue-50"
        >
          {suggestion.display_name}
        </li>
      ))}
    </ul>
  )}
</div>
</div>

<div>
<h2 className="text-xl font-medium mb-2">How many days are you planning to travel?</h2>
<Input 
  placeholder="For example: 3 Days" 
  type="number" 
  className="w-[56vw] h-[50px] shadow-md bg-gray-100" 
  value={travelDays} 
  onChange={handleTravelDaysChange} 
/>
</div>

<div className="ml-[-70px] mt-10">
<h2 className="text-xl font-medium mb-2">What is your budget?</h2>
<div className="grid grid-cols-3 gap-5 mt-5 items-center ml-20">
  {SelectBudgetOptions.map((item, index) => (
    <div 
      key={index} 
      className={`p-4 border rounded-lg shadow-lg cursor-pointer bg-white mr-[20px] ${
        budget === item.title ? 'border-black shadow-2xl' : 'border-gray-300 shadow-md'
      }`}
      onClick={() => setBudget(item.title)}
    >
      <h2 className="text-4xl">{item.icon}</h2>
      <h2 className="font-bold text-lg">{item.title}</h2>
      <h2 className="text-sm text-gray-500">{item.desc}</h2>
    </div>
  ))}
</div>
</div>

<div className="ml-[-70px] mt-10">
<h2 className="text-xl font-medium mb-2">What is your travel option?</h2>
<div className="grid grid-cols-3 gap-5 mt-5 items-center ml-20">
  {SelectTravelList.map((item, index) => (
    <div 
      key={index} 
      className={`p-4 border rounded-lg shadow-lg cursor-pointer bg-white mr-[20px] ${
        travelOption === item.title ? 'border-black shadow-2xl' : 'border-gray-300 shadow-md'
      }`}
      onClick={() => setTravelOption(item.title)}
    >
      <h2 className="text-4xl">{item.icon}</h2> {/* Retained icons as in original */}
      <h2 className="font-bold text-lg">{item.title}</h2>
      <h2 className="text-sm text-gray-500">{item.desc}</h2>
    </div>
  ))}
</div>
</div>

<div className="flex justify-center mt-8">
  <Button className="h-[50px] w-[200px]" onClick={handleSaveTripDetails}>
    {loading ? (
      <AiOutlineLoading3Quarters className="animate-spin text-white" />
    ) : (
      "Generate Trip"
    )}
  </Button>
</div>
</div>

<Dialog open={openDialog} onOpenChange={setOpenDialog}>
  <DialogHeader>
   
  </DialogHeader>
  <DialogContent className="flex flex-col items-center">
    <h3 className="text-center text-gray-600 mb-3">
      To create your trip, please sign in with Google.
    </h3>
    <Button 
      onClick={login} 
      className="bg-black  border-gray-300 flex items-center p-2 rounded-md hover:bg-black-600"
    >
      <FcGoogle className="text-2xl mr-2" />
      Sign in with Google
    </Button>
  </DialogContent>
</Dialog>
</>
);
}

export default FindTrip;
