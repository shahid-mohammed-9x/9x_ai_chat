import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

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
        className="peer w-full px-4 pt-5 pb-2 rounded-xs border border-gray-700 bg-gray-800 text-gray-100 placeholder-transparent focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
      />
      <label
        className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary 
                peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:text-xs"
      >
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

export default FloatingInput;
