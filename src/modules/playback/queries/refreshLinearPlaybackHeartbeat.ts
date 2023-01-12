const REFRESH_LINEAR_PLAYBACK_HEARTBEAT = () => `mutation LinearPlaybackHeartbeat($channelId: ID!, $deviceId: ID!) {
    linearPlaybackHeartbeat(channelId: $channelId, deviceId: $deviceId) {
        timeToNextHeartbeat
    }
}`;
export default REFRESH_LINEAR_PLAYBACK_HEARTBEAT;
