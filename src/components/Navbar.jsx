import { useState } from "react";
import Youtube_Logo from "../assets/youtube.svg";

const Navbar = ({ onMenuClick, onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-navbar bg-bg flex items-center justify-between px-4 z-1000">
      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-full hover:bg-surface-hover"
          onClick={onMenuClick}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" className="text-white">
            <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          </svg>
        </button>
        <div className="flex items-center cursor-pointer">
          <img
            src={Youtube_Logo}
            alt="YouTube Logo"
            className="h-8 mr-2"
          />
          <span className="text-white font-semibold">ChaiTube</span>
        </div>
      </div>

      <form
        className="flex-1 max-w-[720px] hidden md:flex justify-center"
        onSubmit={handleSearchSubmit}
      >
        <div className="flex items-center gap-3 w-full">
          <div className="flex flex-1 bg-[#121212] border border-border rounded-full overflow-hidden ml-8">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 px-4 py-2 text-lg bg-transparent border-none outline-none text-white"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-surface px-5 border-l border-border hover:bg-neutral-800 rounded-none"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" className="text-white">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
              </svg>
            </button>
          </div>
          <button className="bg-[#181818] w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hover">
            <svg viewBox="0 0 24 24" width="24" height="24" className="text-white">
              <path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path>
              <path fill="currentColor" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path>
            </svg>
          </button>
        </div>
      </form>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-surface-hover hidden sm:flex">
          <svg viewBox="0 0 24 24" width="24" height="24" className="text-white">
            <path fill="currentColor" d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"></path>
          </svg>
        </button>
        <button className="p-2 rounded-full hover:bg-surface-hover hidden sm:flex">
          <svg viewBox="0 0 24 24" width="24" height="24" className="text-white">
            <path fill="currentColor" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path>
          </svg>
        </button>
        <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center ml-2 cursor-pointer border border-border">
          <svg viewBox="0 0 24 24" width="20" height="20" className="text-text-secondary">
            <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
