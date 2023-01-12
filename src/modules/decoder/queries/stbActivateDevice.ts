const STB_ACTIVATE_QUERY = `
    mutation ActivateSkyDecoder($serialNumber: ID!, $chipId: ID!) {
        activateSkyDecoder(serialNumber: $serialNumber, chipId: $chipId) {
        __typename
        ... on SkyDecoderActivationSuccess {
            message
        }
        ... on SkyDecoderAccountMismatch {
            message
        }
        ... on SkyDecoderNotFound {
            message
        }
        ... on SkyDecoderAlreadyActivated {
            message
        }
    }
}`;

export default STB_ACTIVATE_QUERY;
