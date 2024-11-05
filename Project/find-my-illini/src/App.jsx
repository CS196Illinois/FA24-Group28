import { useState, useEffect, useRef } from 'react'

import lowerLevel from './assets/lower level.png'
import floor1 from './assets/floor 1.png'
import floor2 from './assets/floor 2.png'
import floor3 from './assets/floor 3.png'
import floor4 from './assets/floor 4.png'

import './App.css'

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
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
            <li><a href="#link1">Saved</a></li>
            <li><a href="#link2">Link 2</a></li>
            <li><a href="#link3">Link 3</a></li>
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
      <h1>FindMyIllini</h1>
      <MenuButton />
      <DropdownMenu />
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
          <li>Basement</li>
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
