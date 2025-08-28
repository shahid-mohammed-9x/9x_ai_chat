
import React from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ArrowUp } from "lucide-react";
const navLinks = [
  { name: "About", href: "#" },
  { name: "Features", href: "#" },
  { name: "API", href: "#" },
  { name: "Careers", href: "#" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const baseLink =
    "text-gray-400 hover:text-white transition duration-200";
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200 font-inter">
  <header className="fixed top-0 left-0 w-full z-50 py-6 px-6 md:px-12 flex justify-between items-center bg-gray-900 text-white shadow-md">

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
        <button className="bg-white text-gray-900 font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition">
          Get Started
           </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-gray-800 flex flex-col items-center space-y-6 py-6 md:hidden shadow-lg z-50">
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
          <button className="bg-white text-gray-900 font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition"> Get Started
          </button>
        </div>
      )}
    </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 -mt-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          Explore the Future with{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-300 bg-clip-text text-transparent">
            AI Chat
          </span>
        </h1>

        <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
          Our AI is a truth-seeking companion designed for unfiltered answers,
          with advanced capabilities in reasoning, coding, and visual
          processing.
        </p>

        <div className="w-full max-w-2xl mx-auto">
          <form action="/chat" method="GET" className="relative">
            <input
              type="text"
              name="prompt"
              placeholder="What do you want to know?"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-full py-4 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            <button
  type="submit"
  className="absolute right-3 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 rounded-full p-2.5 transition"
>
  <ArrowUp className="text-white w-5 h-5" />
</button>
          </form>
        </div>

        
        <div className="mt-8 flex flex-col md:flex-row items-center gap-4">
          <button className="bg-white text-gray-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-200 transition w-full md:w-auto">
            Try AI Chat
          </button>
        </div>
      </main>
    </div>
  );
}
