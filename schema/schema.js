const graphql = require('graphql');

/**
 * Define Types.
 * Relationship between types.
 * Defining root-queries.
 */

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genere: { type: GraphQLString }
    })
});

/**
 * Each root query will be a field on it's own.
 */

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                // code to get data from db / other source.
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});