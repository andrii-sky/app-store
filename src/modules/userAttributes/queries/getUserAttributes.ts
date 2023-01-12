const GET_USER_ATTRIBUTES_QUERY = `
  query GetUserAttributes {
    user {
      attributes {
        name
        value
      }
    }
  }
`;

export default GET_USER_ATTRIBUTES_QUERY;
