import React, {Component} from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './Album.css';

class Album extends Component {
  constructor(props){
    super(props);
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      volume: 0,
      maxVolume: 1,
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play()
    this.setState({isPlaying: true});
  }

  pause() {
    this.audioElement.pause()
    this.setState({isPlaying: false});
  }

  componentDidMount() {

     this.eventListeners = {
       timeupdate: e => {
          this.setState({currentTime: this.audioElement.currentTime});
       },

       durationchange: e => {
          this.setState({duration: this.audioElement.duration});
       },

       volumechange: e => {
         this.setState({volume: this.audioElement.volume});
       }
     };

     this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
     this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);

  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
  }

  setSong(song){
    this.audioElement.src = song.audioSrc;
    this.setState({currentSong: song})
  }

  handleSongClick(song){
    const isSameSong = this.state.currentSong === song;

    if (this.state.isPlaying && isSameSong){
      this.pause();
    } else {
      if (!isSameSong) {this.setSong(song);}
      this.play();
    }
  }

  mouseEnter(song) {
    this.setState({
      onHover: song
    })
  }

  getNumberDisplay(index, song) {
    if (this.state.isPlaying && this.state.currentSong === song) {
      return <span className="icon ion-md-pause"></span>
    }
    if (this.state.onHover === song) {
      return <span className="icon ion-md-play-circle"></span>
    }
    return index + 1;
  }

  handlePrevCLick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(4, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();

  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({currentTime: newTime});
  }

  handleVolumeChange(e) {
    const newVolume = this.state.maxVolume * e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({volume: newVolume});
  }

  formatTime(timeInSeconds) {
    var mins = ~~((timeInSeconds % 3600) / 60);
    var secs = ~~timeInSeconds % 60;
    var ret = "";

    if (mins > 0) {
        ret += (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  render(){
    return(

      <section className="album">
        <section id="album-info">

         <div className="container">
              <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} className="image"/>
              <div className="overlay">
                <div className="text">{this.state.album.title}</div>
                </div>
         </div>

         <div className="album-details">
           <h4 id="album-title">{this.state.album.title}</h4>
           <h5 className="artist">{this.state.album.artist}</h5>
           <div id="release-info">{this.state.album.releaseInfo}</div>
         </div>
        </section>
        <table id="song-list">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>
           <tbody>
           {
             this.state.album.songs.map((song, index) => {
              return(
                <tr className="song" key={index} onClick={() => this.handleSongClick(song)}>
                <td
                  onMouseEnter={() => this.mouseEnter(song)}
                >
                  {this.getNumberDisplay(index, song)}
                </td>
                <td>{song.title}</td>
                <td>{this.formatTime(song.duration)}</td>
                </tr>
              )

            })

           }
           </tbody>
        </table>
        <PlayerBar
        isPlaying={this.state.isPlaying}
        currentSong={this.state.currentSong}
        currentTime={this.audioElement.currentTime}
        duration={this.audioElement.duration}
        volume={this.audioElement.volume}
        maxVolume={this.state.maxVolume}
        handleSongClick={() => this.handleSongClick(this.state.currentSong)}
        handlePrevCLick={() => this.handlePrevCLick()}
        handleNextClick={() => this.handleNextClick()}
        handleTimeChange={(e) => this.handleTimeChange(e)}
        handleVolumeChange={(e) => this.handleVolumeChange(e)}
        formatCurrentTime={() => this.formatTime(this.state.currentTime)}
        formatDuration={() => this.formatTime(this.state.duration)}
        />
      </section>
    );
  }
}
export default Album;
