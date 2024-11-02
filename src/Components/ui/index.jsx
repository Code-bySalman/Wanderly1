import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfoSection from './info';
import Hotels from './Hotels';
import Header from './Header';
import DailyPlan from './dailyPlan';
import Footer from './Footer';

function ViewTrip() {
  const { docId } = useParams();
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    const savedTrip = localStorage.getItem(`AiTrip_${docId}`);
    if (savedTrip) {
      setTripData(JSON.parse(savedTrip));
    }
  }, [docId]);

  if (!tripData) {
    return <div>Loading...</div>;
  }
  return (
    <>
    <Header/>
    <div className="p-10 md:px-20 lg:px-44 xl:px-56 bg-white-100">
      <InfoSection tripData={tripData} />
      {/* Pass tripId as a prop to Hotels component */}
      <Hotels tripData={tripData} />
      <DailyPlan tripData = {tripData}/>
      <Footer tripData = {tripData}/>
    </div>
    </>
  );
}

export default ViewTrip;
