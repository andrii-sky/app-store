const SET_PARENTALLY_APPROVED_CLASSIFICATION_QUERY = `
    mutation SetParentallyApprovedClassification($code: Classification!) {
      setParentallyApprovedClassification(code: $code)
    }
`;

export default SET_PARENTALLY_APPROVED_CLASSIFICATION_QUERY;
