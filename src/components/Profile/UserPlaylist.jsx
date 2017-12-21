import React, { Component } from 'react';

import * as types from '../Common/token';
import Description from './Description';

class UserPlaylist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlists: [],
      description: []
    }
  }

  componentDidMount() {
    let FETCH_URL = 'https://api.spotify.com/v1/me/playlists';
    const PLAYLIST_URL = 'https://api.spotify.com/v1/users/';
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
      const playlists = json;
      const value = 0;
      console.log("playlists", playlists);
      this.setState({ playlists });
      playlists.items.map((item, value) => {
        console.log(item);
        FETCH_URL = `${PLAYLIST_URL}${item.owner.id}/playlists/${item.id}`;
        fetch(FETCH_URL, authObjectForGET)
        .then(response => response.json())
        .then(json => {
          console.log('JSON', json);
          const description = json.description;
          this.setState({ description });
          console.log(this.state.description[0]);
          value++;
        })
      })
    })
  }

  render() {
    return (
      <div className="feature-gallery">
        {console.log(this.state.playlists.total)}
        {
          this.state.playlists.total !== undefined
          ? this.state.playlists.items.map((item, index) => {
            const playlistImg = item.images[0].url;
            return (
              <div
                key={index}
                className="album"
              >
                <img
                  src={playlistImg}
                  className="album-img"
                  alt="Playlist"
                />
                <p className="album-text">
                  {item.name}
                  <br />
                  {item.owner.display_name}
                  <br />
                  {this.state.description}
                  {/* <Desciption
                    url={}
                    playlists={this.state.playlists}
                    description={this.state.description}
                  /> */}
                </p>
              </div>
            )
          })
          : <div></div>
        }
      </div>
    )
  }
}

export default UserPlaylist;
