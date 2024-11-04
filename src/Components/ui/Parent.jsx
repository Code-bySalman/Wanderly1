import React, { useState } from 'react';
import FindTrip from './FindTrip'; // Adjust the path as necessary
import Header from './Header';

const Parent = () => {
  const [openDialogue, setOpenDialogue] = useState(false);

  const toggleDialog = () => {
    setOpenDialogue((prev) => !prev);
  };

  return (
    <>
      <Header onSignInClick={toggleDialog} />
      <FindTrip openDialogue={openDialogue} setOpenDialogue={setOpenDialogue} />
    </>
  );
};

export default Parent;
