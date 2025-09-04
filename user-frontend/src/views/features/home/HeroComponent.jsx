import React, { memo } from 'react';
import './Hero.css';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ArrowUp } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { themeActions } from '@/redux/combineAction';
import { getAccessToken } from '@/helpers/local-storage';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'About', href: '#' },
  { name: 'Features', href: '#features' },
   { name: 'Pricing', href: '#pricing' },
  { name: 'FAQs', href: '#faqs' },
];

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = getAccessToken();
  const baseLink = 'text-gray-400 hover:text-white transition duration-200';
  const { openLoginAction } = themeActions;
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)] font-inter">
      <header className="fixed top-0 left-0 w-full z-50 py-6 px-6 md:px-12 flex justify-between items-center bg-[var(--background)] text-[var(--foreground)] shadow-md">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="https://9xtechnology.com/assets/images/logo.png"
            alt="Company Logo"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className={baseLink}>
              {link.name}
            </a>
          ))}
        </nav>

        {/* Get Started Button */}
        <div className="hidden md:block">
          <Button
            className="bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold py-2 px-6 rounded-[var(--radius)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition"
            onClick={() => {
              token ? '' : dispatch(openLoginAction('true'));
            }}
          >
            {token ? 'Logout' : 'Login'}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu */}

        {menuOpen && (
          <div className="absolute top-20 left-0 w-full bg-[var(--background)] flex flex-col items-center space-y-6 py-6 md:hidden shadow-lg z-50">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={baseLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button
              className="bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold py-2 px-6 rounded-[var(--radius)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition"
              onClick={() => dispatch(openLoginAction('true'))}
            >
              Login
            </button>
          </div>
        )}
      </header>
      {/* Hero Section */}
      <main className="relative flex-grow flex flex-col items-center justify-center text-center px-4 -mt-4 overflow-hidden">
        {/* Blurry Orbs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-[var(--primary)] rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-[var(--accent)] rounded-full filter blur-3xl opacity-30 animate-bounce"></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[var(--chart-2)] rounded-full filter blur-3xl opacity-30 animate-spin-slow"></div>

        {/* Content same as above */}
        <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          Explore the Future with{' '}
          <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--chart-4)] bg-clip-text text-transparent">
            AI Chat
          </span>
        </h1>
        <p className="relative text-base md:text-lg lg:text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto mb-10">
          Our AI is a truth-seeking companion designed for unfiltered answers, with advanced
          capabilities in reasoning, coding, and visual processing.
        </p>

        <div className="relative w-full max-w-2xl mx-auto">
          <form action="/chat" method="GET" className="relative">
            <input
              type="text"
              name="prompt"
              placeholder="What do you want to know?"
              className="w-full bg-[var(--input)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] rounded-full py-4 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition"
            />

            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-[var(--primary)] hover:bg-[var(--accent)] text-[var(--primary-foreground)] rounded-full p-2.5 transition"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </form>
        </div>
        <div className="relative mt-8 flex flex-col md:flex-row items-center gap-4">
          <button className="bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold py-3 px-8 rounded-[var(--radius)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition w-full md:w-auto">
            Try AI Chat
          </button>
        </div>
      </main>
    </div>
  );
};

export default memo(Home);
