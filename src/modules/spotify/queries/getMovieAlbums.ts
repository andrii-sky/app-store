const GET_MOVIE_ALBUMS = `
  query GetMovieAlbums($brandId: ID!) {
    movie(id: $brandId) {
      __typename
      ... on Title {
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
`;

export default GET_MOVIE_ALBUMS;
