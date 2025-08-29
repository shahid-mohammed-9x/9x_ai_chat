// src/components/LoginModal.jsx
import { memo } from 'react';
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
import { Shield } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginPopup } from '@/redux/theme/reducer';

function LoginModal() {
  const { loginPopup } = useSelector((state) => state.themeState);
  const dispatch = useDispatch();

  return (
    <div>
      <Dialog open={loginPopup} onOpenChange={() => dispatch(openLoginPopup(false))}>
        <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-md" />

        <DialogContent
          className="w-[90%] sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl p-6 
             bg-card ring-1 ring-white/40 
             shadow-[0_0_30px_rgba(255,255,255,0.3)] 
             backdrop-blur-md items-center"
        >
          <DialogHeader className="items-center text-center">
            <div className="flex justify-center mb-3">
              <img
                src="https://9xtechnology.com/assets/images/logo.png"
                alt="logo"
                className="h-12 w-auto"
              />
            </div>
            <DialogTitle className="text-lg md:text-xl font-bold">
              Welcome to 9x AI Chat
            </DialogTitle>
            <DialogDescription className="text-xs md:text-sm text-gray-300">
              Choose how you would like to sign in
            </DialogDescription>
          </DialogHeader>

          {/* Continue with Google */}
          <Button
            variant="default"
            className="h-10 px-6 w-full sm:w-[70%] md:w-[55%] flex-shrink-0 m-auto 
             bg-gray-700 text-white hover:bg-gray-600 rounded-lg shadow mt-4"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="google"
              className="h-5 w-5"
            />
            Continue with Google
          </Button>

          <div className="flex items-center gap-2 my-4 w-full">
            <div className="flex-1 h-px bg-primary" />
            <span className="text-[10px] sm:text-xs text-white whitespace-nowrap">
              OR CONTINUE WITH YOUR EMAIL
            </span>
            <div className="flex-1 h-px bg-primary" />
          </div>

          {/* Email input */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3 mx-0 sm:mx-4 w-full">
            <div className="relative flex-1">
              <Input
                type="email"
                id="email"
                placeholder=""
                className="peer h-12 px-2 pt-3 w-full"
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
                 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 
                 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary"
              >
                Email Address
              </label>
            </div>
            <Button className="bg-gray-700 text-white flex gap-2 justify-center items-center hover:bg-gray-600 sm:w-auto w-full">
              <Shield className="h-5 w-5 sm:h-6" />
              <span className="sm:inline">Send OTP</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default memo(LoginModal);
