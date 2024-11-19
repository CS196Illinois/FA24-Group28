import { useState, useEffect, useRef } from 'react'

import lowerLevel from './assets/lower level.png'
import floor1 from './assets/floor 1.png'
import floor2 from './assets/floor 2.png'
import floor3 from './assets/floor 3.png'
import floor4 from './assets/floor 4.png'

import './App.css'

const MenuIcon = () => (
  <svg class='menub' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M4 12H20" stroke="#151515" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4 6H20" stroke="#151515" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4 18H20" stroke="#151515" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null)
  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className = "menu-button">
      <button onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isOpen}>
        <MenuIcon />
      </button>
      {isOpen && (
        <nav className={`slider-menu ${isOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="#link1"><svg class="bookmark" xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 20 20" fill="none">
  <path d="M15.8334 17.5L10 14.1667L4.16669 17.5V4.16667C4.16669 3.72464 4.34228 3.30072 4.65484 2.98816C4.9674 2.67559 5.39133 2.5 5.83335 2.5H14.1667C14.6087 2.5 15.0326 2.67559 15.3452 2.98816C15.6578 3.30072 15.8334 3.72464 15.8334 4.16667V17.5Z" stroke="#3F87C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> Saved</a></li>
            <li><a href="#link2">My Account</a></li>
            <li><a href="#link3">Settings</a></li>
          </ul>
        </nav>
      )}
    </div>
  );
};

//export default MenuButton;
function App() {  
  return (
    <div>
      <h1>
      Find
        <font color="#F38F24">My</font>
        Illini
      </h1>
      <MenuButton />
      <div className="home-search">
        <SearchBar />
        <DropdownMenu />
      </div>
      <div className="floorPlans">
        <img src={lowerLevel} className="floorImg"/>
        <img src={floor1} className="floorImg"/>
        <img src={floor2} className="floorImg"/>
        <img src={floor3} className="floorImg"/>
        <img src={floor4} className="floorImg"/>
      </div>
    </div>
  );
}
  
function SearchBar({ data, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); // Call the onSearch function with the updated search term
  };

  return (
    <div>
      <input
        className="search-bar"
        type="text"
        placeholder="Search for a location here..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}

function DropdownMenu() {
  // State to manage the visibility of the dropdown
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      {/* Button to toggle the dropdown */}
      <button onClick={toggleDropdown} className="dropdown-toggle">
        {isOpen ? 'Select a floor of Grainger Library:' : 'Select a floor of Grainger Library:'}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <ul className="dropdown-menu">
          <li>Lower Level</li>
          <li>Floor 1</li>
          <li>Floor 2</li>
          <li>Floor 3</li>
          <li>Floor 4</li>
        </ul>
      )}
    </div>
  );
}

export { MenuButton, DropdownMenu };
export default App;
