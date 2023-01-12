const SEARCH_SUGGESTIONS = `
  query Search($term: String!) {
    search(term: $term) {
        results {
            __typename
            ... on Title {
              id
              title
            }
        }
    }
}`;

export default SEARCH_SUGGESTIONS;
