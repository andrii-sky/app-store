const REFRESH_VOD_PLAYBACK_HEARTBEAT = () => `mutation VodPlaybackHeartbeat($assetId: ID!, $deviceId: ID!) {
  vodPlaybackHeartbeat(assetId: $assetId, deviceId: $deviceId) {
    timeToNextHeartbeat
  }
}`;
export default REFRESH_VOD_PLAYBACK_HEARTBEAT;
