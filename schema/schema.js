const graphql = require('graphql');
const _ = require('lodash');

/**
 * Define Types.
 * Relationship between types.
 * Defining root-queries.
 */

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID
} = graphql;

// dummy data
var books = [
    {name: 'Name of the Wind', genere: 'Fantasy', id: '1'},
    {name: 'The final Empire', genere: 'Fantasy', id: '2'},
    {name: 'The Long Earth', genere: 'Sci-Fi', id: '3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
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
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source.
                return _.find(books, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});