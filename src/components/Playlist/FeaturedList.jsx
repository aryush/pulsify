import React from 'react';

const FeaturedList = ({ albums }) => {
  console.log(albums.items);
  return (
    <div className="feature-gallery">
      {
        albums.items.map((album, index) => {
          const albumImg = album.images[0].url;
          return (
            <div
              key={index}
              className="album"
            >
              <img
                src={albumImg}
                className="album-img"
                alt="album"
              />
              <p className="album-text">
                {album.name}
                <br />
                {album.artists[0].name}
              </p>
            </div>
          )
        })
      }
    </div>
  )
}

export default FeaturedList;
