import React, { Component } from 'react';

import * as types from '../Common/token';
import TopNavBar from '../Common/TopNavBar';
import ArtistProfile from '../Profile/ArtistProfile';
import ArtistTrendingTracks from './ArtistTrendingTracks';
import PulseIcon from '../../images/Pulse-icon.png';

class SearchArtist extends Component {
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
    if(this.state.query !== '') {
      console.log('this.state', this.state);
      const BASE_URL = 'https://api.spotify.com/v1/search?';
      let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
      const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
      const accessToken = types.token;
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
        if(artist !== undefined){
          FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
        }
        else {

          throw new Error('No artist found');
        }
        fetch(FETCH_URL, authObjectForGET)
        .then(response => response.json())
        .then(json => {
          console.log('artist\'s top tracks:', json);
          // const tracks = json.tracks;
          const { tracks } = json;
          this.setState({tracks})
        })
      })
      .catch(function(err) {
        console.log(err);
      });
    }
  }

  render() {
    return (
      <div className="app">
        <TopNavBar
          query={this.state.query}
          onChangeText={(query) => this.setState({ query })}
          onClick={this.search}
        />
        <div className="app-title">
          Pulsify
          <img
            className="pulse-icon"
            src={PulseIcon}
            alt="logo"
          />
        </div>
        {
          this.state.artist === null
          ? <div></div> :
          this.state.artist === undefined
          ? <div><h3>No Playlist Found</h3></div> :
          <div>
            <ArtistProfile
              artist={this.state.artist}
            />
            <ArtistTrendingTracks
              tracks={this.state.tracks}
            />
          </div>

        }
      </div>
    )
  }
}

export default SearchArtist;
