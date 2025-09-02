import { memo, useState, useMemo, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import FloatingInput from '../../helpers/FloatingInput';
import PasswordRules from '../../helpers/PasswordRules';
import { useDispatch, useSelector } from 'react-redux';
import { themeActions, userActions } from '@/redux/combineAction';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setPasswordAction, resetUserProfileAction } = userActions;
  const { openPasswordAction } = themeActions;
  const { passwordPopup } = useSelector((state) => state.themeState);
  const { profileDetails, error, statusCode } =
    useSelector((state) => state.userProfileState) || {};

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [focused, setFocused] = useState({
    fullName: false,
    password: false,
    confirmPassword: false,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  // Update handler for inputs
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullNameValid || !allRulesPassed || !passwordsMatch) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    const submittedData = {
      fullName: formData.fullName,
      password: formData.password,
    };

    dispatch(setPasswordAction(submittedData)).then((res) => {
      if (res) {
        toast.success('Password Successfully set');
        navigate('/new-chat');
        dispatch(openPasswordAction('false'));
      }
    });
  };

  useEffect(() => {
    if (error && statusCode === 400) {
      toast.error(error);
      dispatch(resetUserProfileAction());
    }
  }, [error, statusCode, dispatch, navigate]);

  // Validations
  const fullNameValid = formData.fullName.length >= 3;

  const rules = useMemo(
    () => ({
      hasMinLength: formData.password.length >= 8,
      upperLower: /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password),
      number: /\d/.test(formData.password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    }),
    [formData.password]
  );

  const allRulesPassed = Object.values(rules).every(Boolean);
  const passwordsMatch = formData.password && formData.confirmPassword === formData.password;

  return (
    <Dialog open={passwordPopup}>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-md" />
      <DialogContent
        className="w-[90%] sm:max-w-sm md:max-w-md rounded-2xl p-6 
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
          <DialogTitle className="text-lg md:text-xl font-bold">Set Your Password</DialogTitle>
          <DialogDescription className="text-xs md:text-sm text-gray-400">
            Create a secure password to finish setting up your account
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Full Name */}
          <div>
            <FloatingInput
              label="Full Name"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              onFocus={() => setFocused((p) => ({ ...p, fullName: true }))}
              onBlur={() => setFocused((p) => ({ ...p, fullName: false }))}
            />
            {focused.fullName && formData.fullName.length > 0 && formData.fullName.length < 3 && (
              <p className="mt-2 text-sm flex items-center gap-2 text-red-400">
                <XCircle size={16} />
                At least 3 characters required
              </p>
            )}
          </div>

          {/* Email */}
          <FloatingInput label="Email" type="email" value={profileDetails?.email} readOnly />

          {/* Password */}
          <div>
            <FloatingInput
              ref={passwordRef}
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              visible={passwordVisible}
              setVisible={setPasswordVisible}
              onFocus={() => setFocused((p) => ({ ...p, password: true }))}
              onBlur={() => setFocused((p) => ({ ...p, password: false }))}
              onKeyDown={(e) => {
                if (e.key === 'Tab' && !e.shiftKey) {
                  e.preventDefault();
                  confirmRef.current?.focus();
                }
              }}
            />
            <PasswordRules rules={rules} show={focused.password} />
          </div>

          {/* Confirm Password */}
          <div>
            <FloatingInput
              ref={confirmRef}
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              visible={confirmPasswordVisible}
              setVisible={setConfirmPasswordVisible}
              onBlur={() => setConfirmTouched(true)}
            />
            {confirmTouched && formData.confirmPassword && (
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
            disabled={!fullNameValid || !allRulesPassed || !passwordsMatch}
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
