const SET_PARENTAL_CONTROL_QUERY = `
    mutation SetParentalControl($enabled: Boolean!) {
      setParentalControl(enabled: $enabled)
    }
`;

export default SET_PARENTAL_CONTROL_QUERY;
