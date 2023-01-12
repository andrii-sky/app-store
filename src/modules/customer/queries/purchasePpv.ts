const PURCHASE_PPV_QUERY = `
  mutation PurchasePpv($payPerViewOfferId: ID!, $deviceId: ID!) {
    purchasePayPerView(payPerViewOfferId: $payPerViewOfferId, deviceId: $deviceId) {
      __typename
      ... on CustomerLinearPayPerViewPurchase {
        purchasedAt
        deviceId
        offer {
          id
          slots {
            id
            }
        }
      }
    }
  }
`;
export default PURCHASE_PPV_QUERY;
