export const namespace = 'spotify';

// Access token
export const SET_ACCESS_TOKEN = `${namespace}/SET_ACCESS_TOKEN`;
export const SPOTIFY_UNAUTHORIZED_ERROR = `${namespace}/SPOTIFY_UNAUTHORIZED_ERROR`;

// Playback
export const TRANSFER_PLAYBACK = `${namespace}/TRANSFER_PLAYBACK`;
export const PLAYBACK_PLAY = `${namespace}/PLAYBACK_PLAY`;
export const PLAYBACK_PAUSE = `${namespace}/PLAYBACK_PAUSE`;
export const PLAYBACK_SEEK = `${namespace}/PLAYBACK_SEEK`;
export const SET_PLAYBACK_SEEK_TIME = `${namespace}/SET_PLAYBACK_SEEK_TIME`;

// Album
export const FETCH_BRAND_ALBUMS = `${namespace}/FETCH_BRAND_ALBUMS`;
export const FETCH_IS_SAVED_ALBUM = `${namespace}/FETCH_IS_SAVED_ALBUM`;
export const SAVE_ALBUM = `${namespace}/SAVE_ALBUM`;
export const REMOVE_ALBUM = `${namespace}/REMOVE_ALBUM`;

// Player
export const FETCH_PLAYER_STATE = `${namespace}/FETCH_PLAYER_STATE`;

// Profile
export const FETCH_PROFILE = `${namespace}/FETCH_PROFILE`;
