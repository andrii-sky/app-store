const DELETE_CUSTOMER_PROFILE = `
mutation DeleteProfile($id: ID!) {
    deleteProfile(id: $id)
}
`;
export default DELETE_CUSTOMER_PROFILE;
