import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
   export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel plan for Location: LasVegas, for 3 days, for a couple with a cheap budget, give me hotels options, hotel address, hotel price range, also add hotel description , i want hotel address, description, hotel price range, hotel image url, give me the exact addres of the restraunts and places to visit, geo coordinates, descriptions and suggest itinerary with place name, place details, place image url, geo coordinates, ticket pricig , time t travel each of the location for 3 days with each day plan with best time and places to visit in JSON format. also give the the exact address of the places to visit\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"hotel\": [\n    {\n      \"name\": \"The D Las Vegas\",\n      \"address\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$50-$80 per night\",\n      \"imageUrl\": \"https://www.thed.com/wp-content/uploads/2021/01/D-Hotel-Exterior-1.jpg\",\n      \"geoCoordinates\": \"36.1699, -115.1397\",\n      \"description\": \"A budget-friendly hotel located in the heart of Fremont Street, offering a retro vibe and easy access to the Fremont Street Experience.\"\n    },\n    {\n      \"name\": \"Plaza Hotel & Casino\",\n      \"address\": \"1 South Main Street, Las Vegas, NV 89101\",\n      \"price\": \"$60-$100 per night\",\n      \"imageUrl\": \"https://www.plazahotelcasino.com/wp-content/uploads/2021/05/Plaza-Hotel-Exterior-Day-1.jpg\",\n      \"geoCoordinates\": \"36.1695, -115.1396\",\n      \"description\": \"A historic hotel with a classic feel, located on Fremont Street and offering a casino, dining options, and entertainment.\"\n    },\n    {\n      \"name\": \"Golden Nugget Las Vegas\",\n      \"address\": \"129 E Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$70-$120 per night\",\n      \"imageUrl\": \"https://www.goldennugget.com/wp-content/uploads/2022/12/GN-Hotel-Exterior-Day-1-1.jpg\",\n      \"geoCoordinates\": \"36.1686, -115.1401\",\n      \"description\": \"A vibrant hotel with a focus on entertainment, featuring a shark tank, a casino, and multiple dining options.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": \"Day 1\",\n      \"theme\": \"Fremont Street Experience\",\n      \"plan\": [\n        {\n          \"time\": \"10:00 AM\",\n          \"place\": \"Fremont Street Experience\",\n          \"details\": \"A pedestrian-friendly street with a vibrant atmosphere, offering live music, street performers, and the iconic canopy of lights.\",\n          \"imageUrl\": \"https://www.vegasexperience.com/media/img/freemontstreet.jpg\",\n          \"geoCoordinates\": \"36.1695, -115.1398\",\n          \"ticketPrice\": \"Free\",\n          \"travelTime\": \"Walking distance from most hotels on Fremont Street.\"\n        },\n        {\n          \"time\": \"12:00 PM\",\n          \"place\": \"Heart Attack Grill\",\n          \"details\": \"A themed restaurant known for its unhealthy, artery-clogging burgers.\",\n          \"imageUrl\": \"https://www.heartattackgrill.com/images/menu/heart-attack-grill-menu.jpg\",\n          \"geoCoordinates\": \"36.1694, -115.1403\",\n          \"ticketPrice\": \"Around $15-$20 per person\",\n          \"travelTime\": \"5-minute walk from Fremont Street Experience.\"\n        },\n        {\n          \"time\": \"2:00 PM\",\n          \"place\": \"Golden Nugget Casino\",\n          \"details\": \"Explore the casino and see the famous shark tank.\",\n          \"imageUrl\": \"https://www.goldennugget.com/wp-content/uploads/2021/04/GN-SharkTank-1-1.jpg\",\n          \"geoCoordinates\": \"36.1686, -115.1401\",\n          \"ticketPrice\": \"Free\",\n          \"travelTime\": \"5-minute walk from Heart Attack Grill.\"\n        },\n        {\n          \"time\": \"4:00 PM\",\n          \"place\": \"Pinball Hall of Fame\",\n          \"details\": \"A museum showcasing classic pinball machines from different eras.\",\n          \"imageUrl\": \"https://pinballhalloffame.org/images/home/hall-of-fame-gallery-1.jpg\",\n          \"geoCoordinates\": \"36.1755, -115.1404\",\n          \"ticketPrice\": \"Around $12 per person\",\n          \"travelTime\": \"15-minute walk from Golden Nugget.\"\n        },\n        {\n          \"time\": \"6:00 PM\",\n          \"place\": \"El Cortez Hotel & Casino\",\n          \"details\": \"A historic hotel with a casino and a few affordable dining options.\",\n          \"imageUrl\": \"https://www.elcortezhotelcasino.com/wp-content/uploads/2021/11/El-Cortez-Exterior-1-1-1.jpg\",\n          \"geoCoordinates\": \"36.1684, -115.1404\",\n          \"ticketPrice\": \"Free\",\n          \"travelTime\": \"5-minute walk from Pinball Hall of Fame.\"\n        },\n        {\n          \"time\": \"8:00 PM\",\n          \"place\": \"Fremont Street Experience\",\n          \"details\": \"Enjoy the evening atmosphere with live music and street performers.\",\n          \"imageUrl\": \"https://www.vegasexperience.com/media/img/freemontstreet.jpg\",\n          \"geoCoordinates\": \"36.1695, -115.1398\",\n          \"ticketPrice\": \"Free\",\n          \"travelTime\": \"Walking distance from El Cortez.\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 2\",\n      \"theme\": \"The Strip\",\n      \"plan\": [\n        {\n          \"time\": \"10:00 AM\",\n          \"place\": \"Bellagio Conservatory & Botanical Garden\",\n          \"details\": \"A stunning display of flowers and greenery, changing seasonally with elaborate themes.\",\n          \"imageUrl\": \"https://www.bellagio.com/content/dam/mgmresorts/bellagio/attractions/conservatory-botanical-garden/conservatory-botanical-garden-hero-mobile.jpg\",\n          \"geoCoordinates\": \"36.1154, -115.1726\",\n          \"ticketPrice\": \"Free\",\n          \"travelTime\": \"Take the Deuce bus or ride-sharing service from downtown to The Strip.\"\n        },\n        {\n          \"time\": \"12:00 PM\",\n          \"place\": \"The LINQ Promenade\",\n          \"details\": \"An outdoor shopping and dining area with attractions like the High Roller observation wheel.\",\n          \"imageUrl\": \"https://www.caesars.com/content/dam/caesars/linq/attractions/the-linq-promenade-exterior-at-night-1.jpg\",\n          \"geoCoordinates\": \"36.1195, -115.1719\",\n          \"ticketPrice\": \"Free\",\n          \"travelTime\": \"5-minute walk from Bellagio.\"\n        },\n        {\n          \"time\": \"2:00 PM\",\n          \"place\": \"The High Roller Observation Wheel\",\n          \"details\": \"Enjoy panoramic views of the Las Vegas Strip from a giant observation wheel.\",\n          \"imageUrl\": \"https://www.caesars.com/content/dam/caesars/linq/attractions/the-high-roller-observation-wheel-1.jpg\",\n          \"geoCoordinates\": \"36.1195, -115.1719\",\n          \"ticketPrice\": \"Around $30 per person\",\n          \"travelTime\": \"Located within The LINQ Promenade.\"\n        },\n        {\n          \"time\": \"4:00 PM\",\n          \"place\": \"Fountains of Bellagio\",\n          \"details\": \"A spectacular water and light show synchronized to music.\",\n          \"imageUrl\": \"https://www.bellagio.com/content/dam/mgmresorts/bellagio/attractions/fountains-of-bellagio/fountains-of-bellagio-hero-mobile.jpg\",\n          \"geoCoordinates\": \"36.1154, -115.1726\",\n          \"ticketPrice\": \"Free\",\n          \"travelTime\": \"5-minute walk from The LINQ.\"\n        },\n        {\n          \"time\": \"6:00 PM\",\n          \"place\": \"The Strip\",\n          \"details\": \"Enjoy the nightlife and explore the casinos, restaurants, and entertainment venues.\",\n          \"imageUrl\": \"https://www.visitlasvegas.com/sites/default/files/styles/article_hero/public/media/images/page-content/Strip-at-Night_2019.jpg\",\n          \"geoCoordinates\": \"36.1154, -115.1726\",\n          \"ticketPrice\": \"Free\",\n          \"travelTime\": \"Various walking distances depending on location.\"\n        },\n        {\n          \"time\": \"8:00 PM\",\n          \"place\": \"Dinner at a budget-friendly restaurant\",\n          \"details\": \"Explore The Strip for affordable dining options like In-N-Out Burger or a casual buffet.\"\n          \"imageUrl\": \"https://www.in-n-out.com/content/dam/in-n-out/images/store-finders/stores/store-images/lv-store-hero.jpg\",\n          \"geoCoordinates\": \"36.1196, -115.1715\",\n          \"ticketPrice\": \"Around $10-$20 per person\",\n          \"travelTime\": \"Various walking distances depending on location.\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 3\",\n      \"theme\": \"Free Day\",\n      \"plan\": [\n        {\n          \"time\": \"10:00 AM\",\n          \"place\": \"Las Vegas North Premium Outlets\",\n          \"details\": \"A large outlet mall with discounted designer brands.\",\n          \"imageUrl\": \"https://www.premiumoutlets.com/wp-content/uploads/2018/12/Las-Vegas-North-Premium-Outlets-Exterior.jpg\",\n          \"geoCoordinates\": \"36.2124, -115.1898\",\n          \"ticketPrice\": \"Free\",\n          \"travelTime\": \"Take the Deuce bus or ride-sharing service from The Strip to the outlets.\"\n        },\n        {\n          \"time\": \"12:00 PM\",\n          \"place\": \"Lunch at a food court\",\n          \"details\": \"Enjoy affordable lunch options at the outlet mall's food court.\"\n          \"imageUrl\": \"https://www.premiumoutlets.com/wp-content/uploads/2019/01/Las-Vegas-North-Premium-Outlets-Food-Court.jpg\",\n          \"geoCoordinates\": \"36.2124, -115.1898\",\n          \"ticketPrice\": \"Around $10-$15 per person\",\n          \"travelTime\": \"Located within the outlet mall.\"\n        },\n        {\n          \"time\": \"2:00 PM\",\n          \"place\": \"Free Time\",\n          \"details\": \"Relax by the pool, explore your hotel's amenities, or visit a museum for free.\",\n          \"imageUrl\": \"https://www.vegasexperience.com/media/img/pool-party-las-vegas.jpg\",\n          \"geoCoordinates\": \"36.1699, -115.1397\",\n          \"ticketPrice\": \"Free\",\n          \"travelTime\": \"Various walking distances depending on location.\"\n        },\n        {\n          \"time\": \"6:00 PM\",\n          \"place\": \"Dinner at a budget-friendly restaurant\",\n          \"details\": \"Enjoy a final meal at a local diner or grab takeout to bring back to your hotel.\"\n          \"imageUrl\": \"https://www.visitlasvegas.com/sites/default/files/styles/article_hero/public/media/images/page-content/Strip-at-Night_2019.jpg\",\n          \"geoCoordinates\": \"36.1699, -115.1397\",\n          \"ticketPrice\": \"Around $10-$20 per person\",\n          \"travelTime\": \"Various walking distances depending on location.\"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Important Notes:**\n\n* This itinerary is a suggestion, and you can customize it based on your interests.\n* Prices for food, attractions, and transportation may vary, and it's always a good idea to check for current pricing and deals.\n* Las Vegas has a hot climate, so be sure to stay hydrated and wear sunscreen.\n* Take advantage of free activities like walking around the Strip, exploring the casinos, and enjoying the free shows.\n* Consider using public transportation (like the Deuce bus) or ride-sharing services to save money on transportation.\n\nEnjoy your budget-friendly trip to Las Vegas!\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Make my prompt short while keeping the essence\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Create a 3-day Las Vegas itinerary for a couple on a cheap budget. Include affordable hotel recommendations,give me the exact address of the restraunts and places to visit,  hotel price range,also add hotel description , i want hotel address, description, hotel price range, places to visit, and activities. Provide details like addresses, images, and approximate price ranges for activities. also give the the exact address of the places to visit"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "specially specify the location in the prompt, the couple , their bugdet(cheap) and number of days to travel\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Create a 3-day Las Vegas itinerary for a couple on a cheap budget. i want hotel address, description, hotel price range,give me the exact address of the restraunts and places to visit,  Include affordable hotel recommendations, hotel prices range, also add hotel description places to visit, and activities. Provide details like addresses, prices, and images.  also give the the exact address of the places to visit \n"},
          ],
        },
      ],
    });
  
  