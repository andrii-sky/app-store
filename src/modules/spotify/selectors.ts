import { createSelector } from 'reselect';
import { createApiDataSelector } from '../../utils/api';
import { namespace } from './constants';
import reducer from './reducer';

const moduleState = rootState => rootState[namespace] as ReturnType<typeof reducer>;

export const authError = createSelector(moduleState, state => state.authError);
export const accessToken = createSelector(moduleState, state => state.accessToken);
export const playerState = createSelector(
  createApiDataSelector(moduleState, 'playerState'),
  state => state.player,
);
export const profile = createApiDataSelector(moduleState, 'profile');

const albumsState = createSelector(moduleState, state => state.albumsById);
export const getAlbum = createSelector(albumsState, state => (albumId?: string) =>
  albumId && state.data[albumId],
);
export const isAlbumLoading = createSelector(albumsState, state => state.isLoading);

const albumsSavedState = createSelector(moduleState, state => state.albumsSavedById);
export const getIsAlbumSaved = createSelector(albumsSavedState, state => (albumId?: string) =>
  albumId && state.data[albumId],
);
export const isAlbumSavedLoading = createSelector(albumsSavedState, state => state.isLoading);
