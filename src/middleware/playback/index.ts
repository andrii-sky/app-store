import { isNil } from 'ramda';
import { REFRESH_PLAYBACK_HEARTBEAT } from '@/modules/playback/constants';
import { refreshPlaybackHeartbeat, setPlaybackHeartbeat } from '@/modules/playback/actions';
import { asMilliseconds } from 'pomeranian-durations';
import { getPlaybackMeta, isConcurrentPlaybackError } from '@/modules/playback/selectors';

export default (store: any) => next => (action: any) => {
  if (action.type === `${REFRESH_PLAYBACK_HEARTBEAT}_SUCCESS`) {
    const { mediaAssetId, isLive, deviceId } = action.meta;
    const source = action.payload.vodPlaybackHeartbeat || action.payload.linearPlaybackHeartbeat;
    const isError =
      !isNil(getPlaybackMeta(store.getState())(mediaAssetId)?.playbackSource) &&
      isConcurrentPlaybackError(store.getState())(mediaAssetId);
    const nextHeartbeat = asMilliseconds(source?.timeToNextHeartbeat);

    const heartBeatInterval = isError
      ? null
      : setTimeout(
          () => store.dispatch(refreshPlaybackHeartbeat(mediaAssetId, isLive, deviceId)),
          nextHeartbeat,
        );
    store.dispatch(setPlaybackHeartbeat(mediaAssetId, heartBeatInterval));
  }

  return next(action);
};
