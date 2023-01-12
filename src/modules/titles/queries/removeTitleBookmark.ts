const REMOVE_FROM_MY_LIST_QUERY = `mutation AddToMyList($titleId: ID!) {
  removeFromMyList(id: $titleId)
}`;
export default REMOVE_FROM_MY_LIST_QUERY;
