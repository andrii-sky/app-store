const GET_CUSTOMER_PROFILE_BY_ID = `
query CustomerDetails($id: ID!) {
    customer {
        profile(id: $id) {
            id
            name
            customerProfileAvatar {
                id
                image {
                    uri
                }
            }
            isDefault
        }
    }
}`;
export default GET_CUSTOMER_PROFILE_BY_ID;
