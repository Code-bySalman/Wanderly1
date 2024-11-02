export const  SelectTravelList= [
    {
        id:1,
        title:'Just Me',
        desc: 'Asole traveles in exploration',
        icon: '✈️',
        people:'1'
    },
    {
        id:'2',
        title:'A Couple',
        desc:'Two travels in tandem',
        icon:'🥂',
        people: '2'
    },
    {
        id:'3',
        title:'Family',
        desc:'A group of loved ones',
        icon:'👪',
        people:'3 to 5 people'
    },
    {
        id:'4',
        title:'Friends',
        desc:'A brunch of thrill seekes',
        icon: "🚣‍♂️",
        people:'5 to 10 people'
    }
]

export const SelectBudgetOptions = [
    {
        id:'1',
        title:'Cheap',
        desc:'Stay concious of cost',
        icon: "💰",
    },
    {
        id:'2',
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon: "💳",
    },
    {
        id:'3',
        title:'Luxury',
        desc:'Dont worry about the cost',
        icon: "💸",
    }
]

export const AI_PROMPT = 'Generate Travel Plans for : {location} and its image url , for {totalDays} Days, with a {budget} budget and for {people} people, give me Hotel options list and ticket pricing ratings, hotel image url, restraunts image url,  and make a plan for the totalDays Days with places to visit for each day.'