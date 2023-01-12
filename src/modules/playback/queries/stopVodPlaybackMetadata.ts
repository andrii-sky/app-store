const STOP_VOD_PLAYBACK = () =>
  `mutation StopVodPlayback($assetId: ID!, $deviceId: ID!) {
    stopVodPlayback(assetId: $assetId, deviceId: $deviceId )
}`;

export default STOP_VOD_PLAYBACK;
