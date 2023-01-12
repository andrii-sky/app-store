import { PLAYBACK_SCHEDULE_SNIPPET, PLAYBACK_SOURCES_SNIPPET } from '@/utils/queries/Fragments';

const GET_VOD_PLAYBACK_METADATA = drmType => `mutation StartVodPlayback($assetId: ID!, $deviceId: ID!, $playbackDevice: PlaybackDevice) {
    startVodPlayback(assetId: $assetId, deviceId: $deviceId, playbackDevice: $playbackDevice) {
      __typename
      ... on VodPlaybackSources {
        ${PLAYBACK_SOURCES_SNIPPET(drmType)}
      }
      ${PLAYBACK_SCHEDULE_SNIPPET}
    }
  }`;

export default GET_VOD_PLAYBACK_METADATA;
