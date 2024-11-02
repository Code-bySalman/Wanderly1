const BASE_URL='https://places.googleapis.com/v1/places:searchText'
import axios from 'axios';
const config={
    header:{
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API,
        'X-Goog-FieldMask':[
            'places.photos',
            'places.dislayName',
            'places.id'
        ]
    }
}
export const GetPlaceDetails=(data)=>axios.post(BASE_URL,data,config)