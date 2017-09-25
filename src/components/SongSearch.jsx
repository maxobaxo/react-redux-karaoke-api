import React from "react";
import styles from "./../styles/SongSearch.css";
import { fetchSongId } from './../actions';
import { connect } from 'react-redux';

class SongSearch extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    let { _title } = this.refs;
    if (!_title.value.trim()) {
      return;
    }
    this.props.dispatch(fetchSongId(_title.value.trim()));
    _title.value = '';
  }

  render() {
    return (
      <div className = {styles.songSearch}>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Song Title" ref="_title"></input>
          <button>search</button>
        </form>
      </div>
    );
  }
}

export default connect()(SongSearch);
