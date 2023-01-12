import { GraphQLClient } from 'graphql-request';
import { isNil } from 'ramda';

const graphQLClient = ({ baseURL, fetchOptions, params, headers }) => {
  const client = new GraphQLClient(baseURL, fetchOptions);
  client.setHeaders(headers);
  return client.rawRequest(params.query, params?.variables).catch(error => {
    if (!isNil(error.response?.data)) {
      return Promise.resolve(error.response);
    }

    return Promise.reject(error);
  });
};

export default graphQLClient;
