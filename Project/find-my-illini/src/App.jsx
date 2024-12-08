import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';

import lowerLevel from './assets/lower level.png';
import floor1 from './assets/floor 1.png';
import floor2 from './assets/floor 2.png';
import floor3 from './assets/floor 3.png';
import floor4 from './assets/floor 4.png';
import floorImage404 from './assets/404.png';
import floorImage405 from './assets/405.png';
import floorImage408 from './assets/408.png';

import './App.css';

const MenuIcon = () => (
  <svg className="menub" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4 12H20" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 6H20" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 18H20" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  {isOpen && <div className="backdrop" onClick={toggleMenu}></div>}

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="menu-button">
      <button onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isOpen}>
        <MenuIcon />
      </button>
      {isOpen && (
        <nav className={`slider-menu ${isOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="#link1">Saved</a></li>
            <li><a href="#link2">My Account</a></li>
            <li><a href="#link3">Settings</a></li>
          </ul>
        </nav>
      )}
    </div>
  );
};

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Hook to navigate between pages

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    setIsOpen(false); // Close dropdown
    navigate(path); // Navigate to the selected route
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-toggle">
        {isOpen ? 'Select a floor of Grainger Library:' : 'Select a floor of Grainger Library:'}
      </button>

      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={() => handleNavigation('/basement')}>Basement</li>
          <li onClick={() => handleNavigation('/floor1')}>Floor 1</li>
          <li onClick={() => handleNavigation('/floor2')}>Floor 2</li>
          <li onClick={() => handleNavigation('/floor3')}>Floor 3</li>
          <li onClick={() => handleNavigation('/floor4')}>Floor 4</li>
        </ul>
      )}
    </div>
  );
};

const FloorPlans = () => (
  <div className="floorPlans">
    <img src={lowerLevel} className="floorImg" alt="Lower Level" />
    <img src={floor1} className="floorImg" alt="Floor 1" />
    <img src={floor2} className="floorImg" alt="Floor 2" />
    <img src={floor3} className="floorImg" alt="Floor 3" />
    <img src={floor4} className="floorImg" alt="Floor 4" />
  </div>
);

const floorImages = {
  basement: lowerLevel,
  floor1: floor1,
  floor2: floor2,
  floor3: floor3,
  floor4: floor4,
};

const Floor = ({ floorName, floorImage, rooms }) => {
  const [selectedRoom, setSelectedRoom] = useState('');

  const roomImages = {
    '404': floorImage404,
    '405': floorImage405,
    '408': floorImage408,
  };

  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
  };

  return (
    <div>
      <h1>Welcome to {floorName}!</h1>
      {rooms ? (
        <div>
          <label htmlFor="room-select">Select a room:</label>
          <select id="room-select" value={selectedRoom} onChange={handleRoomChange}>
            <option value="">--Choose a room--</option>
            {Object.keys(rooms).map((room) => (
              <option key={room} value={room}>
                Room {room}
              </option>
            ))}
          </select>
          <div>
            {/* Fallback to floorImage when no room is selected */}
            <img
              src={selectedRoom ? roomImages[selectedRoom] : floorImage}
              alt={selectedRoom ? `Room ${selectedRoom}` : `${floorName}`}
              className="largeFloorImg"
            />
          </div>
        </div>
      ) : (
        <img src={floorImage} alt={`${floorName}`} className="largeFloorImg" />
      )}
    </div>
  );
};


const floorRooms = {
  floor4: {
    '404': floorImage404,
    '405': floorImage405,
    '408': floorImage408,
  },
};

function App() {
  return (
    <Router>
      <div>
        <Link to="/" className="logo">
          <h1>
            Find<font color="#F38F24">My</font>Illini
          </h1>
        </Link>
        <MenuButton />
        <DropdownMenu />
        
        <Routes>
          <Route path="/" element={<FloorPlans />} />
          <Route path="/basement" element={<Floor floorName="the Basement" floorImage={floorImages.basement} />} />
          <Route path="/floor1" element={<Floor floorName="Floor 1" floorImage={floorImages.floor1} />} />
          <Route path="/floor2" element={<Floor floorName="Floor 2" floorImage={floorImages.floor2} />} />
          <Route path="/floor3" element={<Floor floorName="Floor 3" floorImage={floorImages.floor3} />} />
          <Route
            path="/floor4"
            element={<Floor floorName="Floor 4" floorImage={floorImages.floor4} rooms={floorRooms.floor4} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export { MenuButton, DropdownMenu };
export default App;
