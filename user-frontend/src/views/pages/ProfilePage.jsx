import React, { useState } from 'react';
import { User, Mail, Lock, Save, Upload, X } from 'lucide-react';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: 'Saidurga',
    email: 'saidurga@email.com',
    password: '',
  });

  const [avatar, setAvatar] = useState(null); // avatar preview

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file)); // preview image
    }
  };

  // Remove avatar (reset to default gradient + initial)
  const handleRemoveAvatar = () => {
    setAvatar(null);
  };

  // Save changes
  const handleSave = (e) => {
    e.preventDefault();
    console.log('Updated Data:', formData);
    console.log('Avatar File:', avatar || 'default');
    // 👉 TODO: send formData + avatar file to backend API
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8">
        {/* Avatar + Upload */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-4xl font-bold">
            {avatar ? (
              <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              formData.name.charAt(0)
            )}
          </div>

          <div className="flex gap-3 mt-3">
            {/* Upload Button */}
            <label className="cursor-pointer px-4 py-2 border rounded-lg border-gray-700 hover:bg-gray-800 flex items-center gap-2">
              <Upload size={18} /> Change
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>

            {/* Remove Button (only shows if avatar is set) */}
            {avatar && (
              <button
                type="button"
                onClick={handleRemoveAvatar}
                className="px-4 py-2 border rounded-lg border-red-500 text-red-400 hover:bg-red-500/10 flex items-center gap-2"
              >
                <X size={18} /> Remove
              </button>
            )}
          </div>
        </div>

        {/* Profile Form */}
        <form className="space-y-6" onSubmit={handleSave}>
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-1">
              <User size={18} /> Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-1">
              <Mail size={18} /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-1">
              <Lock size={18} /> Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Save Button */}
          {/* <button
            type="submit"
            className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition flex items-center justify-center gap-2"
          >
            <Save size={18} /> Save Changes
          </button> */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[#D3AC56] hover:bg-[#b48e3f] transition flex items-center justify-center gap-2"
          >
            <Save size={18} /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
