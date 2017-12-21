import React, { Component } from 'react';

import * as types from '../Common/token';
import TopNavBar from '../Common/TopNavBar';
import FeaturedList from './FeaturedList';
import PulseIcon from '../../images/Pulse-icon.png';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      albums: []
    };

  }

  componentDidMount() {
    console.log(this.props);
    console.log('this.state', this.state);
    const FETCH_URL = 'https://api.spotify.com/v1/browse/new-releases';
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
      const albums = json.albums;
      console.log('albums', albums);
      this.setState({albums});
    })
    .catch(function(err) {
      console.log(err);
    });
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
          this.state.albums.length !== 0
          ? <FeaturedList
              albums={this.state.albums}
            />
          : <div></div>
        }
      </div>
    )
  }
}

export default Home;
