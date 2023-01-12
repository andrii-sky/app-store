const CHANGE_CHANNEL = `
  mutation SaveRecentChannel($channelId: ID!) {
      saveRecentChannel(channelId: $channelId)
  }
`;

export default CHANGE_CHANNEL;
