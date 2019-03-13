import React, {Component} from 'react';
import './PlayerBar.css';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">

        <section id="buttons">
             <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" onClick={this.props.handlePrevCLick}>
               <i className="material-icons">fast_rewind</i>
             </button>

             <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" onClick={this.props.handleSongClick}>
               {this.props.isPlaying ? <i className="material-icons">pause_circle_filled</i> :
               <i className="material-icons">play_arrow</i>}
             </button>

             <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" onClick={this.props.handleNextClick}>
               <i className="material-icons">fast_forward</i>
             </button>
         </section>


         <section id="time-control">
             <div className="current-time">{this.props.formatCurrentTime(this.props.currentTime)}</div>
             <input
                type="range"
                className="mdl-slider mdl-js-slider"
                value={(this.props.currentTime / this.props.duration) || 0}
                max="1"
                min="0"
                step="0.01"
                onChange={this.props.handleTimeChange}
             />
             <div className="total-time">{this.props.formatDuration(this.props.duration)}</div>
         </section>


         <section id="volume-control">
             <div className="icon ion-md-volume-low"></div>
             <div className="currentVolume">{this.props.volume}</div>
             <input
                type="range"
                className="mdl-slider mdl-js-slider"
                defaultValue={this.props.maxVolume}
                max="1"
                min="0"
                step="0.01"
                onChange={this.props.handleVolumeChange}
             />
             <div className="icon ion-md-volume-high"></div>
          </section>

      </section>
    );
  }
}

export default PlayerBar;
