const RECORD_QUERY = `
  mutation Record($record: RecordInput!) {
      record(record: $record) 
  }
`;

export default RECORD_QUERY;
