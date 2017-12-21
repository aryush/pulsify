import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    let user = {
      display_name: '',
      email: '',
      followers: {total: ''},
      images: [{url: ''}],
      birthdate: '',
      id: '',
      type: ''
    };

    user = this.props.user !== null
                            ? this.props.user
                            : user;

    const userType = user.type.toUpperCase();

    return (
      <div className="">
        <div className="profile">
          <img
            alt="User"
            className="profile-img"
            src={user.images[0].url}
          />
          <div className="profile-details">
            <div className="profile-type">{userType}</div>
            <div className="profile-name">{user.display_name}</div>
            <div className="profile-followers">{user.followers.total} followers</div>
          </div>
        </div>
        <div className="local-nav">
          <ul>
            <li><Link to="/profile/user-playlist">Playlist</Link></li>
            <li><Link to="/profile/following">Following</Link></li>
            <li><Link to="/profile/account">Account</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default UserProfilePage;
