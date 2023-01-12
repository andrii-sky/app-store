const GET_SUBSCRIPTIONS_QUERY = `
  query GetSubs {
    user {
      subscriptions {
        id
        title
      }
    }
  }
  `;

export default GET_SUBSCRIPTIONS_QUERY;
