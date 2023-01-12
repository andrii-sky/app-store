const ENTER_PARENTAL_PIN_QUERY = `
    mutation EnterParentalPin($enteredPin: String!) {
      enterParentalPin(enteredPin: $enteredPin)
    }
`;

export default ENTER_PARENTAL_PIN_QUERY;
