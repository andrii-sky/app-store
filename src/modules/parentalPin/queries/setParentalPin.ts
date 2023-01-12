const SET_PARENTAL_PIN_QUERY = `
    mutation SetParentalPin($pin: String!) {
      setParentalPin(pin: $pin)
    }
`;

export default SET_PARENTAL_PIN_QUERY;
