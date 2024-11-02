import { StrictMode } from 'react'
import { createRoot,ReactDOM } from 'react-dom/client'
import './index.css'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import FindTrip from './Components/ui/FindTrip'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './Components/ui/index'
import Contact from './Components/ui/Contact'




const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path:'/find_trip',
    element:<FindTrip/>
  },
  {
    path:'/view_trip/:docId',
    element:<ViewTrip/>
  },
  {
    path:'/contact',
    element:<Contact/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId= {import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>;
  <RouterProvider router={router}/>
  </GoogleOAuthProvider>
  </StrictMode>,
)
