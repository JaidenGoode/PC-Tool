import React from 'react';
import ThemeToggle from './components/ThemeToggle';

export default function Settings(){
  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <div className="settings-section">
        <h3>Appearance</h3>
        <div className="settings-row">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
