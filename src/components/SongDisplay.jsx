import React from "react";
import styles from "./../styles/SongDisplay.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { nextLine, restartSong } from "./../actions";

const SongDisplay = ({ dispatch, song }) => {
  const { title, artist, currentPhrase, songArray, arrayPosition, songId } = song;
  return (
    <div className = {styles.songDisplay}>
      <div className = {styles.songInfo}>
        <h1>{title}</h1>
        <hr/>
        <h4>{artist}</h4>
      </div>
      <div className = {styles.phrase} onClick={e => {
        e.preventDefault();
        if(!(arrayPosition === songArray.length - 1)) {
          dispatch(nextLine(songId));
        } else {
          dispatch(restartSong(songId));
        }
      }}>
        <h1>
          {currentPhrase}
        </h1>
      </div>
    </div>
  );
};

SongDisplay.propTypes = {
  song: PropTypes.object,
  songTitle: PropTypes.string,
  artist: PropTypes.string,
  currentPhrase: PropTypes.string,
  songArray: PropTypes.array,
  arrayPosition: PropTypes.number,
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  console.log(state);
  let info;
  const song = state.songsById[state.selectedSong];
  if (!state.songsById[state.selectedSong].isFetching) {
    info = {
      songId: state.selectedSong,
      artist: state.songsById[state.selectedSong].artist,
      title: state.songsById[state.selectedSong].title,
      currentPhrase: state.songsById[state.selectedSong].currentPhrase,
      songArray: state.songsById[state.selectedSong].songArray,
      arrayPosition: state.songsById[state.selectedSong].arrayPosition
    };
  } else {
    info = {
      artist:"",
      title: "",
      currentPhrase: "",
      songArray: "",
      arrayPosition: ""
    };
  }
  return {
    song: info
  };
};

export default connect(
  mapStateToProps
)(SongDisplay);
