// src/components/LoginModal.jsx
import { memo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Shield, LogIn } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginPopup } from '@/redux/theme/reducer';

function LoginModal() {
  const { loginPopup } = useSelector((state) => state.themeState);
  const dispatch = useDispatch();

  console.log(loginPopup, 'login component');
  return (
    <div>
      {/* Button to open modal */}
      <Dialog open={loginPopup} onOpenChange={() => dispatch(openLoginPopup(false))}>
        <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-md" />

        <DialogContent
          className="min-w-lg rounded-2xl p-6 
             bg-card 
             ring-1 ring-white/40 
             shadow-[0_0_30px_rgba(255,255,255,0.3)] 
             backdrop-blur-md"
        >
          <DialogHeader className="items-center">
            <div className="flex justify-center mb-3">
              <img
                src="https://9xtechnology.com/assets/images/logo.png"
                alt="logo"
                className="h-12 w-auto"
              />
            </div>
            <DialogTitle className="text-xl font-bold">Welcome to 9x AI Chat</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Choose how you would like to sign in
            </DialogDescription>
          </DialogHeader>

          {/* Continue with Google */}
          <Button
            variant="default"
            className="h-10 px-6 w-auto flex-shrink-0 
             bg-gray-600 text-white hover:bg-gray-100 rounded-lg shadow"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="google"
              className="h-5 w-5"
            />
            Continue with Google
          </Button>

          <div className="flex items-center gap-2 my-4">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-xs text-primary">OR CONTINUE WITH YOUR EMAIL</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Email input */}
          <div className="flex items-center gap-3 mx-4">
            {/* <label className="text-lg font-medium whitespace-nowrap">Email:</label>
            <Input type="email" placeholder="Enter your email address" className="flex-1" /> */}
            <div className="relative flex-1">
              <Input type="email" id="email" placeholder="" className="peer h-12 px-2 pt-3" />
              <label
                htmlFor="email"
                className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
                 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 
                 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary"
              >
                Email Address
              </label>
            </div>
            <Button className="bg-gray-700 text-white flex gap-2 hover:bg-gray-700">
              <Shield className="h-10 w-auto" />
              Send OTP
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default memo(LoginModal);
