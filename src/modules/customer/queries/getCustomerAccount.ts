const GET_CUSTOMER_PROFILES_QUERY = `
  query CustomerDetails {
    customer {
      tier {
        __typename
        ... on SkyCustomerAccountTier {
          status
        }
      }
      profiles {
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
      tvodPurchases {
        purchasedAt
        offer {
          rentalPeriod
          content {
            ... on Movie {
              id
            }
          }
        }
      }
    }
  }
  `;

export default GET_CUSTOMER_PROFILES_QUERY;
