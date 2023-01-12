const GET_BROWSE_CATEGORIES = `
query GetBrowseCategories($excludeViewingContexts: [ViewingContext!]) {
  section(id: "browse") {
  ... on Section {
      home {
      ... on BrowseHome {
        categories(excludeViewingContexts: $excludeViewingContexts) {
            __typename
            id
            title
            tileImage {
              uri
            }
            defaultContentFilter {
              viewingContextsByContentType {
                viewingContexts
                contentTypes
              }
            }
            defaultContentSort
          }
        }
      }
    }
  }
}`;
export default GET_BROWSE_CATEGORIES;
