const ADD_TO_MY_LIST_QUERY = `mutation AddToMyList($titleId: ID!) {
  addToMyList(id: $titleId)
}`;
export default ADD_TO_MY_LIST_QUERY;
