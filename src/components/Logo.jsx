import React from 'react';
import logo from '../assets/logo.png';

const Logo = () => (
  <img
    src={logo}
    alt="Library React Logo"
    className="h-12"
    style={{ filter: 'invert(53%) sepia(92%) saturate(749%) hue-rotate(2deg) brightness(101%) contrast(101%)' }}
  />
);

export default Logo; 