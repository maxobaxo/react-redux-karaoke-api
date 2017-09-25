import constants from "./../../src/constants";
import * as actions from "./../../src/actions";
import selectedSong from "./../../src/reducers/selectedSong";
import songsById from "./../../src/reducers/songsById";

describe("Karaoke App", () => {
  const { defaultState, types } = constants;

  describe("Songs By Title Reducer", () => {
    const songData = defaultState.songsById[defaultState.selectedSong];
    it('should return default state', () => {
      expect(songsById(defaultState.songsById, { type: null }))
      .toEqual(defaultState.songsById);
    });

    it("should update chorus phrase", () => {
      const newSongData = songsById(defaultState.songsById, actions.nextLine(defaultState.selectedSong))[defaultState.selectedSong];
      expect(newSongData.currentPhrase)
      .toEqual(songData.songArray[1]);
    });

    it("should restart song", () => {
      const newSongsById = songsById(defaultState.songsById, actions.nextLine(defaultState.selectedSong));
      expect(songsById(newSongsById, actions.restartSong(defaultState.selectedSong)))
      .toEqual(defaultState.songsById);
    });

    it("should update state on request song", () => {
      const action = actions.requestSong("crocodile rock");
      const newObject = {
        isFetching: true,
        title: action.title,
        songId: action.songId,
      };
      expect(songsById(defaultState.songsById, action)[action.songId]).toEqual(newObject);
    });

    it("should update state on receive song", () => {
      const action = actions.receiveSong("kiss", "prince", 1, ["you don't have to be beautiful", "to turn me on"]);
      const newObject = {
        isFetching: false,
        title: action.title,
        artist: action.artist,
        songId: action.songId,
        receiveAt: action.receivedAt,
        songArray: action.songArray,
        currentPhrase: action.songArray[0],
        arrayPosition: 0
      };
      expect(songsById(defaultState.songsById, action)[action.songId]).toEqual(newObject);
    });

  });

  describe("Select Song Reducer", () => {
    const initialState = Object.assign({}, defaultState, {
      selectedSong: 1
    });

    it('should return default state', () => {
      expect(selectedSong(initialState, { type: null }))
      .toEqual(initialState);
    });

    it('should change selectedSong', () => {
      expect(selectedSong(initialState, actions.selectSong(defaultState.selectedSong)))
      .toEqual(defaultState);
    });

  });

});
