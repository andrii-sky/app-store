const PURCHASE_TVOD_QUERY = `
  mutation PurchaseTvod($tvodOfferId: ID!, $deviceId: ID!) {
    purchaseTvod(tvodOfferId: $tvodOfferId, deviceId: $deviceId) {
      ... on CustomerTvodPurchase {
        deviceId
        purchasedAt
        offer {
          rentalPeriod
          content {
            ...on Movie {
              id
            }
          }
        }
      }
    }
  }
`;
export default PURCHASE_TVOD_QUERY;
