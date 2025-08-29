// src/components/LoginModal.jsx
import { memo, useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Shield, LogIn } from 'lucide-react';

function LoginModal() {
  const [open, setOpen] = useState(true);

  return (
    <div>
      {/* Button to open modal */}
      <Button onClick={() => setOpen(true)}>
        <LogIn className="mr-2 h-4 w-4" /> Login
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="min-w-lg rounded-2xl backdrop-blur-md p-6 shadow-yellow-50/40">
          <DialogHeader className="items-center">
            <div className="flex justify-center mb-3">
              <img
                src="https://9xtechnology.com/assets/images/logo.png"
                alt="logo"
                className="h-12 w-auto"
              />
            </div>
            <h2 className="text-xl font-bold">Welcome to 9x AI Chat</h2>
            <p className="text-sm text-gray-500">Choose how you would like to sign in</p>
          </DialogHeader>

          {/* Continue with Google */}
          <Button
            variant="default"
            className="w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800"
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
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <Input type="email" placeholder="Enter your email address" className="mt-1" />
            </div>
            <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 flex gap-2">
              <Shield className="h-4 w-4" />
              Send verification code
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default memo(LoginModal);
