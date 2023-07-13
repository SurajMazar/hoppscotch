import { GraphQLSchemaHost } from '@nestjs/graphql';
import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base';
export declare class GQLComplexityPlugin implements ApolloServerPlugin {
    private gqlSchemaHost;
    constructor(gqlSchemaHost: GraphQLSchemaHost);
    requestDidStart(): Promise<GraphQLRequestListener>;
}
