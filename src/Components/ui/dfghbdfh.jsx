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
<h2 className="text-xl font-medium mb-2">Who do you plan on your next adventure?</h2>
<div className="grid grid-cols-3 gap-5 mt-5 items-center ml-20">
  {SelectTravelList.map((item, index) => (
    <div 
      key={index} 
      className={`p-4 border rounded-lg shadow-lg cursor-pointer bg-white mr-[20px] ${
        travelOption === item.title ? 'border-black shadow-2xl' : 'border-gray-300 shadow-md'
      }`}
      onClick={() => setTravelOption(item.title)}
    >
      <h2 className="text-4xl">{item.icon}</h2>
      <h2 className="font-bold text-lg">{item.title}</h2>
      <h2 className="text-sm text-gray-500">{item.desc}</h2>
    </div>
  ))}
</div>
</div>

<div className="w-full flex justify-center mt-10">
<Button onClick={handleSaveTripDetails} className="w-1/2">
  {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Create Your Trip"}
</Button>
</div>
</div>

<Dialog open={openDialog} onOpenChange={setOpenDialog}>
<DialogContent>
<DialogHeader>
  <DialogDescription>
    <div className="text-center">
      <h1 className="text-3xl font-bold">Sign In</h1>
      <p className="text-gray-600 mt-2">Please sign in to continue with your trip creation.</p>
    </div>
    <div className="flex justify-center mt-8">
      <Button onClick={() => login()} className="bg-white text-black border border-gray-300 p-3 rounded-lg shadow-lg flex items-center">
        <FcGoogle className="mr-2" /> Continue with Google
      </Button>
    </div>
  </DialogDescription>
</DialogHeader>
</DialogContent>
</Dialog>