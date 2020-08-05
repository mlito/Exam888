import GraphQLDataProvider from './graphql-data-provider.js'

const GRAPHQL_PROVIDER = 'GraphQL';
function createDataProvider(providerName) { 
    if (providerName === GRAPHQL_PROVIDER) { 
        return new GraphQLDataProvider.GraphQLDataProvider(); 
    }   
    //todo - add for other data provider , for example REST 
    return null;
};

export { createDataProvider, GRAPHQL_PROVIDER};