import React, { memo } from 'react';
import twittertrans from '@/assets/modelIcons/twittertrans.png';
import linkedinlogo from '@/assets/modelIcons/linkedinlogo.png';
import insta from '@/assets/modelIcons/insta.jpg';
import toast from 'react-hot-toast';

const navLinks = [
  { name: 'About', href: '#' },
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQs', href: '#faqs' },
];
const socialLinks = [
  {
    name: 'Twitter',
    icon: <img src={twittertrans} alt="Twitter" className="h-8 w-8 rounded-full" />,
    href: 'https://twitter.com',
  },
  {
    name: 'LinkedIn',
    icon: <img src={linkedinlogo} alt="LinkedIn" className="h-8 w-8 rounded-full" />,
    href: 'https://linkedin.com',
  },
  {
    name: 'GitHub',
    icon: <img src={insta} alt="GitHub" className="h-8 w-8 rounded-full" />,
    href: 'https://instagram.com',
  },
];
<form
  className="mt-4 flex flex-col sm:flex-row gap-2"
  onSubmit={(e) => {
    e.preventDefault(); // stop page refresh
    // 👉 You can also call your API here
    toast.info('Thanks for subscribing!');
  }}
></form>;

const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info('Thanks for subscribing!');
  };
  return (
    <footer className="bg-[#111318] border-t border-slate-800/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid gap-12 md:grid-cols-4">
        {/* Logo & Description */}
        <div className="md:col-span-1">
          <div className="flex items-center space-x-2">
            <img
              src="https://9xtechnology.com/assets/images/logo.png"
              alt="Company Logo"
              className="h-10 w-auto object-contain"
            />
          </div>
          <p className="mt-4 text-slate-400 text-sm leading-relaxed">
            Pioneering the future of artificial intelligence.
          </p>
        </div>

        {/* Navigation, Social & Newsletter */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-primary">Navigation</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    className="text-slate-400 hover:text-primary transition-colors"
                    href={link.href}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-primary">Connect</h3>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  //   className="text-slate-400 rounded-full hover:text-primary transition-colors"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800  transition-colors"
                  href={link.href}
                >
                  {link.icon}
                  <span className="sr-only">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* subscript */}
          <div>
            <h3 className="text-lg font-semibold text-primary">Subscript to 9X_AI_CHAT</h3>
            <p className="mt-4 text-slate-400 text-sm">
              Stay up to date with our latest news and features.
            </p>
            <form className="mt-4 flex flex-col sm:flex-row gap-2" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
              <button
                type="submit"
                className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-[#D3AC56]-500 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800/50 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p>© 2025 9X_AI_CHAT. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a className="hover:text-white transition-colors">Terms of Service</a>
          <a className="hover:text-white transition-colors">Privacy Policy</a>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"></div>
    </footer>
  );
};

export default memo(Footer);
