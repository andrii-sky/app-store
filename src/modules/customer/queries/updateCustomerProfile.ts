const UPDATE_CUSTOMER_PROFILE = `
mutation UpdateProfile($id: ID!, $name: String!, $avatar: ID!) {

    updateProfile(id: $id, name: $name, avatar:$avatar) {
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
}`;
export default UPDATE_CUSTOMER_PROFILE;
