import React, { Component } from 'react';

class ArtistTrendingTracks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playingUrl: '',
      audio: null,
      playing: false
    };
  }

  playAudio(previewUrl) {
    let audio = new Audio(previewUrl);
    if(!this.state.playing) {
      audio.play();
      this.setState({
        playing: true,
        playingUrl: previewUrl,
        audio
      })
    }
    else {
      if(this.state.playingUrl === previewUrl) {
        this.state.audio.pause();
        this.setState({
          playing: false,
          playingUrl: ''
        })
      }
      else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          playingUrl: previewUrl,
          audio
        })
      }
    }
  }

  render() {
    console.log('gallery props', this.props);
    const {tracks} = this.props;

    return (
      <div className="track-gallery">
        {
          tracks.map((track, index) => {
            const trackImg = track.album.images[0].url;
            let duration = track.duration_ms;
            const minutes = Math.floor( duration / 60000);
            const seconds = ((duration % 60000) / 1000).toFixed(0);
            duration = seconds < 10 ? `${minutes}:0${seconds}`:`${minutes}:${seconds}`;
            return (
              <div
                key={index}
                className="track"
                onClick={() => track.preview_url === null ? console.log('No Preview') : this.playAudio(track.preview_url)}
              >
                <img
                  src={trackImg}
                  className="track-img"
                  alt="track"
                />
                {
                  track.preview_url === null ? <p className="no-preview-text">No Preview Available</p> :
                  this.state.playingUrl === track.preview_url ? <i className="fa fa-pause" aria-hidden="true"></i> :
                  <i className="fa fa-play" aria-hidden="true"></i>
                }
                <p className="track-text">
                  {track.name}
                  <br />
                  {duration}
                </p>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default ArtistTrendingTracks;
