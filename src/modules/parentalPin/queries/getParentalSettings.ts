const GET_PARENTAL_SETTINGS_QUERY = `
  query GetParentalSettings {
    user {
      parentalSettings {
        parentalControl
        approvedClassification
        pinValidationStatus {
          attempts
          timeoutEnd
        } 
      }
    }
  }
  `;

export default GET_PARENTAL_SETTINGS_QUERY;
