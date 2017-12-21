import React from 'react';
import { Route } from 'react-router-dom';

import Featured from './components/Playlist/Featured';
import SearchArtist from './components/Playlist/SearchArtist';
import UserProfile from './components/Profile/UserProfile';
import UserPlaylist from './components/Profile/UserPlaylist';

export default (
  <div>
    {/*  <Route path="/" render={() => <h2>Routes</h2>}></Route> */}
    <Route path="/" exact component={Featured} />
    <Route path="/playlist" component={SearchArtist} />
    <Route path="/profile" component={UserProfile}/>
    <Route path="/profile/following" component={UserPlaylist} />
  </div>
)
