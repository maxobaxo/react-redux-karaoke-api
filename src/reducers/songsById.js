import constants from "./../constants";
const { defaultState, types } = constants;

const songsById = (state = defaultState.songsById, action) => {
  let song;
  let newSong;
  let newState;
  let startPhrase;
  switch (action.type) {
    case types.NEXT_LINE:
      song = state[action.songId];
      const newPosition = song.arrayPosition + 1;
      const newPhrase = song.songArray[newPosition];
      newSong = Object.assign({}, song, {
        currentPhrase: newPhrase,
        arrayPosition: newPosition
      });
      newState = Object.assign({}, state, {
        [action.songId]: newSong
      });

      return newState;
    case types.RESTART_SONG:
      song = state[action.songId];
      startPhrase = song.songArray[0];
      newSong = Object.assign({}, song, {
        currentPhrase: startPhrase,
        arrayPosition: 0
      });
      newState = Object.assign({}, state, {
        [action.songId]: newSong
      });
      return newState;
    case types.REQUEST_SONG:
      newSong = {
        isFetching: true,
        title: action.title,
        songId: action.songId
      };
      newState = Object.assign({}, state, {
        [action.songId]: newSong
      });
      return newState;
    case types.RECEIVE_SONG:
      song = state[action.songId];
      startPhrase = action.songArray[0];
      newSong = Object.assign({}, song, {
        isFetching: false,
        receivedAt: action.receivedAt,
        title: action.title,
        artist: action.artist,
        songArray: action.songArray,
        arrayPosition: 0,
        currentPhrase: action.songArray[0],
        currentPhrase: startPhrase,
        arrayPosition: 0,
        songId: action.songId
      });
      newState = Object.assign({}, state, {
        [action.songId]: newSong
      });
      return newState;
    default:
      return state;
  }
};


export default songsById;
