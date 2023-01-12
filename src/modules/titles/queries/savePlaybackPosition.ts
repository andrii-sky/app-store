const SAVE_PLAYBACK_POSITION_QUERY = `mutation SavePlaybackPosition($assetId: ID!, $position: Duration!) {
  savePlaybackPosition(assetId: $assetId, position: $position) {
    complete
    position
    lastWatched
  }
}`;
export default SAVE_PLAYBACK_POSITION_QUERY;
