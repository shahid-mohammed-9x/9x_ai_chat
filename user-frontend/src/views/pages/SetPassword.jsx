import { memo, useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import FloatingInput from './FloatingInput';
import PasswordRules from './PasswordRules';

const SetPassword = ({ open, onClose }) => {
  const [username, setUsername] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Username validation
  const usernameValid = username.length >= 3;

  // Password rules
  const rules = useMemo(
    () => ({
      hasMinLength: password.length >= 8,
      upperLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }),
    [password]
  );

  const allRulesPassed = Object.values(rules).every(Boolean);
  const passwordsMatch = password && confirmPassword === password;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usernameValid && allRulesPassed && passwordsMatch) {
      console.log('Form submitted:', { username, email, password });
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="w-[90%] sm:max-w-sm md:max-w-md rounded-2xl p-6 
        bg-gray-900 ring-1 ring-white/20 shadow-xl backdrop-blur-lg text-white"
      >
        <DialogHeader className="items-center text-center">
          <div className="flex justify-center mb-3">
            <img
              src="https://9xtechnology.com/assets/images/logo.png"
              alt="logo"
              className="h-12 w-auto"
            />
          </div>
          <DialogTitle className="text-lg md:text-xl font-bold">Set Your Password</DialogTitle>
          <DialogDescription className="text-xs md:text-sm text-gray-400">
            Create a secure password to finish setting up your account
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Username */}
          {/* <div>
            <FloatingInput
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {username && (
              <p
                className={`mt-2 text-sm flex items-center gap-2 ${
                  usernameValid ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {usernameValid ? <CheckCircle size={16} /> : <XCircle size={16} />}
                {usernameValid ? 'Looks good!' : 'At least 3 characters required'}
              </p>
            )}
          </div> */}
          <div>
            <FloatingInput
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
            />

            {usernameFocused && username.length > 0 && username.length < 3 && (
              <p className="mt-2 text-sm flex items-center gap-2 text-red-400">
                <XCircle size={16} />
                At least 3 characters required
              </p>
            )}
          </div>

          {/* Email */}
          <FloatingInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <div>
            <FloatingInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              visible={passwordVisible}
              setVisible={setPasswordVisible}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <PasswordRules rules={rules} show={passwordFocused} />
          </div>

          {/* Confirm Password */}
          <div>
            <FloatingInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              visible={confirmPasswordVisible}
              setVisible={setConfirmPasswordVisible}
            />
            {confirmPassword && (
              <p
                className={`mt-2 text-sm flex items-center gap-2 ${
                  passwordsMatch ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {passwordsMatch ? <CheckCircle size={16} /> : <XCircle size={16} />}
                {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
              </p>
            )}
          </div>

          {/* Submit */}

          <Button
            type="submit"
            disabled={!usernameValid || !allRulesPassed || !passwordsMatch}
            className="w-40 sm:w-48 md:w-56 h-11 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 
    text-black font-semibold shadow-md hover:scale-105 transition mx-auto block"
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(SetPassword);
