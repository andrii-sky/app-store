import { PLAYBACK_SCHEDULE_SNIPPET, PLAYBACK_SOURCES_SNIPPET } from '@/utils/queries/Fragments';

const GET_LIVE_PLAYBACK_METADATA = drmType => `mutation startLinearPlayback ($channelId: ID!, $deviceId: ID!) {
    startLinearPlayback(channelId: $channelId, deviceId: $deviceId) {
      __typename
      ... on LinearPlaybackSources {
        ${PLAYBACK_SOURCES_SNIPPET(drmType)}
      }
      ${PLAYBACK_SCHEDULE_SNIPPET}
    }
  }`;

export default GET_LIVE_PLAYBACK_METADATA;
