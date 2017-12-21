import React, { Component } from 'react';

import TopNavBar from '../Common/TopNavBar';
import UserProfilePage from './UserProfilePage';
import * as types from '../Common/token';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      user: null
    }
  }

  componentDidMount() {
    const FETCH_URL = 'https://api.spotify.com/v1/me';
    const accessToken = types.token;

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
      console.log('JSON', json);
      const user = json;
      this.setState({ user });
    })
  }

  render() {
    return (
      <div className="app">
        <TopNavBar
          query={this.state.query}
          onChangeText={(query) => this.setState({ query })}
        />
        <div className="app-title">
          Profile
        </div>
        <div>
          <UserProfilePage
            user={this.state.user}
          />
        </div>
      </div>
    )
  }
}

export default UserProfile;
