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
import { useDispatch, useSelector } from 'react-redux';
import { userActions, themeActions } from '@/redux/combineAction';
import { setAccessToken } from '@/helpers/local-storage';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import validateEmail from '@/helpers/EmailValidators';

function LoginModal() {
  const { findUserEmailAction, userLoginAction, sendEmailVerificationAction, verifyEmailAction } =
    userActions;
  const { openLoginAction, openPasswordAction } = themeActions;
  const { loginPopup } = useSelector((state) => state.themeState);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);
  const [otp, setOTP] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await findUserEmailAction(email);

    if (res[0]) setData(res[1]?.data);
    if (!res[1]?.data?.isPasswordSet && !res[1]?.data?.isEmailVerified) {
      let data = {
        email: email,
      };
      let emailRes = await sendEmailVerificationAction(data);
      if (emailRes[0] && emailRes[1]?.success)
        toast.success('Email Veification OTP Send Successfully..');
    }
    if (!res[1]?.data?.isPasswordSet && res[1]?.data?.userExists && res[1]?.data?.isEmailVerified) {
      dispatch(openPasswordAction('true'));
      dispatch(openLoginAction('false'));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      userInput: email,
      password: password,
    };
    const res = await userLoginAction(data);
    if (res[0]) {
      setAccessToken(res[1]?.token);
      navigate('/new-chat');
      dispatch(openLoginAction('false'));
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      otp: otp,
    };
    dispatch(verifyEmailAction(data)).then(() => {
      dispatch(openPasswordAction('true'));
      dispatch(openLoginAction('false'));
      toast.success('Done with Email verification!, Set Your UserName and Password');
    });
  };

  return (
    <div>
      <Dialog open={loginPopup} onOpenChange={() => dispatch(openLoginAction('false'))}>
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
          <div className="flex flex-col items-center w-full gap-4">
            {/* Email Input */}
            <div className="relative w-full sm:w-[70%] md:w-[55%]">
              <Input
                type="email"
                id="email"
                placeholder=" "
                className="peer h-12 px-2 pt-3 w-full"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(validateEmail(e.target.value));
                }}
              />

              <label
                htmlFor="email"
                className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 
      peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary 
      peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:text-xs"
              >
                Email
              </label>
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>

            {/* OTP Input */}
            {!data?.isPasswordSet && !data?.isEmailVerified && data != null && (
              <InputOTP maxLength={6} value={otp} onChange={(value) => setOTP(value)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
            {/* Password Input */}

            {data?.isPasswordSet && data?.userExists && (
              <div className="relative w-full sm:w-[70%] md:w-[55%]">
                <Input
                  type="password"
                  id="password"
                  placeholder=" "
                  className="peer h-12 px-2 pt-3 w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  htmlFor="password"
                  className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 
              peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary 
              peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:text-xs"
                >
                  Password
                </label>
              </div>
            )}

            {/* Submit Button */}
            {data?.isPasswordSet && data?.userExists && (
              <Button
                className="h-10 px-6 w-full sm:w-[70%] md:w-[25%] flex-shrink-0 m-auto 
              bg-[#FFD700] text-black hover:bg-[#E6C200] 
              rounded-lg shadow mt-4"
                onClick={handleLogin}
              >
                <span className="sm:inline">Login</span>
              </Button>
            )}

            {data != null && !data?.isEmailVerified && (
              <Button
                className="h-10 px-6 w-full sm:w-[70%] md:w-[25%] flex-shrink-0 m-auto 
              bg-[#FFD700] text-black hover:bg-[#E6C200] 
              rounded-lg shadow mt-4"
                onClick={handleVerify}
              >
                <span className="sm:inline"> Verify</span>
              </Button>
            )}

            {data == null && (
              <Button
                className="h-10 px-6 w-full sm:w-[70%] md:w-[25%] flex-shrink-0 m-auto 
             bg-[#FFD700] text-black hover:bg-[#E6C200] 
             rounded-lg shadow mt-4"
                onClick={handleSubmit}
              >
                <span className="sm:inline">Submit</span>
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default memo(LoginModal);
