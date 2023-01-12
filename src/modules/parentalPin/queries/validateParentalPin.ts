const VALIDATE_PARENTAL_PIN_QUERY = `
mutation validateParentalPin($enteredPin: String!) {
    validateParentalPin(enteredPin: $enteredPin) {
        __typename
        ... on PinValidationResult {
            remainingAttempts
            isValid
        }
        ... on PinValidationFailure {
            attempts
            timeoutEnd
        }
    }
}
`;

export default VALIDATE_PARENTAL_PIN_QUERY;
