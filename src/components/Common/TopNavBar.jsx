import React from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import PulseIcon from '../../images/Pulse-icon.png';

const TopNavBar = ({query, onChangeText, onClick}) => {
  return (
    <div className="app-nav">
      <img
        className="pulse-icon"
        src={PulseIcon}
        alt="logo"
      />
      <ul>
        <li><Link to="/">Featured Playlist</Link></li>
        <li><Link to="/playlist">Top Tracks</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
      <div className="input">
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist..."
              value={query}
              onChange={event => onChangeText(event.target.value)}
              onKeyPress={event => {
                // console.log(event.key);
                if(event.key === 'Enter') {onClick()}

              }}
            />
            <InputGroup.Addon onClick={() => onClick()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
      </div>
    </div>
  )
}

export default TopNavBar;
