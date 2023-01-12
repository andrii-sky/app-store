const STOP_LIVE_PLAYBACK = () =>
  `mutation StopLinearPlayback($channelId: ID!, $deviceId: ID!) {
    stopLinearPlayback(channelId: $channelId, deviceId: $deviceId)
}`;

export default STOP_LIVE_PLAYBACK;
