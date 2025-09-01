// src/components/SetPasswordModalWrapper.jsx
import React, { useState, memo } from 'react';
import SetPassword from './SetPassword';

const SetPasswordModalWrapper = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <button
        className="px-6 py-3 bg-purple-600 text-white rounded-lg"
        onClick={() => setOpen(true)}
      >
        Open Set Password
      </button>

      {/* SetPassword modal */}
      <SetPassword open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default memo(SetPasswordModalWrapper);
