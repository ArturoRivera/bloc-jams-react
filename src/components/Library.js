import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import albumData from './../data/albums';
import './Album.css';

class Library extends Component {
  constructor(props){
    super(props);
    this.state = {albums: albumData};
  }
  render(){
    return (
      <section className="library">
        {
          this.state.albums.map((album, index) => {
            return (
              <Link to={`/album/${album.slug}`} key={index}>
                  <div className="container">
                      <img src={album.albumCover} alt={album.title} className="image" />
                      <div className="overlay">
                          <div className="text">
                          {album.title}<br />
                          {album.artist}<br />
                          {album.songs.length} songs
                          </div>
                      </div>
                  </div>
              </Link>
            )
          })
        }
      </section>
    );
  }
}

export default Library;
