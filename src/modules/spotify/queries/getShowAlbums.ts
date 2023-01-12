const GET_SHOW_ALBUMS = `
  query GetShowAlbums($brandId: ID!) {
    show(id: $brandId) {
      __typename
      ... on Show {
        seasons {
          id
          number
          soundtrack{
            id
            tracks{
              name
              spotifyUri
              artists{
                name
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_SHOW_ALBUMS;
