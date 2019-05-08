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
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

// dummy data
var books = [
    {name: 'Name of the Wind', genere: 'Fantasy', id: '1', authorId: '1'},
    {name: 'The final Empire', genere: 'Fantasy', id: '2', authorId: '2'},
    {name: 'The Long Earth', genere: 'Sci-Fi', id: '3', authorId: '3'},
    {name: 'THe Hero of Ages', genere: 'Fantasy', id: '4', authorId: '3'},
    {name: 'The Color of Magic', genere: 'Fantasy', id: '5', authorId: '3'},
    {name: 'The Light Fantastic', genere: 'Fantasy', id: '6', authorId: '3'}
];

var authors = [
    {name: 'Patrick Rothfuss', age: 44, id: '1'},
    {name: 'Brandon Sanderson', age: 42, id: '2'},
    {name: 'Terry Pratchett', age: 66, id: '3'}
];

/**
 * The reason to define fiels in function is not to execute them unless called for.
 */

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genere: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                 return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id });
            }
        }
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
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});