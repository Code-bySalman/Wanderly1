import React, { useEffect, useState } from 'react'
import { Button } from './button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import { Dialog, DialogContent,  DialogHeader } from "/src/Components/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
function Header() {
  const [openDialog, setOpenDialog] = useState(false);
 const user = JSON.parse(localStorage.getItem('user'));
 useEffect(()=>{
  console.log(user)
 },[])

 const login = useGoogleLogin({
  onSuccess: (codeResp) => {
    GetUserInfo(codeResp);
    setOpenDialog(false);
  },
  onError: (error) => console.log(error)
});
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
    setOpenDialog(false);
    Window.location.reload();
  })
  .catch((error) => console.error("Error fetching user info:", error));
};
  return (
    <>
    <div className='=p-3 shadow-sm flex justify-between items-center px-5'>
      <Link to={'/'}>
      <h1 className='font-extrabold text-[40px]  text-blue-500 mr-[1150px]'>Wanderly</h1>
      </Link>
        <div>
          {user?
          <div className='flex items-center gap-3'>
            <a href='/contact'>
            <Button variant="outline" className='rounded-full'>Contact</Button>

            </a>
            <Popover>
  <PopoverTrigger><img src={user?.picture} className='w-[40px] h-[40px] rounded-full'/></PopoverTrigger>
  <PopoverContent><h2 className='cursor-pointer' onClick={()=>{
    googleLogout();
    localStorage.clear();
    window/location.reload();
  }}>Logout</h2>.</PopoverContent>
</Popover>

            </div>
            :
            <Button onClick={()=> setOpenDialog(true)}>Get Started</Button>
          }
         
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
    </div>
    </>
  )
}

export default Header