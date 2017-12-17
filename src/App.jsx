import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

import Profile from './Profile';
import Gallery from './Gallery';
import PulseIcon from './images/Pulse-icon.png';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      artist: null,
      tracks: []
    };

    this.search = this.search.bind(this);
  }

  search() {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    const accessToken = 'BQCRz97IYFKO9lVe9GAW040wVAAeM-ILBv-yhdjsM9TGAdyDQaF7DoqGI5gXzSfPkVsbSY92tWnevbpX4a19flMEwSKFE9r5Tr68X7CLcIv-BjvSLOUxhHnNniOWEfp0de5XFRZ-euFNCfy1ThdIEFIXfNs1M9YoDQBfanK_mOe_FQ2PNQ';
    console.log('FETCH_URL', FETCH_URL);

    const authObjectForGET = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, authObjectForGET)
    .then(response => response.json())
    .then(json => {
      console.log('JSON', json)
      const artist = json.artists.items[0];
      console.log('artist', artist);
      this.setState({artist});

      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
      fetch(FETCH_URL, authObjectForGET)
      .then(response => response.json())
      .then(json => {
        console.log('artist\'s top tracks:', json);
        // const tracks = json.tracks;
        const { tracks } = json;
        this.setState({tracks})
      })
    });
  }

  render() {
    return (
      <div className="app">
        <div className="app-title">
          Pulsify
          <img
            className="pulse-icon"
            src={PulseIcon}
            alt="logo"
          />
        </div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist..."
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                console.log(event.key);
                if(event.key === 'Enter') {this.search()}

              }}
            />
            <InputGroup.Addon onClick={this.search}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ? <div>
              <Profile
                artist={this.state.artist}
              />
              <Gallery
                tracks={this.state.tracks}
              />
            </div>
          : <div></div>
        }
      </div>
    )
  }
}

export default App;
