const GET_DECODERS_QUERY = `
query{
  user {
    decoders{
      id
      name
      recordCapable
    }
  }
}
`;

export default GET_DECODERS_QUERY;
