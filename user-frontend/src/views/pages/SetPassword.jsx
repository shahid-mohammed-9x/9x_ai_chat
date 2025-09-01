import React, { useState, memo, useMemo } from 'react';
import { Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

const FloatingInput = ({ label, type, value, onChange, visible, setVisible, onFocus, onBlur }) => {
  return (
    <div className="relative w-full">
      <input
        type={visible !== undefined ? (visible ? 'text' : type) : type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder=" "
        className="peer w-full px-4 pt-5 pb-2 rounded-xs border border-gray-700 bg-gray-800 text-gray-100 placeholder-transparent focus:ring-2 focus:ring-purple-500 outline-none"
      />
      <label className="absolute left-4 top-2.5 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-purple-400">
        {label}
      </label>

      {setVisible && (
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {visible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
};

const PasswordRules = memo(({ rules, show }) => {
  if (!show) return null;

  const ruleList = [
    { label: 'At least 8 characters', valid: rules.hasMinLength },
    { label: 'One uppercase & lowercase letter', valid: rules.upperLower },
    { label: 'One number', valid: rules.number },
    { label: 'One special character (!@#$%)', valid: rules.special },
  ];

  return (
    <div className="mt-3 p-3 text-sm bg-gray-800 border border-gray-700 rounded-xl">
      <p className="font-semibold mb-2 text-gray-200">Password must contain:</p>
      <ul className="space-y-1">
        {ruleList.map((rule, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {rule.valid ? (
              <CheckCircle size={16} className="text-green-400" />
            ) : (
              <XCircle size={16} className="text-red-400" />
            )}
            {rule.label}
          </li>
        ))}
      </ul>
    </div>
  );
});

const SetPassword = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Username validation
  const usernameValid = username.length >= 3;

  // Password rules validation
  const rules = useMemo(
    () => ({
      hasMinLength: password.length >= 8,
      upperLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }),
    [password]
  );

  const allRulesPassed = useMemo(
    () => rules.hasMinLength && rules.upperLower && rules.number && rules.special,
    [rules]
  );

  const passwordsMatch = password && confirmPassword === password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-pink-500/20 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-md bg-gray-900/90 border border-gray-700 shadow-2xl rounded-2xl p-6 sm:p-8 text-gray-100">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://9xtechnology.com/assets/images/logo.png"
            alt="Logo"
            className="h-14 w-auto"
          />
        </div>
        {/* Username Field */}
        <div className="mb-6">
          <FloatingInput
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setUsernameFocused(true)}
            onBlur={() => setUsernameFocused(false)}
          />
          {usernameFocused && username && (
            <p
              className={`mt-2 text-sm flex items-center gap-2 ${
                usernameValid ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {usernameValid ? <CheckCircle size={16} /> : <XCircle size={16} />}
              {usernameValid ? 'Looks good!' : 'Minimum 3 characters required'}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <FloatingInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
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
        <div className="mb-6">
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
              {passwordsMatch ? 'Passwords match' : 'Please re-enter the same password'}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={!usernameValid || !allRulesPassed || !passwordsMatch}
          className={`w-full py-3 rounded-xl font-semibold transition ${
            usernameValid && allRulesPassed && passwordsMatch
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 transform'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default memo(SetPassword);
