const CREATE_CUSTOMER_PROFILE = `
mutation CreateProfile($name: String!, $avatar: ID) {

    createProfile(name: $name, avatar:$avatar) {
        ... on CustomerProfile {
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
		... on ProfilesLimitExceeded {
			maxProfiles
		}
    }
}`;
export default CREATE_CUSTOMER_PROFILE;
